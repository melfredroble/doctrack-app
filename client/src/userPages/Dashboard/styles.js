import styled from "styled-components";

export const MainContainer = styled.div`
  margin-left: 250px;
  padding-top: 30px;
  height: 100%;
`;

export const InnerContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 74vh;
`;
export const DashboardText = styled.h1`
  color: #414a4c;
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 20px;
  text-transform: uppercase;
`;

export const Container = styled.div`
  display: flex;
  padding: 0 10px;
`;

export const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: ${(props) => props.mt};

  & > * {
    flex: 1 1 50px;
  }
`;
export const CardRight = styled.div`
  /* background-color: aliceblue; */
  display: flex;
  justify-content: center;

  & h5 {
    font-size: 22px;
  }
`;

export const CardBottom = styled.div`
  /* background-color: antiquewhite; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #cecece;
    border-radius: 100%;
    height: 70px;
    width: 75px;
  }

  & svg {
    font-size: 40px;
    color: #ffffff;
  }
`;

export const CardLeft = styled.div`
  /* background-color: aquamarine; */
  display: flex;
  align-items: center;
  justify-content: center;

  & h5 {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
`;

export const CardHeader = styled.div`
  padding: 15px;
  background-color: #f5f5f5;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;

  & h5 {
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
  align-items: center;
  border: 1px solid #cecece;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #ffffff;
  width: 100%;

  & button {
    color: #000000;
    padding: 10px;
    background-color: #eeeeee;
    border: none;
    border-left: 1px solid #cecece;
    outline: none;
    font-weight: bold;
    cursor: pointer;
  }

  & input {
    border: none;
    padding: 10px;
    outline: none;
    width: 100%;
    background-color: ${(props) => props.bg};
  }
`;

export const CardContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  height: ${(props) => props.h};
  width: ${(props) => props.w};
  margin-right: 50px;
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.mt};
`;
