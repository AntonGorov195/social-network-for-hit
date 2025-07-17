export default function FormInput({ type, value, setValue, inputName, placeholder = inputName, required = false }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "1.4rem",
            margin: "5px",
        }}>
            <label style={{
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "var(--color-dark)",
                color: "var(--color-light)",
            }}>{inputName}</label>
            <input style={{
                borderStyle: "solid",
                borderRadius: "10px",
                borderColor: "var(--color-light)",
                backgroundColor: "var(--color-dark)",
                color: "var(--color-light)",
                flex: "1",
            }} type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                required={required} />
        </div>
    )
}