export default function Post({ key, username, postId, content, groupName, canEdit, date, videoUrl,canvasUrl}) {
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