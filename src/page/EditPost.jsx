import axios from "axios";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";
import ErrorText from "../components/ErrorText";
import styles from "./EditPost.module.css"

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
        return (<form style={{
            width: "50%",
            padding: "10px",
            display: "flex",
        }} onSubmit={(e) => {
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
            <button className={styles["form-btn"]}>Update</button>
            <button className={styles["form-btn"]} onClick={(e) => {
                e.preventDefault();
                // window.history.back();
                axios.delete("http://localhost:5000/api/posts/delete",
                    {
                        params: {
                            postId: postId
                        },
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        }
                    }
                ).then((res) => {
                    console.log(res.status);
                }).catch((err) => {
                    console.error(err);
                })
            }}> Delete </button>
        </form>)
    }
    return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
        {
            (() => {
                switch (postState) {
                    case "loading":
                        return (<div>
                            Loading
                        </div>)
                    case "error":
                        return (<ErrorText />)
                    case "success":
                        return (<div style={{ width: "66%", }}>
                            <textarea style={{
                                backgroundColor: "var(--color-dark)",
                                color: "var(--color-light)",
                                padding: "10px",
                                borderRadius: "20px",
                                width: "100%",
                                resize: "vertical",
                            }} value={text} onInput={(e) => {
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