import styled from "styled-components";

export const MainContainer = styled.div`

    margin-left: 250px;
    padding: 0 10px;

`

export const InnerContainer = styled.div`
    margin: 30px;
    height: 100%;
    padding: 16px 20px;
`

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props  => props.justifyContent};

    & svg {
        font-size: 22px;
        margin-right: 10px;
    }
`


export const HeaderText = styled.h1`
    font-size: 12px;
    font-weight: bold;
    color: #414a4c;
    text-transform: uppercase;
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.2);
    border-radius: 5px;
    padding: 20px;
    margin-top: 30px;
`

export const TableContainer = styled.div`
    padding: 20px 0;
`

export const Button = styled.button`
    padding: ${props => props.padding};
    background-color: ${props => props.bg};
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
`

export const Table = styled.table`
    

`

// Modal
export const ModalBackdrop = styled.div`
    /* background: #eeeeee; */
    backdrop-filter: blur(1px);
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden !important;
`

export const ModalContainer = styled.div`
    background-color: #ffffff;
    height: 100%;
    width: 350px;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 0 10px 0px rgba(0,0,0,0.15);
    color: #414a4c;
    padding: 15px;
`

export const ModalHeader = styled.div`
    margin-top: 10px;
    display: flex;

    & h1 {
        font-size: 16px;
        font-weight: 700;
        margin-left: 8px;
    }
`

export const CloseModal = styled.button`

    background-color: #e74c3c;
    padding: 8px 12px;
    color: #ffffff;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 6px;
`

export const ModalBody = styled.div`
`

export const ModalFooter = styled.div`

    text-align: end;
`
// End Modal

// Doctype Form
export const FormGroup = styled.div`
    margin: 40px 0 20px 0;
`

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    font-weight: 500 !important;

    & label {
        font-size: 10px;
    }

    & input {
        margin-top: 8px;
        padding: 8px;
        width: 100%;
        border: 1px solid #cccccc;
        outline: none;
    }

    & select {
        margin-top: 8px;
        padding: 8px;
        width: 100%;
        border: 1px solid #cccccc;
        outline: none;
    }
`

export const PinContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
        font-size: 12px;
        padding: 10px;
        margin-top: 9px;
        border: none;
        outline: none;
        background-color: gray;
        color: #fff;
        border-radius: 3px 0px 0px 3px;
        cursor: pointer;
    }

    
`

export const ErrorText = styled.p`
    color: #000;
    font-size: 12px;
    background-color: #ffebe9;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid rgba(255,129,130,0.4);
`

export const SuccessText = styled.p`
    background-color: #2da44e;
    /* #dafbe1; green
        rgba(74,194,107,0.4)
        #dafbe1;
    */
    border: 1px solid rgba(74,194,107,0.4);
    
`