import axios from "axios";
import { useState } from "react";

export default function PostWrite() {
    /**
     * @typedef { "sending" | "writing" | "error-wait" | "post-success-wait" } SearchState
     * @typedef {[SearchState, React.Dispatch<React.SetStateAction<SearchState>>]} SearchUseState
    */

    /** @type {SearchUseState} */
    const [postState, setPostState] = useState("writing")
    const [postBody, setPostBody] = useState("")
    const [postlabel, setPostLabel] = useState("")

    const submit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token');
        const data = {
            // PostId: "", auto generated
            PostAuthor: "happy test user", // TODO: use cookie
            body: postBody,
            // I'm not sure how this will work. Does user have one group?
            // Does the user get to select the group?
            // Does the have do be in the group?
            PostGroup: "",
            label: postlabel,
            // PostDate: Date, this is optional, will use Date.now() by default.
        }
        setPostState("sending")
        axios.post("http://localhost:5000/api/posts/create", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setPostState("post-success-wait")
        }).catch(
            (err) => {
                setPostState("error-wait")
            }
        )
    }

    return (<div>
        <h1>Write a post</h1>
        {
            (() => {
                switch (postState) {
                    case "writing":
                        return <div> Writing </div>
                    case "sending":
                        return <div> Sending </div>
                    case "error-wait":
                        return <div> error </div>
                    case "post-success-wait":
                        return <div> Post Successfully Submitted </div>
                }
                return (<div>Invalid State</div>)
            })()
        }
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column" }}>
            <textarea onInput={(e) => setPostBody(e.target.value)}/>
            <div>
                <label>Post Label</label>
                <input onInput={(e) => setPostLabel(e.target.value)}/>
            </div>
            <button> Make Post </button>
        </form>
    </div>)
}