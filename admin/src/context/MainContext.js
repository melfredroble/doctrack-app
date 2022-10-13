import { createContext, useState, useEffect } from "react"
import Axios from 'axios'
// import UserDispatchContext from "./UserDispatchContext";
const MainContext = createContext()


export const MainContextProvider = ({ children }) => {

    const [userId, setUserId] = useState(null)
    const [id, setId] = useState(null)
    const [userinfo, setUserInfo] = useState([])
    const [usersData, setUsersData] = useState([])
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [officeList, setOfficeList] = useState([])
    const [data,setData] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        userList();
    }, [setUsersData])

    const userList = () => {
        Axios.get('http://localhost:5000/users')
        .then((response) => {
            setUsersData(response.data)
        })
        .catch(error => console.log(error))
    }

    useEffect(()=>{
        offices()
    },[setOfficeList])

    const offices = ()=>{
        Axios.get('http://localhost:5000/offices')
        .then((response)=>{
            setOfficeList(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }



    const state = {
        id,
        userId,
        usersData,
        userinfo,
        userList,
        offices,
        officeList,
        data,
        error,
        setError,
        loading,
        setId,
        setLoading,
        setData,
        setUserId,
        setUsersData,
        setUserInfo,
        setOfficeList
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
        <MainContext.Provider value={state}>
            {children}
        </MainContext.Provider>
        // </UserDispatchContext.Provider>
    )
}

export default MainContext;