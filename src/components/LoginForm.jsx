import { useState } from "react";
import FormInput from "./FormInput";
import axios from "axios";

export default function LoginForm (props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleSignIn = async (e) => {
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", data)
            if (response.status === 200) {
                console.log("Successfully logged in")
                const token = response.data.token;
                localStorage.setItem("token", token);
                props.onLogin() // call the function to change the is register to true - so we will see the posts
            }
        } catch (error) {
            alert("Login failed, try again");
            console.log(error);
        }
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
                    <FormInput type="text" value={username} setValue={setUsername} inputName={"Username"} required={true}/>
                    <FormInput type="password" value={password} setValue={setPassword} inputName={"Password"} required={true}/>
                    <button className="btn-big" style={{width: "100%"}} onClick={handleSignIn}>Sign in</button>
                </form>
                <button className="btn-big" onClick={() => props.setRegistrationMode(true)}>Sign up</button>
            </div>
        </div>
    )
}