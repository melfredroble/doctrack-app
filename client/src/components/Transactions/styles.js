import styled from "styled-components";

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
    margin-bottom: ${props=>props.mb};
    border: 1px solid #dcdcdc;
`

export const Header = styled.div`
    text-align: center;
    padding: 20px 0 30px 0;
    border-bottom: 1px solid #cecece;

    & h1 {
        font-size: 16px;
    }
`