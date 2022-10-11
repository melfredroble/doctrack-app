import styled from "styled-components";

export const DeleteModalBackdrop = styled.div`
    /* background: #eeeeee; */
    backdrop-filter: blur(1px);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden !important;
`

export const DeleteModalContainer = styled.div`
    background-color: #ffffff;
    height: 250px;
    width: 350px;
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
`
export const DeleteModalHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #e74c3c;
    height: 150px;

    & svg {
        color: yellow;
        font-size: 48px;
        margin-bottom: 10px;
    }
`

export const DeleteModalBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const Text = styled.h1`
    font-size: 18px;
    margin-bottom: 10px;
    color: #fff;
    font-weight: ${props => props.fw};
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    padding: 30px;
    width: 100%;
`

export const CloseButton = styled.button`
    cursor: pointer;
    /* background-color: #07bc0c; */
    background: ${props => props.background};
    background-color: ${props => props.bg};
    border: none;
    color: #000000;
    border-radius: 5px;
    padding: ${props => props.padding};
    font-size: ${props => props.fs};
`

export const CloseButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    width: 100%;
`

export const DeleteButton = styled.button`
    padding: 5px 30px;
    cursor: pointer;
    background-color: #e74c3c;
    border: 1px solid rgba(255,129,130,0.4);
    color: #fff;
    border-radius: 5px;
    
`

// export const ModalOverlay = styled.a`
// background: rgba(247, 248, 249, 0.75);
// bottom: 0;
// cursor: default;
// display: block;
// left: 0;
// position: absolute;
// right: 0;
// top: 0;
// `;

// export const ModalClose = styled.a`
// float: right !important;
// text-decoration: none !important;
// cursor: pointer;
// font-size: 1rem;
// `;

// export const ModalContainer = styled.div`
// background: #ffffff;
// border-radius: 0.1rem;
// display: flex;
// flex-direction: column;
// max-height: 75vh;
// max-width: 500px;
// padding: 0 0.8rem;
// width: 100%;
// animation: slide-down 0.2s ease 1;
// z-index: 1;
// box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);
// `;

// export const ModalBody = styled.div`
// overflow-y: auto;
// padding: 30px 10px;
// position: relative;
// `;

// export const ModalHeader = styled.div`
// display: flex;
// flex-direction: row;
// justify-content: space-between;
// color: #303742;
// padding: 20px 5px 10px 5px;
// `;

// export const ModalTitle = styled.span`
// font-size: 30px;
// font-weight: 500;
// `;

// export const ModalFooter = styled.div`
// padding: 10px 0px;
// text-align: right;
// `;

// export const ModalButton = styled.button`
// background: #7b2cbf;
// color: white;
// font-size: 1em;
// margin: 10px;
// padding: 5px 10px;
// border: 2px solid #7b2cbf;
// border-radius: 3px;
// cursor: pointer;
// `;