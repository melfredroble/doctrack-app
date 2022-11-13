import React, {useState } from "react";
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
import MyDocumentsTable from "../MyDocumentsTable";
import { useNavigate } from "react-router-dom";
import ViewDocument  from "../../components/ViewDocument";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import MainContext from "../../context/MainContext";
import { useEffect } from "react";

const MyDocuments = () => {
  const navigate = useNavigate();
  const [isHome, setIsHome] = useState(true)
  const [showDocument, setShowDocument] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);

  const {showToast, setShowToast} = useContext(MainContext);

  useEffect(()=> {
    if(showToast) { 
      toast.success('Document Added Successfully!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      setTimeout(()=> setShowToast(false),[3000]);
    }
  },[showToast, setShowToast]);


  return (
    <MainContainer>
      <InnerContainer>
        {showToast && <ToastContainer />}
        <HeaderContainer mt="15px">
          <FaRegFolderOpen /> <HeaderText> My Documents</HeaderText>
        </HeaderContainer>
        <Breadcrumb>
          <Unordered>
            <Item color={isHome ? "#0275d8" : "#a59b9b"} cursor="pointer">
              <button onClick={()=>{
                setIsHome(true) 
                setShowDocument(false)
                }}>My documents</button>
              <span>/</span>
            </Item>
            <Item color={showDocument ? "#0275d8" : "#a59b9b"} cursor={!isHome ? "pointer" : undefined}>
              <button onClick={()=> {!isHome && 
                setShowDocument(true);
                setShowTransaction(false);
                }}>Document overview</button>
              <span>/</span>
            </Item >
            <Item color={showTransaction ? "#0275d8" : "#a59b9b"}>
              <button onClick={()=> !isHome && setShowTransaction(!showTransaction)}>Transactions</button>
            </Item>
          </Unordered>
        </Breadcrumb>
        {showDocument ? (
          <ViewDocument showHome={setIsHome} showDoc={setShowDocument}/>
        ) : (
          <>
            <Container mt="30px">
              <HeaderContainer mb="15px" justifyContent="space-between">
                <HeaderText>Records</HeaderText>
                <Button
                  display="flex"
                  border="none"
                  color="#ffffff"
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
              <MyDocumentsTable showDoc={setShowDocument} showHome={setIsHome}/>
            </Container>
          </>
        )}
      </InnerContainer>
      <Footer />
    </MainContainer>
  );
};


export default MyDocuments;
