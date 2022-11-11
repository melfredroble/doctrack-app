import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 100vw;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const CardContainer = styled.div`
  width: 400px;
  height: auto;
  padding: 50px 50px 50px 50px;
  margin: auto;
  /* margin-top: 20px; */
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);

  @media screen and (max-width: 767px) {
    width: 330px;
    padding: 40px 30px;
    overflow: hidden;
  }
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3246;

  & h2 {
    font-size: 24px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const LogoImg = styled.img`
  height: 85px;
  width: 90px;
`;

export const LogoText = styled.div`
  display: flex;
  justify-content: center;
`;

export const ErrorText = styled.p`
  color: #000;
  font-size: 12px;
  background-color: #ffebe9;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid rgba(255, 129, 130, 0.4);
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  align-items: center;
  border: 1px solid #cecece;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  margin-bottom: 10px;
  background-color: #ffffff;

  & svg {
    color: #9195a0;
  }

  & input {
    border: none;
    padding: 10px;
    outline: none;
    width: 100%;
  }
`;

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
  }

  & a {
    text-decoration: none;
    font-size: 14px;
    margin-top: 20px;
    color: #7b1113;
  }

  & a:hover {
    text-decoration: underline;
  }
`;
