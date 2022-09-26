import styled from "styled-components"

export const TableContainer = styled.table`
    // border: 1px solid #f0f0f0;
    margin-bottom: 20px !important;
    background-color: #f0f0f0;
    border-collapse: collapse;
`

export const Thead = styled.thead`
    border-bottom: 1px solid rgba(0, 0, 0, 0.15) !important;

    & tr {
        display: flex;
        justify-content: space-between;
        background-color: #f9f9f9;
    }

`

export const Tbody = styled.tbody`

    & tr {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f0f0f0 !important;
    }

    & tr:nth-child(even) {
        background-color: #fafafa;
    }

    & tr:nth-child(odd) {
        background-color: #f5f6fb;
    }

    & td {
        padding: 10px 14px;
        width: 100%;
        border-left: 1px solid #f0f0f0;
        font-size: 11px;
        overflow-x: hidden;
    }

`


export const Button = styled.button`
    padding: ${props => props.padding};
    background-color: ${props => props.bg};
    border: none;
    outline: none;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: ${props => props.borderRadius};
`

export const SearchContent = styled.div`
    width: 100%;
    border: 1px solid #f0f0f0;
    padding: 20px !important;
    margin-top: 16px;
`

export const InputGroup = styled.div`
    border: 1px solid #f0f0f0;
    width: 250px;
    height: 40px;
    display: flex;
    border-radius: 2px;



    & svg {
        color: gray;
    }

    & input {
        border: none;
        outline: none;
        padding-left: 10px;
        height: 100%;
    }
`

export const PaginationContent = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 10px;
`