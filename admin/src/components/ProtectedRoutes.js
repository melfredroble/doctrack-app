import React, { useContext, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios';
import AuthContext from '../context/AuthContext'

const ProtectedRoutes = () => {

    const navigate = useNavigate('');
    const { isAuth, setIsAuth } = useContext(AuthContext)

    useEffect(() => {
        axios.get('http://localhost:5000/login')
            .then((response) => {
                if (response.data.loggedIn === true) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                    navigate('/login')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }, [setIsAuth])

    return (
        isAuth && <Outlet />
    )
}

export default ProtectedRoutes   