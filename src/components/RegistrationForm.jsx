import { useState } from "react";
import FormInput from "./FormInput";

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        //TD: add check in DB
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <FormInput type="text" value={username} setValue={setUsername} inputName={"Username"} />
                <FormInput type="email" value={email} setValue={setEmail} inputName={"Email"} />
                <FormInput type="password" value={password} setValue={setPassword} inputName={"Password"} />
                <FormInput type="password" value={passwordConfirm} setValue={setPasswordConfirm} inputName={"Password Confirm"} />
                <button onClick={props.onSubmit} >Register</button>
            </form>
        </div>
    )
}