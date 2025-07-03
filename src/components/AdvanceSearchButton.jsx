export default function AdvanceSearchButton({ onClick }) {
    return (<button style={{
        padding: "10px",
        backgroundColor: "var(--color-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        borderRadius: "20px",
        fontSize: "3rem",
        width: "6rem",
        height: "6rem",
        borderStyle: "none",
        color: "var(--color-light)"
    }}
        onClick={onClick}>
        +
    </button>);
}