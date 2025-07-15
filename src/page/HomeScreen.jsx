import { useEffect, useState } from "react"
import Login from "./Login";
import Posts from "./Posts";

export default function HomeScreen() {
    const [isRegister, setIsRegister] = useState(localStorage.getItem('token') !== null);

    useEffect(() => {
        
    }, [isRegister])

    return isRegister ? (
        <Posts />
    ) : (
        <Login onLogin={() => {
                setIsRegister(true);
        }} />
    );
}