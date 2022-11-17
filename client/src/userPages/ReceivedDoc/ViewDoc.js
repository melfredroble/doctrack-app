import React, { useContext, useEffect, useState } from "react";
import {Container,
    HeaderContainer,
    HeaderText,
    BoxContainer,
    Table,
    Tbody,
    ViewDocumentContainer,
    Button, 
    ModalBackdrop,
    OfficeContainer
} from "../../userPages/Documents/styles";
import {   
    ModalContainer,
    ModalHeader,
    ModalTitle,
    ModalBody,
    ModalFooter, } from "../../userPages/AddDocument/styles";
import { FaArrowUp, FaStop } from "react-icons/fa";
import MainContext from "../../context/MainContext";
import axios from "../../api/axios";
import Select from "react-select";
import {FormContainer} from "./styles"

export const ViewDoc = ({showHome, showDoc}) => {
    const { docId, setAlertMessage } = useContext(MainContext);
    const [data, setdata] = useState({});
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [showModal, setShowModal] = useState(false);
    const [terminate, setTerminate] = useState(false);
    const [offices, setOffices] = useState([]);
    const [selectedOffice, setSelectedOffice] = useState([]);
    const [action, setAction] = useState([]);
    const [remarks, setRemarks] = useState([]);
    const user = JSON.parse(localStorage.getItem("userData"));

    useEffect(() => {
        axios.get("/offices").then((response) => {
            setOffices(response.data);
        });
    }, []);

    const officeList = offices.map(({ office_name, id }) => {
        const officeName = { value: office_name, label: office_name, id: id };
        return officeName;
    });

    const actions = [
        {value: "approved", label: "approved"},
        {value: "signed", label: "signed"},
        {value: "rejected", label: "rejected"},
    ];

    // const actionList = actions.map(({ office_name, id }) => {
    //     const officeName = { value: office_name, label: office_name, id: id };
    //     return officeName;
    // });
    
    const destOffice = selectedOffice.id;

    const handleOffice = (officeList) => {
        setSelectedOffice(officeList);
    };

    const handleAction = (actions)=>{
        setAction(actions.value);
    }

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


        const releaseDoc = () =>{
            const releasedFrom = user.office_id;
            axios.post('/documents/releaseDoc', {docId, destOffice, action, releasedFrom, remarks})
            .then((response)=> {
                if(response.status === 200){
                    setShowModal(false);
                    showHome(true);
                    showDoc(false);
                    setAlertMessage("released");
                }
            })
            .catch((error)=>console.log(error));
        }
    
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
                <FormContainer>
                    <label>
                        Actions:
                    </label>
                    <Select options={actions} onChange={handleAction} required /> 
                    <label>
                        Destination office:
                    </label>
                    <Select options={officeList} onChange={handleOffice} required /> 
                    <label>
                        Remarks:
                    </label>
                    <textarea name="" id="" cols="30" rows="3" onChange={(e)=>setRemarks(e.target.value)}></textarea>
                </FormContainer>
                <div style={{paddingTop: "30px", textAlign: "end"}}>
                    <Button padding="10px" br="5px" mr="10px" border="1px solid #cecece" color="#000000" onClick={()=>setTerminate(true)}>Tag as terminal</Button>
                    <Button padding="10px" br="5px" color="#000000" border="1px solid #cecece" onClick={()=>setShowModal(true)}>Release document</Button>
                </div>
                {showModal && <ReleaseModal showModal={setShowModal} releaseDoc={releaseDoc}/>}
                {terminate && <TerminateDoc showModal={setTerminate}/>}
            </BoxContainer>
            </Container>
            {/* // : <ReleaseModal/>} */}
        </ViewDocumentContainer>
        );
    };

    const ReleaseModal = ({showModal, releaseDoc}) => {
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
                    <Button onClick={releaseDoc} bg="#50A8EA" color="#ffffff" border="none" padding="8px" br="5px" mr="20px">Release</Button>
                    </ModalFooter>
                </ModalContainer>
            </>
        )
    }

    const TerminateDoc = ({showModal}) => {
        return (
            <>
                <ModalBackdrop onClick={()=>showModal(false)}/>
                <ModalContainer>
                    <ModalHeader>
                        <ModalTitle>
                            <FaStop/>
                            <h1>Tag as terminal</h1>
                        </ModalTitle>
                        <Button onClick={() => showModal(false)} border="none"  padding="8px" fs="22px" mr="5px">X</Button>
                    </ModalHeader>
                    <ModalBody>
                    <h5>Are you sure you want to tag this document as terminal?</h5>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={() => showModal(false)} color="#000000" padding="8px" br="5px" border="1px solid #cecece" mr="5px">Cancel</Button>
                    <Button bg="#50A8EA" color="#ffffff" border="none" padding="8px" br="5px" mr="20px">Proceed</Button>
                    </ModalFooter>
                </ModalContainer>
            </>
        )
    }