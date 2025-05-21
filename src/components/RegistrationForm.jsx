import {useState} from "react";

export default function RegistrationForm (props) {
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
                <label>Username</label>
                <input type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
                <label>email</label>
                <input type={"email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>password</label>
                <input type={"password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>passwordConfirm</label>
                <input type={"password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <button onClick={props.onSubmit} >Register</button>
            </form>
        </div>
    )
}