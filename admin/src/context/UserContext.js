import { createContext, useState, useEffect } from "react";
import Axios from 'axios';
import UserDispatchContext from '../context/UserDispatchContext'


export const UserContextProvider= ({children}) => {

    const [isAuth, setIsAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userinfo, setUserInfo] = useState([]);
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('');
    const [showMessage, setShowMessage] = useState(false)

    Axios.defaults.withCredentials = true;

    useEffect(()=>{
        userList();
    },[])

    useEffect(()=> {
        user();
    },[])


    const userList = ()=> {
        Axios.get('http://localhost:5000/users')
        .then((response)=> {
            setUserData(response.data)
        })
        .catch(error => console.log(error))
    }

    const user = ()=>{
        Axios.get('http://localhost:5000/login')
        .then((response)=>{
            if(response.data.loggedIn === true){
                setIsAuth(response.data.loggedIn)
                console.log(response.data.loggedIn)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
            
    }   

    useEffect(()=>{
        console.log("Updated isAuth: ", isAuth);
    },[isAuth])






    const state = {
        userId,
        isAuth,
        setUserId, 
        userData, 
        setUserData,
        userinfo, 
        setUserInfo,
        userList,
        showMessage,
        setShowMessage,
        message,
        setMessage
    }

    return(
        <UserContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export default UserContext;