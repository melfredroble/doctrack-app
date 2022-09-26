import React,{useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {  } from "react-icons/fa";
import {Container, CardContainer, CardHeader, CardBody, FormGroup, CardFooter} from './styles';

const ResetPassword = () => {

    const [email, setEmail] = useState('');



    return (
        <Container>
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
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email address' 
                            id="email" />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <button type="button">Submit</button>
                    </CardFooter>
                </CardContainer>
            </form>
        </Container>
    )
}

export default ResetPassword