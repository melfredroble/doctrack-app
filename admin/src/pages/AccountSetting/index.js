import React from 'react'
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'
import { FaUserCog } from 'react-icons/fa';
import Footer from '../../components/Footer';

const AccountSetting = () => {
    return (
        <MainContainer>
            <CardContainer>
                <CardHeader>
                    <FaUserCog/><Text>Account Settings</Text>
                </CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <label htmlFor="">Full name</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">Email</label>
                            <input type="email" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">Office</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                    </form>
                </CardBody>
                <CardFooter>
                    <Button>Save settings</Button>
                </CardFooter>
            </CardContainer>
            <Footer/>
        </MainContainer>
    )
}

export default AccountSetting