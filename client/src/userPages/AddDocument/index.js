import React, { useContext, useEffect, useState } from "react";
import {
  MainContainer,
  InnerContainer,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  CardFooter,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalTitle
} from "./styles";
import Select from "react-select";
import Footer from "../../components/Footer";
import MainContext from "../../context/MainContext";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { ModalBackDrop } from "../../components/Navbar/styles";
import { FaPlus } from "react-icons/fa";


const AddDocument = () => {
  // const [offices, setOffices] = useState([]);
  // const [selectedOffice, setSelectedOffice] = useState([]);
  const [doctypes, setDoctypes] = useState([]);
  const [doctype, setDoctype] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [owner, setOwner] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);


  const { currOffice, usersId, setAlertMessage, getCurrOffice } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrOffice();
  }, []);

  useEffect(() => {
    axios.get("/documents/types").then((response) => {
      setDoctypes(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("/documents/trackingId")
      .then((response) => setTrackingId(response.data.trackingId));
  }, []);

  // const officeList = offices.map(({ office_name, id }) => {
  //   const officeName = { value: office_name, label: office_name, id: id };
  //   return officeName;
  // });

  const doctypeList = doctypes.map(({ name }) => {
    const docName = { value: name, label: name };
    return docName;
  });

  // Adding Document
  const addDocument = (e) => {
    e.preventDefault();
    const mapDoctype = doctype.map((value) => {
      return value.value;
    });
    const selectedDoctype = mapDoctype.join(", ");

    // const destOffice = selectedOffice.id;

    axios
      .post("/documents/addDoc", {
        trackingId,
        sender: usersId,
        owner,
        doctype: selectedDoctype,
        origOffice: currOffice,
        remarks: remarks,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/my-documents");
          setAlertMessage("added");
        } else {
          setMessage("Tracking ID already exist");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDoctype = (doctypeList) => {
    setDoctype(doctypeList);
  };

  // const handleOffice = (officeList) => {
  //   setSelectedOffice(officeList);
  // };

  //   const date = new Date().toLocaleString();

  return (
    <>
      <MainContainer>
        <InnerContainer>
          <CardContainer>
              <CardHeader>
                <h1>Add Document</h1>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <label>Tracking ID</label>
                  <Input type="text" bg="#eeeeee" readOnly value={trackingId} />
                  <label style={{ marginTop: "10px" }}>Document type:</label>
                  <Select
                    isMulti
                    name="colors"
                    options={doctypeList}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={handleDoctype}
                  />
                  {/* <label style={{ marginTop: "20px" }}>
                    Destination office:
                  </label>
                  <Select options={officeList} onChange={handleOffice} required /> */}
                  <label style={{ marginTop: "20px" }}>From:</label>
                  <Input
                  required
                    type="text"
                    onChange={(e) => setOwner(e.target.value)}
                  />
                  <label style={{ marginTop: "10px" }}>Remarks: </label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    maxLength="500"
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                  <p>Max Length: 500 characters</p>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <button onClick={()=>setShowModal(true)}>Add document</button>
              </CardFooter>
            {showModal && <WarningModal showModal={setShowModal} addDocument={addDocument}/>}
          </CardContainer>
        </InnerContainer>
        <Footer />
      </MainContainer>
    </>
  );
};

const WarningModal = ({showModal, addDocument})=> {
  return (
    <>
      <ModalBackDrop
        onClick={() => {
          showModal(false);
        }}
      />
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>
            <FaPlus/>
            <h1>Add Document</h1>
          </ModalTitle>
          <Button onClick={() => showModal(false)} b="none" border="none" fs="18px" mr="5px">X</Button>
        </ModalHeader>
        <ModalBody>
          <h5>You cannot make any changes to this document once it has been submitted. Are you sure you want to proceed?</h5>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => showModal(false)} border="1px solid #cecece"  color="#000000" mr="5px">Cancel</Button>
          <Button onClick={addDocument} bg="#50A8EA" border="none" color="#ffffff" mr="20px">Proceed</Button>
        </ModalFooter>
      </ModalContainer>
    </>
  )
}

export default AddDocument;
