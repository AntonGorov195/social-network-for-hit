export default function Post({ key, username, postId, content, groupName, canEdit, date }) {
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
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "40px",
            fontFamily: "monospace",
            fontWeight: "bold",
            textDecoration: "underline",
            fontSize: "xx-large"
        }}>
            <div>User: {username}</div>
            {canEdit && (<a href={`/edit-post?postId=${postId}`}>Edit: {username}</a>)}
            <div>Group: {groupName}</div>
        </div>
    </li>)
}