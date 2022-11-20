import React, {useEffect} from 'react'
import { FaCog } from 'react-icons/fa';
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const AppSetting = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=> {
        user.role !== "admin" && navigate('/dashboard');
    },[])

    return (
        <MainContainer>
            <CardContainer>
                <CardHeader>
                    <FaCog/><Text>App Settings</Text>
                </CardHeader>
                <CardBody>
                    <form>
                        <FormGroup>
                            <label htmlFor="">App logo</label>
                            <input type="file" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">App name</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">Contact email</label>
                            <input type="email" name="" id="" />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="">Footer</label>
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

export default AppSetting