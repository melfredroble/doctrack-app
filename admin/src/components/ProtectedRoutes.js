import React, { useContext, useEffect } from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import Axios from 'axios'
import UserContext from '../context/UserContext'

const ProtectedRoutes = () => {

    // const [isAuth, setIsAuth] = useState(false);

    // useEffect(()=>{
    //     return isAuth ? <Outlet /> : <Navigate to="/login" />
    // }, [isAuth]);

    // Axios.get("http://localhost:5000/login")
    // .then((response)=>{
    //     setIsAuth(response.data.loggedIn);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });



    // useEffect(()=>{
    //     const fetchAuth = async () => {
    //         await Axios.get("http://localhost:5000/login").then((response)=>{
    //             if(response.data.loggedIn){
    //                 setIsAuth(response.data.loggedIn)
    //                 console.log(isAuth)
    //             } 
    //         })
    //     }
    // }, [])

    // useEffect(()=>{
    //     const fetchAuth = async () => {
    //         setIsAuth(false);
    //         try {
    //             const {data: response} = await Axios.get("http://localhost:5000/login");
    //             setIsAuth(response.loggedIn)
    //             console.log(isAuth)
    //         } catch (error) {
    //             console.error(error.message)
    //         }
    //         setIsAuth(true)
    //     }

    //     fetchAuth();
    // }, [])

    
    const {isAuth, role, setIsAuth, setRole} = useContext(UserContext)
    
    
    // const init = ()=> {
    //     if(!localStorage.getItem("auth")){
    //         setIsAuth(false)
    //     } else {
    //         const auth = JSON.parse(localStorage.getItem('auth'))
    //         if(auth === 'yes'){
    //             setIsAuth(true)
    //         } else {
    //             setIsAuth(false)
    //         }
    //     }
    // }

    // useEffect(init, [])


    // const user = ()=>{
    //     Axios.get('http://localhost:5000/login')
    //     .then((response)=>{
    //         if(response.data.loggedIn === true){
    //             setIsAuth(response.data.loggedIn)
    //             console.log(isAuth)
    //         }
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
            
    // }   

    // useEffect(user, [])


    return (
        isAuth ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes   