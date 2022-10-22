import styled from 'styled-components';

export const Container = styled.div`
min-height: 100vh;
background-color: #f8f9fa;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`

export const CardContainer = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    padding: 40px 50px;
    /* border: 1px solid #cecece; */
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    width: 400px;
`

export const CardHeader = styled.div`
    text-align: center;
    margin: 20px 0;
    color: #2c3246;

    & h2 {
        font-size: 24px;
    }
`

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const LogoImg = styled.img`
    height: 85px;
    width: 90px;
`

export const LogoText = styled.div`
    display: flex;
    justify-content: center;
`

export const ErrorText = styled.p`
    color: #000;
    font-size: 12px;
    background-color: #ffebe9;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid rgba(255,129,130,0.4);
`

export const CardBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const FormGroup = styled.div`

    align-items: center;
    border: 1px solid #cecece;
    display: flex;
    justify-content: center;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 5px;

    & svg {
        color: #9195a0;
    }

    & input {
        border: none;
        padding: 10px;
        outline: none;
        width: 100%;
    }
    
`

export const CardFooter = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;

    & button {
        cursor: pointer;
        padding: 10px 0;
        border: none;
        border-radius: 5px;
        background-color: #2c3246;
        color: #fff;
        text-transform: uppercase;
    }

    & a {
        text-decoration: none;
        font-size: 14px;
        margin-top: 20px;
        color: gray;
    }

`