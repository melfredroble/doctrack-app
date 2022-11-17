import React, {useState, useEffect, useContext} from "react";
import {
    MainContainer,
    Container,
    InnerContainer,
    HeaderContainer,
    HeaderText,
    Button,
    Breadcrumb,
    Unordered,
    Item
} from "./styles";
import { FaRegFolderOpen, FaPlus } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { ViewDocument } from "./ViewDocument";
import IncomingDocTable from "../IncomingDocTable";
import MainContext from "../../context/MainContext";
import { AlertMessage } from "../Documents/styles";
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IncomingDoc = () => {
    const navigate = useNavigate();
    const [isHome, setIsHome] = useState(true)
    const [showDocument, setShowDocument] = useState(false);

    const {alertMessage, setAlertMessage} = useContext(MainContext);

    return (
        <MainContainer>
            <InnerContainer>
            {alertMessage === "received" && <AlertMessage>
            <h5>The document has been {alertMessage} succesfully.</h5>
            <button onClick={()=>setAlertMessage("")}>X</button>
            </AlertMessage>}
            <HeaderContainer mt="15px">
                <FaRegFolderOpen /> <HeaderText> Incoming Documents</HeaderText>
            </HeaderContainer>
            <Breadcrumb>
                <Unordered>
                <Item color={isHome ? "#0275d8" : "#a59b9b"} cursor="pointer">
                    <button onClick={()=>{
                    setIsHome(true) 
                    setShowDocument(false)
                    }}>Incoming documents</button>
                    <span>/</span>
                </Item>
                <Item color={showDocument ? "#0275d8" : "#a59b9b"} cursor={!isHome ? "pointer" : undefined}>
                    <button onClick={()=> {!isHome && 
                    setShowDocument(true);
                    }}>Document overview</button>
                </Item >
                </Unordered>
            </Breadcrumb>
            {showDocument ? (
                <ViewDocument setHome={setIsHome} showDoc={setShowDocument}/>
            ) : (
                <>
                <Container mt="30px">
                    <HeaderContainer mb="15px" justifyContent="space-between">
                    <HeaderText>Records</HeaderText>
                    <Button
                        display="flex"
                        content="end"
                        align="center"
                        bg="#50A8EA"
                        br="100%"
                        padding="8px 10px"
                        onClick={() => navigate("/add-document")}
                    >
                        <FaPlus />
                    </Button>
                    </HeaderContainer>
                    <IncomingDocTable showDoc={setShowDocument} showHome={setIsHome}/>
                </Container>
                </>
            )}
            </InnerContainer>
            <Footer />
        </MainContainer>
    );
}

export default IncomingDoc