import styled from "styled-components";

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 250px;
  /* background-color: #7b1113; */
  background-color: #222d32;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
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
`;

export const SidebarHeader = styled.div`
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px 0 0;
  /* background-color: #900303; */
  border-bottom: 1px solid #dcdcdc;
`;

export const SidebarLinks = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const SidebarLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-bottom: 0.5px solid #eee; */
  height: 50px;

  & svg {
    font-size: 28px;
    padding-right: 10px;
  }

  & a {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    /* padding: 30px 20px; */
    /* font-size: 14px; */
    /* color: #9195a0; */
    /* color: #2d3436; */
    color: #ffffff;
    font-weight: lighter;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    /* display: block; */
    font-size: 13px;
    line-height: 20px;
    padding: 11px 20px;
  }

  & a:hover {
    background-color: #1e282c;
  }

  & a:active {
    background-color: #1e282c;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImg = styled.img`
  height: 45px;
  width: 55px;
`;

export const LogoText = styled.div`
  display: flex;

  & h1 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 500;
  }
`;

export const HeaderText = styled.h1`
  color: #9195a0;
  font-size: 12px;
  text-transform: uppercase;
  margin: 10px 0;
`;

export const Container = styled.div`
  color: #50a8ea;
  font-size: 18px;
  padding: 10px;
`;
