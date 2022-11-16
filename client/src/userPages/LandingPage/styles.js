import styled from "styled-components";
// import img from "../../assets/img/background.JPG";
import img from "../../assets/img/img2.jpg";

export const BackgroundImg = styled.div`
  background-image: url(${img});
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px);
  -webkit-filter: blur(5px);
`;

export const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
  /* width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  /* background-color: #f8f9fa; */
`;
export const Card = styled.div`
  /* background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 40px; */
  /* border: 1px solid #cecece; */
  /* box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 400px; */
  width: 500px;
  height: auto;
  padding: 50px 50px 50px 50px;
  margin: auto;
  /* margin-top: 20px; */
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
`;
export const CardHeader = styled.div`
  text-align: center;

  & h1 {
    font-size: 22px;
    font-weight: bolder;
    color: #2d3436;
  }

  & p {
    margin: 10px;
    font-weight: lighter;
    font-size: 14px;
    color: #2d3436;
  }
`;
export const CardBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & button {
    width: 100%;
    padding: 10px;
    margin-top: 22px;
    /* border-radius: 5px; */
    cursor: pointer;
    color: #ffffff;
    background-color: #7b1113;
    border: none;
    outline: none;
  }

  & p {
    margin: 10px;
    font-weight: lighter;
    font-size: 14px;
    color: #2d3436;
    width: 100%;
  }
`;
export const LogoImg = styled.div`
  margin-bottom: 20px;
  & img {
    margin: auto;
    width: 180px;
  }
`;
export const Footer = styled.div`
  margin-top: 15px;
  text-align: center;

  & p {
    font-weight: lighter;
    font-size: 14px;
    color: #ffffff;
    width: 100%;
  }
`;
