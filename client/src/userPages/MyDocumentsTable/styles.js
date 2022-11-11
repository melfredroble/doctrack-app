import styled from "styled-components";

export const Button = styled.button`
  padding: ${(props) => props.padding};
  background-color: ${(props) => props.bg};
  border: none;
  outline: none;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.borderRadius};
  display: flex;
  justify-content: center;

  & svg {
    font-size: 16px;
    margin:  0 5px;
  }
`;

export const SearchContainer = styled.div`
  width: 100%;
  display: flex;
`;

export const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 32px;
  width: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
`;

export const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 10px;
  outline: none;
`;
