import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import MainContext from '../../context/MainContext';
import {Container, CardContainer, CardHeader, CardBody, FormGroup, CardFooter} from './styles';

const SecurityQuestions = () => {

    const navigate = useNavigate();

    const [ansOne, setAnsOne] = useState('');
    const [ansTwo, setAnsTwo] = useState('');
    const [ansThree, setAnsThree] = useState('');
    const [ansFour, setAnsFour] = useState('');
    const [ansFive, setAnsFive] = useState('');
    const [error, setError] = useState('');
    const {setValidate} = useContext(MainContext);

    const handleAnswers = (e)=>{
        e.preventDefault();
        axios.post('/security/answer', {ansOne, ansTwo, ansThree, ansFour, ansFive})
        .then((response)=>{
            if(response.status === 200){
                // localStorage.setItem("Token_key", JSON.stringify(response.data.token));
                navigate('/reset-password');
                setValidate(true)
            } 
        })
        .catch((error)=> {
            if(error){
                setError("Invalid answers");
            }
        })
    }

    return (
        <Container>
        <form onSubmit={handleAnswers}>
            <CardContainer>
                {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
                
                <CardHeader>
                    <h5>Security questions</h5>
                    {error} 
                </CardHeader>
                <CardBody>
                    {/* <FormGroup>
                        <label htmlFor="qtnOne">What was your childhood nickname?</label>
                        <input 
                        type="text"  />
                    </FormGroup> */}
                    <FormGroup>
                        <label htmlFor="qtnOne">What is the name of your favorite pet?</label>
                        <input 
                        type="password"
                        value={ansOne}
                        onChange={(e)=> setAnsOne(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What is your mother's maiden name?</label>
                        <input 
                        type="password"
                        value={ansTwo}
                        onChange={(e)=> setAnsTwo(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What was your favorite subject in high school?</label>
                        <input 
                        type="password"  
                        value={ansThree}
                        onChange={(e)=> setAnsThree(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What was your dream job as a child?</label>
                        <input 
                        type="password"  
                        value={ansFour}
                        onChange={(e)=> setAnsFour(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What is your favorite movie?</label>
                        <input 
                        type="password"  
                        value={ansFive}
                        onChange={(e)=> setAnsFive(e.target.value)}
                        required
                        />
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <button type="submit">Validate</button>
                </CardFooter>
            </CardContainer>
        </form>
    </Container>
    )
}

export default SecurityQuestions