import { createContext, useReducer } from "react";

export function authReducer(state, action) {
    
} 
export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, {
        userId: null,
    });
    
}