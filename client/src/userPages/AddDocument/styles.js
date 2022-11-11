import styled from "styled-components";

export const MainContainer = styled.div`
  margin-left: 250px;
  height: 100%;
  padding: 30px 0 0 0;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 500px;
  height: 100%;
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.mt};
  margin-bottom: 30px;
`;

export const CardHeader = styled.div`
  padding: 15px;
  background-color: #f5f5f5;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;

  & h1 {
    font-size: 14px;
  }
`;

export const CardBody = styled.div`
  padding: 10px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const FormGroup = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  & label {
    margin-bottom: 10px;
    font-size: 14px;
  }

  & input {
    border: 1px solid #cecece;
    padding: 10px;
    outline: none;
    width: 100%;
    background-color: ${(props) => props.bg};
    margin-bottom: 10px;
  }

  & textarea {
    border: 1px solid #cecece;
    padding: 10px;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Roboto', sans-serif;
  }

  & p {
    font-size: 12px;
    color: gray;
  }
`;

export const Input = styled.input`
  border: 1px solid #cecece;
  padding: 10px;
  outline: none;
  width: 100%;
  background-color: ${(props) => props.bg};
  margin-bottom: 10px;

`;

export const CardFooter = styled.div`
  text-align: end;
  padding: 0 30px;
  padding-bottom: 20px;

  & button {
    padding: 8px 10px;
    border: 1px solid #cecece;
    border-radius: 5px;
    cursor: pointer;
  }
`;
