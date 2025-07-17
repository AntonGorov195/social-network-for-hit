import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client"

const socket = io('http://localhost:5000');

export default function Chat() {
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        axios.get("http://localhost:5000/api/chat/messages",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then((res) => {
            console.log(res.data);
            setMessages(res.data.messages);
        }).catch((e) => {
            console.error(e);
        });
        const handleNewMessage = (msg) => {
            setMessages(prev => [...prev, {
                message: msg,
            }]);
        }

        socket.on("chat message", handleNewMessage)
        return () => {
            socket.off('chat message', handleNewMessage);
            // socket.disconnect();
        };
    }, []);
    return (<div>
        <ul style={{
            listStyle: "none",
            padding: "0"
        }}>
            {messages.map((msg) => {
                return (<li style={{
                    margin: "5px",
                    padding: "10px",
                    fontSize: "1.1rem",
                    borderRadius: "10px",
                    color: "var(--color-light)",
                    backgroundColor: "var(--color-dark)"
                }}
                ><pre>{msg.message}</pre></li>)
            })}
        </ul>
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
        }}>
            <form style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "20px",
                padding: "30px",
            }} onSubmit={(e) => {
                e.preventDefault();
                if (userMessage === "") {
                    alert("Can't send empty message")
                    return
                }
                socket.emit("chat message", {
                    message: userMessage,
                    token: token,
                });
                setUserMessage("");
            }}>
                <textarea
                    placeholder="Write message here"
                    style={{
                        backgroundColor: "var(--color-dark)",
                        color: "var(--color-light)",
                        padding: "10px",
                        borderStyle: "solid",
                        borderWidth: "5px",
                        fontSize: "1.3rem",
                        fontFamily: "cursive",
                        minWidth: "66vw",
                        minHeight: "5em",
                        resize: "vertical",
                        borderRadius: "20px",
                        outline: "0px",
                    }} value={userMessage} onInput={(e) => {
                        setUserMessage(e.target.value);
                    }}></textarea>
                <button style={{
                    backgroundColor: "var(--color-dark)",
                    color: "var(--color-light)",
                    fontSize: "2rem",
                    borderStyle: "none",
                    padding: "20px",
                    borderRadius: "20px",
                    width: "100%",
                }}>Submit</button>
            </form>
        </div>
    </div>)
    //     <li> Post1 </li>
    // <li> Message </li>
    // <li> Add Loading Posts </li>
    // <li> Wait, should there be posts here? </li>
    // <li> Or this is a different thing here? </li>
    // <li> Is this a group chat or a private? </li>
    // <li> Go bottom up or top down? </li>
    // <li> Whatsapp is bottom up </li>
}