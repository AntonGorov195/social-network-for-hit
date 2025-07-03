import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setError("Passwords don't match");
        }else {
            const data = {
                username: username,
                password: password,
                email: email,
            }
            try {
                const response = await axios.post('http://localhost:5000/api/users/create', data);
                if (response.status === 201) {

                }else {

                }
                console.log(response.data);
            }catch(err) {
                console.log(err);
            }
        }

        //TD: add check in DB
        //TD add validation about password and confirm password
        //clear the form after sending request
        //give the user message if the function was good or not
    }

    return (
        <div>
            <form onSubmit={handelSubmit}>
                <FormInput type="text" value={username} setValue={setUsername} inputName={"Username"} required={true} />
                <FormInput type="email" value={email} setValue={setEmail} inputName={"Email"} required={true} />
                <FormInput type="password" value={password} setValue={setPassword} inputName={"Password"} required={true} />
                <FormInput type="password" value={passwordConfirm} setValue={setPasswordConfirm} inputName={"Password Confirm"} required={true} />
                {error && (<p style={{color:"red"}}>{error}</p>)}
                <button type={"submit"} >Register</button>
                <button type={"button"} onClick={()=>props.setRegistrationMode(false)}>back to log in </button>
            </form>
        </div>
    )
}