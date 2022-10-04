import React,{useState, useContext, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {  } from "react-icons/fa";
import {CardContainer, CardHeader, CardBody, FormGroup, CardFooter, LogoText, ErrorText} from './styles';
import Axios from 'axios';
import UserContext from '../../context/UserContext';
import { is } from '@react-spring/shared';
import UserDispatchContext from '../../context/UserDispatchContext';


const LoginForm = () => {

    let navigate = useNavigate('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    const {isAuth, setIsAuth} = useContext(UserContext)
 
        const handleLogin = async (e) => {
            e.preventDefault();
            const response = await Axios.post("http://localhost:5000/login", {
                email: email,
                password: password
            })
            if(response.data.loggedIn === true) {
                navigate('/');
                // localStorage.setItem("user", JSON.stringify(user));
            }

            if(response.data.message){
                setLoginStatus(response.data.message);
            }
        };

        // useEffect(() => {
        //     Axios.get('http://localhost:5000/login')
        //     .then((response) => {
        //         if (response.data.loggedIn === true) {
        //             setIsAuth(true)
        //         }
        //     })
        // },[])

        // useEffect(() => {
        //     console.log("updated", isAuth) 
        // }, [isAuth])

    return (
            <CardContainer>
                <LogoText>
                    <h1 style={{textAlign: 'center'}}>Doc</h1>
                    <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Track</h1>
                </LogoText>
                <CardHeader>
                    <h2>Admin</h2>
                    {loginStatus && <ErrorText>{loginStatus}</ErrorText>}
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