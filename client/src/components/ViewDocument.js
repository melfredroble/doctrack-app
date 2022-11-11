import React, { useContext, useEffect, useState } from "react";
import {Container,
    HeaderContainer,
    HeaderText,
    BoxContainer,
    Table,
    Tbody,
    ViewDocumentContainer,
    ViewButton } from "../userPages/Documents/styles";
import MainContext from "../context/MainContext";
import axios from "../api/axios";

export const ViewDocument = () => {
    const { docId } = useContext(MainContext);
    const [data, setdata] = useState({});
    useEffect(()=>{
        axios.get(`/documents/view/${docId}`)
        .then((response)=>{
            setdata(response.data[0])
        })
        .catch((error)=> console.log(error))
        },[docId])
        
    
        return (
        <ViewDocumentContainer display="center" j="center" align="center">
            <Container w="500px"  mt="30px">
            <HeaderContainer justifyContent="center">
                <HeaderText>Document Overview</HeaderText>
            </HeaderContainer>
            <BoxContainer>
                <Table>
                    <Tbody>
                    <tr>
                        <th>Tracking ID:</th>
                        <td>{data.tracking_id}</td>
                    </tr>
                    <tr>
                        <th>Document type:</th>
                        <td>{data.doctype}</td>
                    </tr>
                    <tr>
                        <th>From:</th>
                        <td>{data.owner}</td>
                    </tr>
                    <tr>
                        <th>Description:</th>
                        <td>{data.description}</td>
                    </tr>
                    <tr>
                        <th>Date created:</th>
                        <td>{data.datetime_created}</td>
                    </tr>
                    <tr>
                        <th>Current office:</th>
                        <td>{data.current_office}</td>
                    </tr>
                    <tr>
                        <th>Destination office:</th>
                        <td>{data.destination_office}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td style={{color: "red"}}>{data.status}</td>
                    </tr>
                    <tr>
                        <th></th>
                        <td><ViewButton>View transaction history</ViewButton></td>
                    </tr>
                    </Tbody>
                </Table>
            </BoxContainer>
            </Container>
        </ViewDocumentContainer>
        );
    };