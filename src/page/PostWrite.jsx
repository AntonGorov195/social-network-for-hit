// import axios from "axios";
// import { useEffect, useState } from "react";
// import styles from "./PostWrite.module.css"
// import ErrorText from "../components/ErrorText";
//
// export default function PostWrite() {
//     /**
//      * @typedef { "sending" | "writing" | "error-wait" | "post-success-wait" } SearchState
//      * @typedef {[SearchState, React.Dispatch<React.SetStateAction<SearchState>>]} SearchUseState
//     */
//
//     /** @type {SearchUseState} */
//     const [postState, setPostState] = useState("writing")
//     const [userGroups, setUserGroups] = useState([])
//     const [postBody, setPostBody] = useState("")
//     const [postlabel, setPostLabel] = useState("")
//     const [selectedGroup, setSelectedGroup] = useState("")
//     const token = localStorage.getItem('token');
//
//     const submit = (e) => {
//         e.preventDefault()
//         const data = {
//             params: {
//                 // PostId: "", auto generated
//                 body: postBody,
//                 PostGroup: selectedGroup,
//                 label: postlabel,
//
//             },
//         }
//         setPostState("sending")
//         axios.post("http://localhost:5000/api/posts/create", data, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }).then((res) => {
//             setPostState("post-success-wait")
//             setPostBody("");
//             setPostLabel("");
//         }).catch((err) => {
//             console.error(err);
//             setPostState("error-wait")
//         })
//     }
//
//     useEffect(() => {
//         axios.get(`http://localhost:5000/api/groups/groupsOfUser`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         }).then((res) => {
//             setUserGroups(res.data.group);
//         }).catch((err) => {
//             console.error(err);
//             setPostState("error-wait")
//         })
//     }, [])
//
//     return (<div>
//         <div className={styles["h1-container"]}>
//             <h1 className={styles["h1"]}>Write a post</h1>
//         </div>
//         <div style={{
//             display: "flex",
//             justifyContent: "center",
//             margin: "10px",
//         }}>
//             {/* {
//                 (() => {
//                     switch (postState) {
//                         case "writing":
//                             return <div> Writing </div>
//                         case "sending":
//                             return <div> Sending </div>
//                         case "error-wait":
//                             return <div style={{
//                                 padding: "10px",
//                                 borderRadius: "20px",
//                                 color: "var(--color-error-light)",
//                                 backgroundColor: "var(--color-error-dark)"
//                             }}> ERROR </div>
//                         case "post-success-wait":
//                             return <div> Post Successfully Submitted </div>
//                     }
//                     return (<div>Invalid State</div>)
//                 })()
//             } */}
//             {
//                 postState === "error-wait" && (<ErrorText />)
//             }
//         </div>
//         <form onSubmit={submit} className={styles["post-write-form"]}>
//             <textarea className={styles["post-write-body"]} id="post-body" value={postBody} placeholder="Post Body" onInput={(e) => setPostBody(e.target.value)} />
//             <div className={styles["label-container"]}>
//                 <label className={styles["label-text"]}>Label</label>
//                 <input className={styles["label-input"]} value={postlabel} placeholder="post label" style={{
//
//                 }} onInput={(e) => setPostLabel(e.target.value)} />
//             </div>
//             <div className={styles["label-container"]}>
//                 <label className={styles["label-text"]}>Select Group</label>
//                 <select value={selectedGroup}
//                         onChange={(e)=>setSelectedGroup(e.target.value)} style={{
//                     backgroundColor: "var(--color-dark",
//                     color: "var(--color-light)",
//                     fontSize: "1.1rem",
//                     fontFamily: "cursive",
//                     padding: "10px",
//                     borderRadius: "20px",
//                 }}>
//                     {
//                         userGroups.map((g) =>
//                             (<option key={g._id} value={g._id}>{g.name}</option>)
//                         )
//                     }
//                     {/* <option>Group A</option>
//                     <option>Group B</option>
//                     <option>Group C</option> */}
//                 </select>
//             </div>
//             <button className={styles["publish-btn"]}>Publish</button>
//         </form>
//     </div>)
// }

import axios from "axios";
import {useEffect, useRef, useState} from "react";
import styles from "./PostWrite.module.css";
import ErrorText from "../components/ErrorText";
import CanvasDraw from "react-canvas-draw";

