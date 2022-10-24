import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa';
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles';
import Footer from '../../components/Footer';
import axios from '../../api/axios';

const SecuritySetting = () => {

    const [qtnOne, setQtnOne] = useState('');
    const [qtnTwo, setQtnTwo] = useState('');
    const [qtnThree, setQtnThree] = useState('');
    const [qtnFour, setQtnFour] = useState('');
    const [qtnFive, setQtnFive] = useState('');

    
    const handleSecurity = (e)=>{
        e.preventDefault()
        axios.put('/security/update', {qtnOne, qtnTwo, qtnThree, qtnFour, qtnFive})
        .then((response)=>{
            if(response.status === 200){
                console.log(response.data.message)
            }
        })
        .catch((error)=>{
            if(error){
                console.log(error.message)
            }
        })
    }

    return (
        <MainContainer>
            <CardContainer>
                <form onSubmit={handleSecurity}>
                <CardHeader>
                    <FaUserShield/><Text>Security Questions</Text>
                </CardHeader>
                <CardBody>
                        <FormGroup>
                            <label htmlFor="">What is the name of your favorite pet?</label>
                            <input 
                            type="text" 
                            value={qtnOne} 
                            onChange={(e)=> setQtnOne(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What is your mother's maiden name?</label>
                            <input 
                            type="text" 
                            value={qtnTwo} 
                            onChange={(e)=> setQtnTwo(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What was your favorite subject in high school?</label>
                            <input 
                            type="text" 
                            value={qtnThree} 
                            onChange={(e)=> setQtnThree(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What was your dream job as a child?</label>
                            <input 
                            type="text"
                            value={qtnFour} 
                            onChange={(e)=> setQtnFour(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What is your favorite movie?</label>
                            <input 
                            type="text" 
                            value={qtnFive} 
                            onChange={(e)=> setQtnFive(e.target.value)}
                            required
                            />
                        </FormGroup>
                </CardBody>
                <CardFooter>
                    <Button type='submit'>Save changes</Button>
                </CardFooter>
                </form>
            </CardContainer>
            <Footer/>
        </MainContainer>
    )
}


export default SecuritySetting