import { createContext, useState, useEffect } from "react";
import Axios from 'axios';

const UserContext = createContext();

export const UserContextProvider= ({children}) => {

    const [isAuth, setIsAuth] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState([]);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false)


    useEffect(()=>{
        userList();
    },[])

    const userList = async ()=> {
        await Axios.get('http://localhost:5000/users')
        .then((response)=> {
            setUserData(response.data)
        })
        .catch(error => console.log(error))
    }



    const value = {
        userId,
        isAuth,
        setIsAuth,
        setUserId, 
        userData, 
        setUserData,
        userList,
        showMessage,
        setShowMessage,
        message,
        setMessage
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;