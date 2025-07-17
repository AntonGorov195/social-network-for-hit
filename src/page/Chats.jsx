import axios from "axios";
import { useEffect, useState } from "react"
import ErrorText from "../components/ErrorText";

export default function Chats() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */

    /**  @type {ResourceUseState} */
    const [loadState, setLoadState] = useState("loading");
    const [chats, setChats] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("http://localhost:5000/api/chat/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setLoadState("success");
            setChats(res.data.chats);
        }).catch((e) => {
            setLoadState("error");
            console.error(e);
        })
    }, [])

    return (<div>
        {
            (() => {
                switch (loadState) {
                    case "loading":
                        return (<div> </div>)
                    case "success":
                        return (<div>
                            {
                                chats.map((chat) => {
                                    return (<div style={{ display: "flex", flex: "1", justifyContent: "center", margin: "10px" }}><a className="btn-big" href={"/chat?chatId=" + chat.chatId}> Chat with: {chat.otherUser} </a></div>)
                                })
                            } </div>)
                    case "error":
                        return (<ErrorText/>)
                    default:
                        return (<div> Invalid State</div>)
                }
            })()
        }
    </div>)
}