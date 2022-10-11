import styled from 'styled-components'

export const MainContainer = styled.div`
    min-height: 100vh;
    width: 250px;
    background-color: #2c3246;
    box-shadow:  0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    z-index: 2;

    & h3 {
        color: #000;
    }

    & a {
        color: #000;
        text-decoration: none;
    }
`

export const SidebarHeader = styled.div`

    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 10px 0 0;
`

export const SidebarLinks = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`

export const SidebarLink = styled.div`

    display: flex;
    align-items: center;
    /* border-bottom: 0.5px solid #eee; */
    height: 50px;
    & svg {
        font-size: 28px;
        padding-right: 10px;
    }

    & a {
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        padding-left: 10px; 
        font-size: 12px;
        color: #9195A0;
        text-transform: uppercase;
    }

    & a:hover {
            background-color: #272d3f;
        }

    & a:active {
        background-color: #272d3f;
    }
`

export const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const LogoImg = styled.img`
    height: 45px;
    width: 50px;
`

export const LogoText = styled.div`
    display: flex;
    
    & h1 {
        font-size: 18px;
    }
`

export const HeaderText = styled.h1`
    color: #9195A0;
    font-size: 12px;
    text-transform: uppercase;
    margin: 10px 0;
`

export const Container = styled.div`
    color: #50A8EA;
    font-size: 18px;
    padding: 10px;
`
