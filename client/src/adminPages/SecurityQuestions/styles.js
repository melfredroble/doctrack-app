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
`;

export const CardContainer = styled.div`
  width: 500px;
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
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3246;

  & h5 {
    font-size: 16px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  & label {
    font-size: 14px;
    margin-bottom: 100px;
  }

  & input {
    margin-top: 10px;
    border: 1px solid #cecece;
    padding: 8px;
    outline: none;
    width: 100%;
    border-radius: 5px;
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
    margin-top: 10px;
  }

  & a {
    text-decoration: none;
    font-size: 14px;
    margin-top: 20px;
    color: gray;
  }
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
