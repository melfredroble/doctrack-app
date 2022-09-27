import React,{useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {  } from "react-icons/fa";
import {CardContainer, CardHeader, CardBody, FormGroup, CardFooter, LogoText} from './styles';

import Axios from 'axios';
import UserContext from '../../context/UserContext';


const LoginForm = () => {

    let navigate = useNavigate('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');


    Axios.defaults.withCredentials = true;

    const {isAuth, setIsAuth} = useContext(UserContext)

    // const handleLogin = async () => {
    //     await Axios.post("http://localhost:5000/login", {
    //       email: email,
    //       password: password,
    //     }).then((response) => {
    //       if (response.data.loggedIn === true) {
    //         setIsAuth(response.data.loggedIn)
    //         navigate('/')
    //       } else if(response.data.message){
    //         setLoginStatus(response.data.message);
    //       }
    //     });
    //   };


        const handleLogin = async (e) => {
            e.preventDefault();
            const response = await Axios.post("http://localhost:5000/login", {
                email: email,
                password: password
            })
            if(response) {
                // const user = response.data.user;
                // localStorage.setItem("auth", '"yes"');
                // console.log(isAuth)
                // setIsAuth(true)
                // localStorage.setItem("user", JSON.stringify(user));
                navigate('/');
            }

            if(response.data.message){
                setLoginStatus(response.data.message);
            }
        };




    return (
            <CardContainer>
                <LogoText>
                    <h1 style={{textAlign: 'center'}}>Doc</h1>
                    <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Track</h1>
                </LogoText>
                <CardHeader>
                    <h2>Admin</h2>
                    <p>{loginStatus}</p>
                    {/* {Error} */} 
                </CardHeader>
                <form onSubmit={handleLogin}>
                <CardBody>
                    <FormGroup>
                        <input 
                        type="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email address' 
                        id="email" />
                    </FormGroup>
                    <FormGroup>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder='Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password" 
                        autoComplete="true"/>
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <button type="submit">Login</button>
                    <Link to="/reset-password">
                        Forgot password?
                    </Link>
                </CardFooter>
                </form>
            </CardContainer>
    )
}

export default LoginForm