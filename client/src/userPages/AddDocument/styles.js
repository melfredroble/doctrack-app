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
  /* box-shadow: 0px 5px 5px 3px rgba(0, 0, 0, 0.2); */
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
  /* background-color: #f5f5f5; */
  /* border: 1px solid #dcdcdc; */
  display: flex;
  align-items: center;
  margin-left: 15px;
  /* justify-content: center; */

  & h1 {
    font-size: 18px;
    color: #414a4c;
  }

`;

export const CardBody = styled.div`
  padding: 0 10px 10px 10px;
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
    border-radius: 5px;
  }

  & textarea {
    border: 1px solid #cecece;
    padding: 10px;
    outline: none;
    margin-bottom: 10px;
    font-family: 'Roboto', sans-serif;
    border-radius: 5px;
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
  border-radius: 5px;
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

export const ModalContainer = styled.div`
  background-color: #ffffff;
  width: 550px;
  position: fixed;
  margin: auto;
  top: 0;
  right: 0;
  left: 20px;
  color: #414a4c;
  overflow: hidden !important;
  z-index: 10;
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #dcdcdc;
  margin-top: 10px;
  transition: all 0.5s ease-out;

`

export const ModalHeader = styled.div`
text-align: right;
border-bottom: 1px solid #dcdcdc;
display: flex;
justify-content: space-between;
padding: 10px;

`

export const ModalTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
& h1 {
  font-size: 18px;
  margin-left: 10px;
}


`

export const ModalBody = styled.div`

padding: 40px 20px 40px 35px;

& h5 {
  font-size: 19px;
  color: red;
  font-weight: bolder;
}
`

export const ModalFooter = styled.div`
padding: 20px 0;
text-align: right;
border-top: 1px solid #dcdcdc;
width: 100%;
`
export const Button = styled.button`
  background: ${props=>props.b};
  background-color: ${props=>props.bg};
  margin-right: ${props=>props.mr};
  border: ${props => props.border};
  outline: none;
  border-radius: 5px;
  padding: 8px;
  color: ${props=>props.color};
  font-size: ${props=>props.fs};
  cursor: pointer;
`