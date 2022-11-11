import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CardContainer = styled.div`
  background-color: #ffffff;
  padding: 40px 50px;
  /* border: 1px solid #cecece; */
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  width: 500px;
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
    border-radius: 5px;
    background-color: #2c3246;
    color: #fff;
    text-transform: uppercase;
    margin-top: 5px;
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
