import styled from "styled-components";

export const Container = styled.div`
    display: flex;
`

export const Card = styled.div`
    
    box-shadow: 0px 5px 10px 3px rgba(0,0,0,0.2);
    height: 150px;
    width: 300px;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    margin-right: 50px;

`
export const CardLeft = styled.div`
    /* background-color: aliceblue; */
    padding-top: 30px;
    display: flex;
    justify-content: center;

    & h5 {
        font-size: 45px;
    }
`

export const CardRight = styled.div`
    /* background-color: antiquewhite; */
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;

    & svg {
        font-size: 55px;
        color: #cecece;
    }
`

export const CardBottom = styled.div`
    /* background-color: aquamarine; */
    display: flex;
    align-items: center;
    justify-content: center;
`