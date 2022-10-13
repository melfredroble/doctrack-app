import React from 'react'
import { FaUserShield } from 'react-icons/fa'
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'
import Footer from '../../components/Footer'

const SecuritySetting = () => {
    return (
        <MainContainer>
            <CardContainer>
                <CardHeader>
                    <FaUserShield/><Text>Security Questions</Text>
                </CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <label htmlFor="">What was your childhood nickname?</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What is the name of your favorite pet?</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What is your mother's maiden name?</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What was your favorite subject in high school?</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">What was your dream job as a child?</label>
                            <input type="text" name="" id="" />
                        </FormGroup> 
                        <FormGroup>
                            <label htmlFor="">What is your favorite movie?</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                    </form>
                </CardBody>
                <CardFooter>
                    <Button>Save changes</Button>
                </CardFooter>
            </CardContainer>
            <Footer/>
        </MainContainer>
    )
}


export default SecuritySetting