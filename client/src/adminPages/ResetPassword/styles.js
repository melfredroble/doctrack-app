import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    width: 100vw;
    padding: 20px;
    display: flex;
    justify-content: center;
`

export const CardContainer = styled.div`
    width: 400px;
    height: auto;
    padding: 50px 50px 50px 50px;
    margin: auto;
    /* margin-top: 20px; */
    /* text-align: center; */
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);

    @media screen and (max-width: 767px) {
        width: 330px;
        padding: 40px 30px;
        overflow: hidden;
    }
`

export const CardHeader = styled.div`
    text-align: center;
    margin-bottom: 30px;
    color: #2c3246;

    & h2 {
        font-size: 24px;
    }
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
        background-color: #7b1113;
        color: #ffffff;
        font-weight: bold;
        text-transform: uppercase;
        margin-top: 10px;
    }

    & a {
        text-decoration: none;
        font-size: 14px;
        margin-top: 20px;
        color: gray;
    }

`

export const ModalBackDrop = styled.div`
    filter: blur(8px);
    -webkit-filter: blur(5px);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden !important;
`

export const ModalContainer = styled.div`
    background-color: #ffffff;
    height: 150px;
    width: 320px;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.15);
    color: #414a4c;
    overflow: hidden !important;
    border-radius: 10px;
    border: 1px solid #07bc0c;
`

export const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;

    & svg {
        font-size: 62px;
        color: #07bc0c;
        margin: 10px;
    }
    
    & h5 {
        color: #07bc0c;
        font-size: 26px;
    }

`