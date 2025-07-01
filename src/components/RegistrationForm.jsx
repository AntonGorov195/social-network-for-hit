import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password,
            email: email,
        }
        try {
            const response = await axios.post('http://localhost:5000/api/users/create', data);
            console.log(response.data);
        }catch(err) {
            console.log(err);
        }
        //TD: add check in DB
        //TD add validation about password and confirm password
        //clear the form after sending request
        //give the user message if the function was good or not
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