export default function FormInput({ type, value, setValue, inputName }) {
    return (
        <div>
            <label>{inputName}</label>
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} placeholder={inputName} />
        </div>
    )
}