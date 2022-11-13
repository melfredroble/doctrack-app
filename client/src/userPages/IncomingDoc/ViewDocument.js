import React, { useContext, useEffect, useState } from "react";
import {Container,
    HeaderContainer,
    HeaderText,
    BoxContainer,
    Table,
    Tbody,
    ViewDocumentContainer 
} from "../../userPages/Documents/styles";
import {   
        ModalContainer,
        ModalHeader,
        ModalTitle,
        ModalBody,
        ModalFooter, 
} from "../../userPages/AddDocument/styles";
import { FaArrowDown } from "react-icons/fa";
import { Button, ModalBackdrop } from "./styles";
import axios from "../../api/axios";
import MainContext from "../../context/MainContext";

export const ViewDocument = () => {
    const { docId, transacId } = useContext(MainContext);
    const [data, setdata] = useState({});
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        axios.get(`/documents/view/${docId}`)
        .then((response)=>{
            setdata(response.data[0]);
            const myDate = new Date(response.data[0].datetime_created);
            setDate((myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear());
            let hours = myDate.getHours();
            let minutes = myDate.getMinutes();
            
            // Check whether AM or PM
            let newformat = hours >= 12 ? 'PM' : 'AM'; 
            
            // Find current hour in AM-PM Format
            hours = hours % 12; 
            
            // To display "0" as "12"
            hours = hours ? hours : 12; 
            minutes = minutes < 10 ? '0' + minutes : minutes;
    
            setTime(hours + ":" + minutes + " " + newformat)
        })
        .catch((error)=> console.log(error))
        },[docId]);

        const receiveDoc = ()=>{
            const user = JSON.parse(localStorage.getItem("userData"));
            const received = user.office_id;
            axios.put('/documents/receiveDoc', {received, transacId})
            .then((response)=>{
                if(response.status === 200){
                    alert("Received document")
                }
            })
            .catch((error)=>console.log(error))
        }

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
                        <th>Remarks:</th>
                        <td>{data.remarks}</td>
                    </tr>
                    <tr>
                        <th>Date created:</th>
                        <td>{date} {time}</td>
                        {/* .replace("T", " ").replace("Z", "").slice(0, -4) */}
                    </tr>
                    <tr>
                        <th>Originating office:</th>
                        <td>{data.originating_office}</td>
                    </tr>
                    <tr>
                        <th>Status:</th>
                        <td style={{color: "red"}}>{data.status}</td>
                    </tr>
                    </Tbody>
                </Table>
            </BoxContainer>
            <div style={{textAlign: "end"}}>
            <Button onClick={()=>setShowModal(true)} padding="10px" bg="#50A8EA" margin="30px 0" br="5px" w="150px">Receive Document</Button>
            </div>
            </Container>
            {showModal && <ReceiveDoc receiveDoc={receiveDoc} showModal={setShowModal}/>}
        </ViewDocumentContainer>
        );
    };

const ReceiveDoc = ({showModal, receiveDoc}) => {
    return (
        <>
            <ModalBackdrop onClick={()=>showModal(false)}/>
            <ModalContainer>
                    <ModalHeader>
                        <ModalTitle>
                            <FaArrowDown/>
                            <h1>Receive Document</h1>
                        </ModalTitle>
                        <Button onClick={() => showModal(false)} bg="none" border="none"  padding="8px" fs="22px" mr="5px">X</Button>
                    </ModalHeader>
                    <ModalBody>
                    <h5>Are you sure you want to receive this document from your office?</h5>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={() => showModal(false)} color="#000000" padding="8px" br="5px" border="1px solid #cecece" mr="5px">Cancel</Button>
                    <Button onClick={receiveDoc} bg="#50A8EA" color="#ffffff" border="none" padding="8px" br="5px" mr="20px">Release</Button>
                    </ModalFooter>
                </ModalContainer>
        </>
    )
}