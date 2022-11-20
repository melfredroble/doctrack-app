import styled from "styled-components";

export const MainContainer = styled.div`
  /* box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2); */
  height: 82px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: end;
  background-color: #ffffff !important;
  /* background-color: #a91414; */
  border-bottom: 1px solid #dcdcdc;
  z-index: 1;
`;

export const Container = styled.div`
  margin-top: 285px;
  min-height: 200px;
  position: absolute;
  background-color: transparent;
`;

export const InnerContainer = styled.div`
  width: 100%;
  margin-left: 250px;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & h3 {
    color: #414a4c;
    font-size: 14px;
    margin-left: 10px;
    text-transform: uppercase;
  }
`;

export const Item = styled.div`
  width: 200px;
  height: 100px;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 2px 5px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
`;

export const Button = styled.button`
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  color: #6c757d;
  padding: 10px 0;
  font-weight: bold;
  display: flex;
  align-items: center;
  width: 100%;
  & svg {
    font-size: 20px;
    margin-right: 10px;
  }
`;

export const Text = styled.h3`
  font-size: 14px;
  color: #6c757d;
  font-weight: normal;
`;

export const UserProfile = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #6c757d;
  padding: 10px;
  font-weight: bold;
  display: flex;
  align-items: center;
  /* margin-top: 5px; */

  & svg {
    font-size: 22px;
  }

  & p {
    font-weight: 700;
    font-size: 14px;
    margin-left: 6px;
  }
`;

export const ItemLink = styled.div`
  display: flex;
  align-items: center;

  & svg {
    font-size: 18px;
    color: #6c757d;
    margin-right: 10px;
  }

  & a {
    color: #6c757d;
    font-size: 14px;
  }
`;

export const ModalBackDrop = styled.div`
  backdrop-filter: blur(1.5px);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden !important;
  z-index: 10;
  cursor: pointer;
`;

export const ModalContainer = styled.div`
  background: none;
  width: ${(props) => props.width};
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  color: #414a4c;
  overflow: hidden !important;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardContainer = styled.div`
  background-color: #ffffff;
  padding: ${(props) => props.p};
  margin: 20px;
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

  & p {
    font-size: 14px;
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin: 0 20px;
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
  margin: 0 20px;

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

export const ModalMessageBody = styled.div`
  background-color: ${(props) => props.bg};
  width: 300px;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  & svg {
    color: #ffffff;
    font-size: 38px;
    margin-right: 10px;
  }

  & h3 {
    color: #ffffff;
    font-weight: normal;
  }
`;

export const NavSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    color: #b8b7bd;
  }
`

export const NotificationIcon = styled.div`
display: flex;
align-items: center;
justify-content: center;
  & svg {
      font-size: 22px;
      margin-right: 5px;
      /* color: #b8b7bd; */
  }
`
