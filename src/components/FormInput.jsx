export default function FormInput({ type, value, setValue, inputName, placeholder = inputName,required = false }) {
    return (
        <div>
            <label>{inputName}</label>
            <input type={type}
                   value={value}
                   onChange={(e) => setValue(e.target.value)}
                   placeholder={placeholder}
            required={required}/>
        </div>
    )
}