import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

export default function EditPost() {
    /**
     * @typedef {"loading" | "error" | "success"} ResourceState 
     * @typedef {[ResourceState, React.Dispatch<React.SetStateAction<ResourceState>>]} ResourceUseState
    */
    /** @type {ResourceUseState} */
    const [postState, setPostState] = useState("loading");
    const [searchParams] = useSearchParams();
    const postId = searchParams.get('postId');
    const [text, setText] = useState("");
    const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        axios.get("http://localhost:5000/api/posts/post", {
            params: {
                postId: postId,
                token: authToken,
            },
            headers: {
                Authorization: `Bearer ${authToken}`,
            }
        }).then((res) => {
            setText(res.data.body)
            setPostState("success");
        }).catch((err) => {
            console.error(err);
            setPostState("error");
        })
    }, [postId])

    const FormSection = () => {
        return (<form onSubmit={(e) => {
            e.preventDefault();
            axios.put("http://localhost:5000/api/posts/update", {
                body: text,
                postId: postId,
            },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                }
            ).then((res) => {
                console.log(res.status);
            }).catch((err) => {
                console.error(err);
            })
        }}>
            Form
            <button>Update</button>
        </form>)
    }
    return <div>
        {
            (() => {
                switch (postState) {
                    case "loading":
                        return (<div>
                            Loading
                        </div>)
                    case "error":
                        return (<div>
                            Error
                        </div>)
                    case "success":
                        return (<div>
                            <textarea value={text} onInput={(e) => {
                                setText(e.target.value)
                            }}>
                            </textarea>
                        </div>)
                }
                return (<div>Invalid State</div>)
            })()
        }
        <FormSection />
    </div>
}