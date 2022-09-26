import React from 'react'
import { FaCog } from 'react-icons/fa';
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'

const AppSetting = () => {
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
                            <label htmlFor="">Footer</label>
                            <input type="text" name="" id="" />
                        </FormGroup>
                    </form>
                </CardBody>
                <CardFooter>
                    <Button>Save settings</Button>
                </CardFooter>
            </CardContainer>
        </MainContainer>
    )
}

export default AppSetting