import styled from "styled-components";


export const MainContainer = styled.div`
    width: 500px;
    height: 50px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    
`

export const Container = styled.div`
    height: 40px;
    background-color: #dafbe1;
    box-shadow: 2px 5px 10px 0px rgba(0,0,0,0.2);
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translate(-50%, 0);
    border-radius: 5px;
    padding: 10px;
    border: 1px solid rgba(74,194,107,0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;

    & h1 {
        color: #07bc0c;
        font-size: 14px;
        font-weight: normal;
    }

    & button {
        border: 1px solid rgba(74,194,107,0.4);
        background-color: #dafbe1;
        color: #07bc0c;
        padding: 3px 7px;
        border-radius: 100%;
        cursor: pointer;
        margin-left: 10px;
    }

`