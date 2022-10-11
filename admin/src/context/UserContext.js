import { createContext, useState, useEffect } from "react";
import Axios from 'axios';
// import UserDispatchContext from "./UserDispatchContext";
const UserContext = createContext();


export const UserContextProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);
    const [userinfo, setUserInfo] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false)

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        userList();
    }, [])

    const userList = () => {
        Axios.get('http://localhost:5000/users')
            .then((response) => {
                setUsersData(response.data)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        user();
    }, [])


    const user = () => {
        Axios.get('http://localhost:5000/users')
            .then((response) => {
                setUserInfo(response.data[0])
            })
            .catch(error => console.log(error))
    }


    const state = {
        userId,
        usersData,
        userinfo,
        userList,
        showMessage,
        message,
        setUserId,
        setUsersData,
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