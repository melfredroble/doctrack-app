import React, {useState} from 'react'
import axios from '../../api/axios';
import {Container, CardContainer, CardHeader, CardBody, FormGroup, CardFooter} from './styles';

const SecurityQuestions = () => {

    const [ansOne, setAnsOne] = useState('')
    const [ansTwo, setAnsTwo] = useState('')
    const [ansThree, setAnsThree] = useState('')
    const [ansFour, setAnsFour] = useState('')
    const [ansFive, setAnsFive] = useState('')

    const handleAnswers = (e)=>{
        e.preventDefault()

        axios.post('/security/answer', {ansOne, ansTwo, ansThree, ansFour, ansFive})
        .then((response)=>{
            if(response){
                console.log(response)
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
                    {/* {Error} */} 
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
                        type="text"
                        value={ansOne}
                        onChange={(e)=> setAnsOne(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What is your mother's maiden name?</label>
                        <input 
                        type="text"
                        value={ansTwo}
                        onChange={(e)=> setAnsTwo(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What was your favorite subject in high school?</label>
                        <input 
                        type="text"  
                        value={ansThree}
                        onChange={(e)=> setAnsThree(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What was your dream job as a child?</label>
                        <input 
                        type="text"  
                        value={ansFour}
                        onChange={(e)=> setAnsFour(e.target.value)}
                        required
                        />
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="qtnOne">What is your favorite movie?</label>
                        <input 
                        type="text"  
                        value={ansFive}
                        onChange={(e)=> setAnsFive(e.target.value)}
                        required
                        />
                    </FormGroup>
                </CardBody>
                <CardFooter>
                    <button type="submit">Submit</button>
                </CardFooter>
            </CardContainer>
        </form>
    </Container>
    )
}

export default SecurityQuestions