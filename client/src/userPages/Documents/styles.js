import styled from "styled-components";

export const MainContainer = styled.div`
  margin-left: 250px;
  height: 100%;
`;
export const InnerContainer = styled.div`
  margin: 0 30px 30px 30px;
  height: 100%;
  padding: 10px 20px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyContent};
  margin-top: ${props=>props.mt};
  margin-bottom: ${props=>props.mb};
`;

export const HeaderText = styled.h1`
  font-size: 14px;
  font-weight: bold;
  color: #414a4c;
  text-transform: uppercase;
  margin-left: 5px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: ${(props) => props.w};
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 20px;
  margin-top: ${props=>props.mt};
  border: 1px solid #dcdcdc;
  
`;

export const TableContainer = styled.div`
  padding: 20px 0;
`;

export const Button = styled.button`
  display: ${(props) => props.display};
  justify-content: ${(props) => props.content};
  align-items: ${(props) => props.align};
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border: ${props => props.border};
  outline: none;
  color: ${props => props.color};
  border-radius: ${(props) => props.br};
  margin-right: ${props => props.mr};
  cursor: pointer;
  & svg {
    font-size: 18px;
  }
`;


// Modal
export const ModalBackdrop = styled.div`
  /* background: #eeeeee; */
  backdrop-filter: blur(1px);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden !important;
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  height: 100%;
  width: 350px;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.15);
  color: #414a4c;
  padding: 15px;
`;

export const ModalHeader = styled.div`
  margin-top: 10px;
  display: flex;

  & h1 {
    font-size: 16px;
    font-weight: 700;
    margin-left: 8px;
  }
`;

export const CloseModal = styled.button`
  background-color: #e74c3c;
  padding: 8px 12px;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin-right: 6px;
`;

export const ModalBody = styled.div``;

export const ModalFooter = styled.div`
  text-align: end;
`;
// End Modal

// Doctype Form
export const FormGroup = styled.div`
  margin: 40px 0 20px 0;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

export const TextGroup = styled.div`
  width: 100%;
  padding: 6px;

  & h5 {
    margin-bottom: 5px;
    font-size: 14px;
  }

  & button {
    color: rgb(0 109 254);
    padding: 5px;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const ViewDocumentContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const Table = styled.table`
  border-collapse: collapse;
`

export const Tbody = styled.tbody`
  width: 100%;

  & tr, td, th {
    border: 1px solid #dcdcdc;
    padding: 15px;
    font-size: 14px;
    margin: 0;
  }

  & th {
    font-weight: bold;
    font-size: 14px;
  }
`

export const ViewButton = styled.button`
  color: #50A8EA;
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover{
    text-decoration: underline;
  }
`
export const Breadcrumb = styled.div`

`
export const Unordered = styled.div`
  margin-top: 15px;
  list-style: none;
`
export const Item = styled.div`
  display: inline;
  font-size: 12px;

  & a {
    color: ${props=>props.color};
    text-decoration: none;

  }

  & button {
    color: ${props=>props.color};
    background: none;
  border: none;
  cursor: ${props=>props.cursor};
  font-size: 13px;
  }

  & span {
    margin: 0 5px;
  }
`