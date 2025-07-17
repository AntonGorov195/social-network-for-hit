import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

export default function RegistrationForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setMessage("Passwords don't match");
            setMessageColor("red")
        }else {
            const data = {
                username: username,
                password: password,
                email: email,
            }
            try {
                const response = await axios.post('http://localhost:5000/api/users/create', data);
                if (response.status === 201) {
                    setMessage("User created successfully");
                    setMessageColor("green")
                    //console.log(response.data);
                }
            }catch(err) {
                if(err.response && err.response.data) {
                    setMessage(err.response.data);
                    setMessageColor("red")
                }
                //console.log(err);
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
                {message && (<p style={{color:messageColor}}>{message}</p>)}
                <button type={"submit"} >Register</button>
                <button type={"button"} onClick={()=>props.setRegistrationMode(false)}>back to log in </button>
            </form>
        </div>
    )
}