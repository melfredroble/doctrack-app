import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import MainContext from '../../context/MainContext';
import {
    Container,
    CardContainer, 
    CardHeader, 
    CardBody, 
    FormGroup, 
    CardFooter
} from './styles';
import ClipLoader from "react-spinners/ClipLoader";

const SecurityQuestions = () => {

    const [ansOne, setAnsOne] = useState('');
    const [ansTwo, setAnsTwo] = useState('');
    const [ansThree, setAnsThree] = useState('');
    const [ansFour, setAnsFour] = useState('');
    const [ansFive, setAnsFive] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    const {setIsValidated} = useContext(MainContext);

    const navigate = useNavigate();

    const handleAnswers = (e)=>{
        e.preventDefault()
        setIsLoading(true)

        axios.post('/security/answer', 
        {ansOne, ansTwo, ansThree, ansFour, ansFive})
        .then((response)=>{
            if(response.data.validated === true){
                setIsValidated(true);
                navigate('/reset-password');
            }
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Invalid answer/s")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }

    return (
        <Container>
        <form onSubmit={handleAnswers}>
            <CardContainer>
                {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
                
                <CardHeader>
                    <h5>Security questions</h5>
                    <p>{message}</p>
                </CardHeader>
                <CardBody>
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
                    <button type="submit">
                        {
                        !isLoading ? "Validate" : <ClipLoader size={16} color="#ffffff" />
                        }
                    </button>
                </CardFooter>
            </CardContainer>
        </form>
    </Container>
    )
}



export default SecurityQuestions