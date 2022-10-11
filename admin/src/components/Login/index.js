import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Container, CardContainer, CardHeader, LogoContainer, LogoImg, CardBody, FormGroup, CardFooter, LogoText, ErrorText } from './styles';
import axios from '../../api/axios';
import UserContext from '../../context/UserContext';
import AuthContext from '../../context/AuthContext';
import logo from '../../assets/img/profile1.png'
import ClipLoader from "react-spinners/ClipLoader";


const Login = () => {

    let navigate = useNavigate('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    axios.defaults.withCredentials = true;

    const { isAuth, setIsAuth } = useContext(AuthContext)
    const { userList } = useContext(UserContext)

    const handleLogin = async (e) => {
        setIsLoading(true)
        try {
            e.preventDefault();
            const response = await axios.post("/login", {
                email: email,
                password: password
            })
            if (response.data.loggedIn === true) {
                setIsAuth(true)
                setIsLoading(false)
                userList()
                navigate('/')
            } else {
                setIsAuth(false)
            }

            if (response.data.message) {
                setLoginStatus(response.data.message);
                setIsLoading(false)
            }
        } catch (error) {
            if (error) {
                setLoginStatus("Server error");
                console.log(error)
            }
        }
    };

    return (
        !isAuth &&
        <Container>
            <CardContainer>
                <LogoContainer>
                    <LogoImg src={logo} />
                    {/* <LogoText>
                        <h1 style={{ textAlign: 'center' }}>Doc</h1>
                        <h1 style={{ textAlign: 'center', color: '#50A8EA' }}>Track</h1>
                    </LogoText> */}
                </LogoContainer>
                <CardHeader>
                    <h2>Admin Login</h2>
                    {loginStatus && <ErrorText>{loginStatus}</ErrorText>}
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardBody>
                        <FormGroup>
                            <FaEnvelope />
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email address'
                                id="email" />
                        </FormGroup>
                        <FormGroup>
                            <FaLock />
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                autoComplete="true" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <button type="submit">
                            {
                            !isLoading ? "Login" : <ClipLoader size={16} color="#ffffff" />
                            }
                        </button>
                        <Link to="/reset-password">
                            Forgot password?
                        </Link>
                    </CardFooter>
                </form>
            </CardContainer>
        </Container>
    )
}



export default Login