export default function PostWrite() {
    const [postState, setPostState] = useState("writing");
    const [userGroups, setUserGroups] = useState([]);
    const [postBody, setPostBody] = useState("");
    const [postLabel, setPostLabel] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const token = localStorage.getItem('token');
    const [showCanvas, setShowCanvas] = useState(false);
    const [canvasImage, setCanvasImage] = useState(null);
    const canvasRef = useRef(null);

    const submit = async (e) => {
        e.preventDefault();

        if (!selectedGroup) {
            alert("Please select a group before publishing!");
            return;
        }

        const formData = new FormData();
        formData.append("body", postBody);
        formData.append("label", postLabel);
        formData.append("groupId", selectedGroup);
        if (videoFile) {
            formData.append("video", videoFile);
        }
        if (canvasImage) {
            formData.append("canvasImage", canvasImage);
        }

        setPostState("sending");

        try {
            await axios.post("http://localhost:5000/api/posts/create", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            setPostState("post-success-wait");
            setPostBody("");
            setPostLabel("");
            setVideoFile(null);
            alert("Post created successfully.");
        } catch (err) {
            console.error(err);
            alert("failed to create post.");
            setPostState("error-wait");
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/groups/groupsOfUser`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            setUserGroups(res.data.group);
        }).catch((err) => {
            console.error(err);
            setPostState("error-wait");
        });
    }, []);

    const toggleCanvas = () => {
        setShowCanvas(!showCanvas);
    };
    const saveCanvasImage = () => {
        const dataURL = canvasRef.current.getDataURL("png");
        setCanvasImage(dataURL);
        console.log("Canvas Image Base64:", dataURL.slice(0, 50) + "...");
    };

    return (
        <div>
            <div className={styles["h1-container"]}>
                <h1 className={styles["h1"]}>Write a post</h1>
            </div>

            {postState === "error-wait" && <ErrorText />}

            <form onSubmit={submit} className={styles["post-write-form"]}>
                {/* Body */}
                <textarea
                    className={styles["post-write-body"]}
                    placeholder="Post Body"
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />

                {/* Label */}
                <div className={styles["label-container"]}>
                    <label className={styles["label-text"]}>Label</label>
                    <input
                        className={styles["label-input"]}
                        value={postLabel}
                        placeholder="Post label"
                        onChange={(e) => setPostLabel(e.target.value)}
                    />
                </div>

                {/* Group selection */}
                <div className={styles["label-container"]}>
                    <label className={styles["label-text"]}>Select Group</label>
                    <select
                        value={selectedGroup}
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        style={{
                            backgroundColor: "var(--color-dark",
                            color: "var(--color-light)",
                            fontSize: "1.1rem",
                            fontFamily: "cursive",
                            padding: "10px",
                            borderRadius: "20px",
                        }}
                    >
                        <option value="">-- Choose Group --</option>
                        {userGroups.map((g) => (
                            <option key={g._id} value={g._id}>
                                {g.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Video upload */}
                <div className={styles["label-container"]}>
                    <label className={styles["label-text"]}>Upload Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideoFile(e.target.files[0])}
                    />
                    {videoFile && <p>Selected: {videoFile.name}</p>}
                </div>
                <button type="button" onClick={toggleCanvas}>
                    {showCanvas ? "Hide Canvas" : "Add Drawing"}
                </button>
                {showCanvas && (
                    <div style={{ marginTop: "10px" }}>
                        <CanvasDraw
                            ref={canvasRef}
                            canvasWidth={400}
                            canvasHeight={300}
                            brushRadius={2}
                            brushColor="#000"
                            lazyRadius={0}
                            hideGrid
                        />
                        <div style={{ marginTop: "5px" }}>
                            <button type="button" onClick={saveCanvasImage}>
                                Save Drawing
                            </button>
                        </div>
                    </div>
                )}
                {canvasImage && (
                    <div style={{ marginTop: "10px" }}>
                        <p>Preview:</p>
                        <img src={canvasImage} alt="canvas preview" width={200} />
                    </div>
                )}

                <button className={styles["publish-btn"]}>Publish</button>
            </form>
        </div>
    );
}
