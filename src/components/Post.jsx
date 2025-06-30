export default function Post({ username, content, groupName, date }) {
    return (<div className="post" style={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        fontSize:"2rem",
    }}>
        <div>
            {username}
        </div>
        <div>
            {content}
        </div>
        <div>
            {groupName}
        </div>
        <div>
            {date}
        </div>
    </div>)
}