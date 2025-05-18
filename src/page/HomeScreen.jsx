import { useState } from "react"
import Login from "./Login";
import Posts from "./Posts";

export default function HomeScreen() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        
    }, [isLogged])

    return isRegister ? (
        <Posts />
    ) : (
        <Login />
    );
}