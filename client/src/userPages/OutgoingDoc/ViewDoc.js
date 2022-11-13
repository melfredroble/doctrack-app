import React, { useContext, useEffect, useState } from "react";
import {Container,
    HeaderContainer,
    HeaderText,
    BoxContainer,
    Table,
    Tbody,
    ViewDocumentContainer,
    Button, 
    ModalBackdrop} from "../../userPages/Documents/styles";
import {   
    ModalContainer,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter, } from "../../userPages/AddDocument/styles";
import { FaArrowUp } from "react-icons/fa";
import MainContext from "../../context/MainContext";
import axios from "../../api/axios";

export const ViewDoc = () => {
    const { docId } = useContext(MainContext);
    const [data, setdata] = useState({});
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        axios.get(`/documents/view/${docId}`)
        .then((response)=>{
            setdata(response.data[0])
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
        },[docId])
        
    
        return (
        <ViewDocumentContainer display="center" j="center" align="center">
            {/* {showModal ? */}
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
                        <th>Created at:</th>
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
                    {/* <tr>
                        <th></th>
                        <td><ViewButton>View transaction history</ViewButton></td>
                    </tr> */}
                    </Tbody>
                </Table>
                <div style={{paddingTop: "30px", textAlign: "end"}}>
                    <Button padding="10px" br="5px" mr="10px" border="1px solid #cecece" color="#000000" onClick={()=>setShowModal(true)}>Release document</Button>
                    <Button padding="10px" br="5px" color="#000000" border="1px solid #cecece">View transactions</Button>
                </div>
                {showModal && <ReleaseModal showModal={setShowModal}/>}
            </BoxContainer>
            </Container>
            {/* // : <ReleaseModal/>} */}
        </ViewDocumentContainer>
        );
    };

    const ReleaseModal = ({showModal}) => {
        return (
            <>
                <ModalBackdrop onClick={()=>showModal(false)}/>
                <ModalContainer>
                    <ModalHeader>
                        <ModalTitle>
                            <FaArrowUp/>
                            <h1>Release Document</h1>
                        </ModalTitle>
                        <Button onClick={() => showModal(false)} border="none"  padding="8px" fs="22px" mr="5px">X</Button>
                    </ModalHeader>
                    <ModalBody>
                    <h5>Are you sure you want to released this document from your office?</h5>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={() => showModal(false)} color="#000000" padding="8px" br="5px" border="1px solid #cecece" mr="5px">Cancel</Button>
                    <Button bg="#50A8EA" color="#ffffff" border="none" padding="8px" br="5px" mr="20px">Release</Button>
                    </ModalFooter>
                </ModalContainer>
            </>
        )
    }