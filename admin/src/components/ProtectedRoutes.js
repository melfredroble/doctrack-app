import React, { useContext, useEffect, useState } from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Axios from 'axios'
// import UserContext from '../context/UserContext'

const ProtectedRoutes = () => {

    const [isAuth, setIsAuth] = useState([]);

    useEffect(()=>{
        Axios.get('http://localhost:5000/login')
        .then((response)=>{
            if(response.data.loggedIn === true){
                setIsAuth(response.data.loggedIn)
            } else {
                setIsAuth(response.data.loggedIn)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return (
        isAuth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes   