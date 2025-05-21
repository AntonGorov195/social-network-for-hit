import { useEffect, useState } from "react"
import Login from "./Login";
import Posts from "./Posts";

export default function HomeScreen() {
    const [isRegister, setIsRegister] = useState(true);
    const [isLogged, setIsLogged] = useState(true);

    useEffect(() => {
        console.log("useEffect")
    }, [isRegister])

    return isRegister ? (
        <Posts />
    ) : (
        <Login onLogin={() => {
                setIsRegister(true);
                console.log("HIGGsdfafh");
        }} />
    );
}