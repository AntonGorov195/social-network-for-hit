import {useState} from "react";
import axios from "axios";

export default function Post({ key, username, postId, content, groupName, canEdit, date, videoUrl,canvasUrl}) {
   const [showSummary, setShowSummary] = useState(false);
   const [summaryText, setSummaryText] = useState("");
   const getSummary = async () => {
       const data ={"text":content}
       try {
           const summary = await axios.post("http://localhost:5000/api/AI/post",data)
           if(summary.status === 200) {
               setSummaryText(summary.data);
               setShowSummary(true);
           }
       }catch (e) {
           console.error(e);
       }
   }
    return (<li className="post" key={key} style={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        fontSize: "2rem",
        backgroundColor: "var(--color-dark)",
        color: "var(--color-light)",
        padding: "20px",
        width: "100%",
        borderRadius: "15px",
    }}>
        <div style={{ position: "relative", padding: "1rem" }}>
            { !showSummary &&<button onClick={() => {getSummary()}} style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            backgroundColor: "#0f151b",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
        }}>Click to summarize </button>}
        {showSummary && (
            <div
                style={{
                    border: "2px solid #ddd",
                    borderRadius: "10px",
                    padding: "1rem",
                    marginTop: "3rem",
                    backgroundColor: "#9bcabb",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    color: "#222",
                }}
            >
                <h3 style={{marginTop: 0, borderBottom: "1px solid #ccc", paddingBottom: "0.5rem"}}>
                    TL;DR
                </h3>
                <p style={{margin: 0}}>{summaryText}</p>
            </div>
        )}
        </div>
        <div style={{
            borderStyle: "solid",
            borderColor: "var(--color-light)",
            marginTop: "20px",
            width: "100%",
            padding: "17px",
            borderRadius: "30px",
            borderWidth: "1px",
            fontFamily: "cursive"
        }}>
            {content}
        </div>
        {videoUrl && (
            <video width="400" controls>
                <source src = {`http://localhost:5000/uploads/videos/1752696611522.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )}
        {canvasUrl && (
            <img
                src={`http://localhost:5000${canvasUrl}`}
                alt="canvas drawing"
                width={400}
            />
        )}
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "40px",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "xx-large",
            alignItems: "center",
        }}>
            <div>User: {username}</div>
            {canEdit && (<a style={{
                color: "var(--color-light)",
                borderStyle: "solid",
                borderWidth: "3px",
                padding: "10px",
                borderRadius: "10px",
                textDecoration: "none",
            }} href={`/edit-post?postId=${postId}`}>Edit: {username}</a>)}
            <div>Group: {groupName}</div>
        </div>
    </li>)
}