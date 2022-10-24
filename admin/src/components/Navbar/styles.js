import styled from 'styled-components'

export const MainContainer = styled.div`
    box-shadow:  0 0 5px 0 rgba(0, 0, 0, 0.2);
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    justify-content: end;
    background-color: #ffffff !important;
    z-index: 1;

`

export const Container = styled.div`

    margin-top: 285px;
    min-height: 200px;
    position: absolute;
    background-color: transparent;
`

export const InnerContainer = styled.div`
    width: 100%;
    margin-left: 250px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

`

export const HeaderText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & h3 {
        color: #414a4c;
        font-size: 16px;
        margin-left: 10px;
    }
`

export const Item = styled.div`
    width: 200px;
    height: 100px;
    margin: 0 auto;
    background-color: #ffffff;
    box-shadow: 2px 5px 10px 0px rgba(0,0,0,0.2);
    border-radius: 10px;
    padding: 15px;
`

export const Button = styled.button`

    background-color: #ffffff;
    border: none;
    cursor: pointer;
    color: #6c757d;
    padding: 10px 0;
    font-weight: bold;
    display: flex;
    align-items: center;
    width: 100%;
    & svg {
        font-size: 20px;
        margin-right: 10px;
    }
`

export const Text = styled.h3`
    font-size: 14px;
    color: #6c757d;
    font-weight: normal;
`

export const UserProfile = styled.button`
background-color: transparent;
border: none;
cursor: pointer;
color: #6c757d;
padding: 10px;
font-weight: bold;
display: flex;
align-items: center;
margin-top: 5px;

& img {
    height: 30px;
    width: 32px;
    margin-right: 10px;
}

& p {
    font-weight: 700;
    font-size: 14px;
}
`

export const ItemLink = styled.div`
    display: flex;
    align-items: center;

    & svg {
        font-size: 18px;
        color: #6c757d;
        margin-right: 10px;
    }

    & a {
        color: #6c757d;
        font-size: 14px;
    }
`


export const ModalBackDrop = styled.div`
    backdrop-filter: blur(1px);
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden !important;
    z-index: 10;
`

export const ModalContainer = styled.div`
    background: none;
    width: 500px;
    position: fixed;
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    color: #414a4c;
    overflow: hidden !important;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`

// export const ModalInnerContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: column;
//     height: 100%;

//     & svg {
//         font-size: 62px;
//         color: #07bc0c;
//         margin: 10px;
//     }
    
//     & h5 {
//         color: #07bc0c;
//         font-size: 26px;
//     }

// `