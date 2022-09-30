import { createContext, useState, useEffect } from "react";
import Axios from 'axios';
// import UserDispatchContext from "./UserDispatchContext";
const UserContext = createContext();


export const UserContextProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);
    const [userinfo, setUserInfo] = useState([]);
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false)

    Axios.defaults.withCredentials = true;   

    useEffect(() => {
        userList();
    }, [])

    const userList = () => {
        Axios.get('http://localhost:5000/users')
        .then((response) => {
            setUserData(response.data)
        })
        .catch(error => console.log(error))
    }

    const state = {
        userId,
        userData,
        userinfo,
        userList,
        showMessage,
        message,
        setUserId,
        setUserData,
        setUserInfo,
        setShowMessage,
        setMessage
    }

    // const dispatch = {
    //     setIsAuth,
    //     setUserId,
    //     setUserData,
    //     setUserInfo,
    //     setShowMessage,
    //     setMessage
    // }
    

    return (
            // <UserDispatchContext.Provider value={dispatch}>
                <UserContext.Provider value={state}>
                    {children}
                </UserContext.Provider>
            // </UserDispatchContext.Provider>
    )
}

export default UserContext;