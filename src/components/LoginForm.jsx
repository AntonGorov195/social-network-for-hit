import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

export default function LoginForm (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSignIn = (e) => {
        e.preventDefault()
        //TD: check in DB
    }
    return (
        <div>
            <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                <form style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#314b68",
                    padding: "30px",
                    color: "white",
                    borderRadius: "40px"
                }}>
                    <FormInput type="text" value={username} setValue={setUsername} inputName={"Username"}/>
                    <FormInput type="password" value={password} setValue={setPassword} inputName={"Password"}/>
                    <button style={{width: "100%"}} onClick={handleSignIn}>Sign in</button>
                </form>
                <button onClick={() => props.setRegistrationMode(true)}>Sign up</button>
            </div>
        </div>
    )
}