import {useState} from "react";
import RegistrationForm from "../components/RegistrationForm";

export default function Login(props) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [registrationMode, setRegistrationMode] = useState('false')

    const handleSignIn = (e) => {
        e.preventDefault()
        //TD: check in DB
    }

    return (
        <div>
            {registrationMode ?
                <RegistrationForm/>:
                <div>
                    <form>
                <label>username</label>
                <input type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>password</label>
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleSignIn} >Sign in </button>
            </form>
          <button onClick={()=>setRegistrationMode(false)} >Sign up</button>
            </div>}
        </div>
    )
}