import { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import FormInput from "../components/FormInput";
import LoginForm from "../components/LoginForm";

export default function Login(props) {


    const [registrationMode, setRegistrationMode] = useState(false)



    return (
        <div style={{ backgroundColor: "#b4d3f5", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            {registrationMode ?
                <RegistrationForm setRegistrationMode={setRegistrationMode} /> :
                <LoginForm setRegistrationMode = {setRegistrationMode} onLogin={props.onLogin} />}
        </div>
    )
}