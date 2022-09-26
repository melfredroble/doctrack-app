import styled from 'styled-components'

export const MainContainer = styled.div`
    margin-left: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 10px;
    overflow: hidden !important;
`

export const Text = styled.h3`
    color: #2C3246;
    margin-left: 7px;
`

export const CardContainer = styled.div`

    height: 100%;
    width: 700px;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
`

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    height: 36px;
    border-bottom: 1px solid #eee;
    border-radius: 5px 5px 0 0;
    padding: 30px 16px;
`

export const CardBody = styled.div`
    padding: 32px;
    color: #000;
`

export const CardFooter = styled.div`
    padding: 32px;
`

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;

    & input {
        width: 100%;
        padding: 8px;
        outline: none;
        border: 1px solid #cecece;
        border-radius: 5px;
        margin: 10px 0;
    }

    & input[type="file"] {
        cursor: pointer;
    }
`
export const Button = styled.button`
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #50a8ea;
    color: #fff;
`