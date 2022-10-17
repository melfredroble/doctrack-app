import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {  } from "react-icons/fa";
import {Container, CardContainer, CardHeader, CardBody, FormGroup, CardFooter} from './styles';
import axios from '../../api/axios';
import Login from '../../components/Login';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValidate, setIsValidate] = useState(false)

    useEffect(()=>{
        axios.get('/security')
        .then((response)=>{
            if(response.data.isValidate === true){
                setIsValidate(true)
            } else {
                setIsValidate(false)
            }
        })
        .catch((error)=> console.log(error))
    })

    return (
        isValidate ? <Container>
            <form >
                <CardContainer>
                    {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
                    
                    <CardHeader>
                        <h2>Reset Password</h2>
                        {/* {Error} */} 
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password' 
                            id="email" />
                        </FormGroup>
                        <FormGroup>
                            <input 
                            type="email" 
                            name="email" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm password' 
                            id="email" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <button type="button">Reset</button>
                    </CardFooter>
                </CardContainer>
            </form>
        </Container>
        : <Login/>
    )
}

export default ResetPassword