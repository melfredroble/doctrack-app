import { createContext, useState, useEffect } from "react"
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState(false)

    const state = {
        isAuth,
        setIsAuth
    }
    return (
        <AuthContext.Provider value={state}>
            {children}
        </AuthContext.Provider>
)
}

export default AuthContext;