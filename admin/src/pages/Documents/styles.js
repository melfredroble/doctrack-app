import styled from "styled-components";


export const MainContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

    & h1 {
        margin-bottom: 10px;
        text-align: center;
    }

    & label {
        margin: 0 10px;
    }

    & input {
        padding: 10px;
        margin: 10px;
        width: 400px;
    }

    & select {
        padding: 10px;
        margin: 10px;
        width: 400px;
    }

    & button {
        padding: 10px;
        cursor: pointer;
        margin: 10px;
        width: 400px;
    }

    & textarea {
        padding: 10px;
        margin: 10px;
        width: 400px;
    }
`

export const InnerContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;

`

export const AddDocumentPage = styled.div`

    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 130px;
`

export const Card = styled.div`
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    width: 300px;

    & div {
        display: flex;
    }

    & p {
        font-size: 16px;
        margin: 5px;
    }
`

