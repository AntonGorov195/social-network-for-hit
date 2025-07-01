import { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import FormInput from "../components/FormInput";

export default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registrationMode, setRegistrationMode] = useState(false)

    const handleSignIn = (e) => {
        e.preventDefault()
        //TD: check in DB
    }

    return (
        <div style={{ backgroundColor: "#b4d3f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {registrationMode ?
                <RegistrationForm /> :
                <div style={{ display: "flex", flexDirection: "column",gap:"20px"}}>
                    <form style={{ display: "flex", flexDirection: "column", backgroundColor: "#314b68", padding: "30px", color: "white", borderRadius: "40px" }}>
                        <FormInput type="text" value={username} setValue={setUsername} inputName={"Username"} />
                        <FormInput type="password" value={password} setValue={setPassword} inputName={"Password"} />
                        <button style={{ width: "100%" }} onClick={handleSignIn} >Sign in </button>
                    </form>
                    <button onClick={() => setRegistrationMode(true)} >Sign up</button>
                </div>}
        </div>
    )
}