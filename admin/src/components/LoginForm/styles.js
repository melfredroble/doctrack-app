import styled from 'styled-components';

export const CardContainer = styled.div`
    background-color: #ffffff;
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

export const LogoText = styled.div`
    display: flex;
    justify-content: center;
`

export const CardBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const FormGroup = styled.div`

    margin-bottom: 10px;

    & input {
        border: 1px solid #cecece;
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