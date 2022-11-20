import styled from "styled-components";

export const MainContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  z-index: 2;
  width: 80%;
  padding: 20px;
  text-align: center;
`;

export const Card = styled.div`
position: relative;
  width: ${(props) => props.w};
  height: auto;
  padding: ${(props) => props.p};
  margin: auto;
  /* margin-top: 20px; */
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
  margin-top: ${props => props.mt};
`;

export const CardContainer = styled.div`
  width: ${(props) => props.w};
  height: auto;
  padding: ${(props) => props.p};
  margin-top: 20px;
  text-align: center;
  background: #ffffff;
  box-shadow: 1px 1px 3px rgb(0 0 0 / 30%);
  margin: ${(props) => props.margin};
`;

export const CardHeader = styled.div`
  text-align: center;
  color: #2d3436;
  display: flex;
  justify-content: center;

  & h1 {
    margin-bottom: 20px;
  }
`;

export const CardBody = styled.div`
  margin-top: 10px;
`;
export const FormGroup = styled.div`
  display: flex;
  border: 1px solid #eaaa00;
  justify-content: center;
  align-items: center;
  background-color: #eaaa00;
  & input {
    height: 35px;
    width: 100%;
    padding: 10px;
    border: none;
    outline: none;
  }

  & button {
    padding: 5px 0;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  & svg {
    font-size: 20px;
    margin: 0 10px;
    color: #ffffff;
  }
`;

export const MessageText = styled.div`
  margin-top: 30px;

  & p {
    color: red;
  }
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 0;

  & td,
  th {
    border: 1px solid #dcdcdc;
    text-align: left;
    padding: 10px 15px;
    margin: 0;
  }

  & th {
    text-align: center;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 0;

  & svg {
    color: #eaaa00;
    font-size: 36px;
    margin: 20px 15px;
  }
`