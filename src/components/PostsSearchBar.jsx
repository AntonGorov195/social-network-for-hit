export default function PostsSearchBar({ onInput }) {
    return (
        <input style={{
            padding: "20px",
            backgroundColor: "var(--color-dark)",
            color: "var(--color-light)",
            borderWidth: "10px",
            borderStyle: "none",
            borderRadius: "20px",
            fontSize: "2rem",
            alignSelf: "normal",
            flex: "1",
        }} placeholder="Search Here" onInput={onInput} />
    )
}