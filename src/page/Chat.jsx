import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client"

const socket = io('http://localhost:5000');

export default function Chat() {
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const token = localStorage.getItem('token');
    const [searchParam, setSearchParam] = useSearchParams();
    const chatId = searchParam.get("chatId");

    useEffect(() => {
        axios.get("http://localhost:5000/api/chat",
            {
                params: {
                    chatId: chatId,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        ).then((res) => {
            console.log(res.data);
            setMessages(res.data.messages);
            setUserId(res.data.userId);
        }).catch((e) => {
            console.error(e);
        });
        socket.emit('join-chat', chatId);

        const handleNewMessage = (msg) => {
            console.log(msg)
            setMessages(prev => {
                return [...prev, msg];
            });
        }
        socket.on("receive-message", handleNewMessage);
        return () => {
            socket.off('receive-message');
        };
    }, []);
    // if (messages === null) {
    //     return (<div> Loading </div>)
    // }
    return (<div>
        <ul style={{
            listStyle: "none",
            padding: "0",
            display: "flex",
            flexDirection: "column",
        }}>
            {messages.map((msg) => {
                return (<li style={{
                    margin: "5px",
                    padding: "10px",
                    fontSize: "1.1rem",
                    borderRadius: "10px",
                    color: "var(--color-light)",
                    backgroundColor: userId === msg.sender._id ? "var(--color-dark)" : "#172638ff",
                    width: "60%",
                    alignSelf: userId === msg.sender._id ? "end" : "start",
                }}
                ><pre style={{
                    borderStyle: "solid",
                    padding: "20px",
                    borderRadius: "20px",
                    fontFamily: "cursive",
                }}>
                        {msg.text}
                    </pre>
                    <div>
                        {msg.sender.username}
                    </div>
                </li>)
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
                gap: "5px",
            }} onSubmit={(e) => {
                e.preventDefault();
                if (userMessage === "") {
                    alert("Can't send empty message")
                    return
                }
                socket.emit("send-message", {
                    chatId: chatId,
                    text: userMessage,
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