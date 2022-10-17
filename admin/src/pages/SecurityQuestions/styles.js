import styled from "styled-components";

export const Container = styled.div`
    min-height: 100vh;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const CardContainer = styled.div`
    background-color: #ffffff;
    padding: 40px 50px;
    /* border: 1px solid #cecece; */
    box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    width: 500px;
`

export const CardHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;
    color: #2c3246;

    & h5 {
        font-size: 16px;
    }
`

export const CardBody = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const FormGroup = styled.div`

    margin-bottom: 10px;
    & label {
        font-size: 14px;
        margin-bottom: 100px;
    }

    & input {
        margin-top: 10px;
        border: 1px solid #cecece;
        padding: 8px;
        outline: none;
        width: 100%;
        border-radius: 5px;
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
        margin-top: 5px;
    }

    & a {
        text-decoration: none;
        font-size: 14px;
        margin-top: 20px;
        color: gray;
    }

`