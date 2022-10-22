import React,{useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {  } from "react-icons/fa";
import {Container, CardContainer, CardHeader, CardBody, FormGroup, CardFooter} from './styles';
import axios from '../../api/axios';
import SecurityQuestions from '../SecurityQuestions';
import MainContext from '../../context/MainContext';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {validate} = useContext(MainContext);
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // useEffect(()=>{
    //     const storedToken = JSON.parse(localStorage.getItem("Token_key"));
    //     if(storedToken){
    //         console.log("meron")
    //     }
    // })

    const resetPassword = (e)=>{
        e.preventDefault();
        if(password !== confirmPassword) {
            setError("Password unmatched");
        } else {
            axios.post('/security/reset', {pwd: password})
            .then((response)=>{
                if(response.status === 200){
                    alert("Success");
                    navigate('/login');
                }
            })
            .catch((error)=>{
                if(error){
                    setError(error.message)
                }
            })
        }
    }




    return (
        validate ? <Container>
            <form onSubmit={resetPassword}>
                <CardContainer>
                    {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
                
                    <CardHeader>
                        <h2>Reset Password</h2>
                        {error} 
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password' 
                            required/>
                        </FormGroup>
                        <FormGroup>
                            <input 
                            type="password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm password' 
                            required/>
                            
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <button type="submit">Reset</button>
                    </CardFooter>
                </CardContainer>
            </form>
        </Container>
        : <SecurityQuestions/>
    )
}

export default ResetPassword