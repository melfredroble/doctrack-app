import React from 'react'
import LoginForm from '../components/LoginForm'
import styled from "styled-components";

const Login = () => {

    return (
        <Container> 
            <LoginForm />
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export default Login