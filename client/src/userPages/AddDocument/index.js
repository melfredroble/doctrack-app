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
} from "./styles";
import Select from "react-select";
import Footer from "../../components/Footer";
import MainContext from "../../context/MainContext";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddDocument = () => {
  const [offices, setOffices] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState([]);
  const [doctypes, setDoctypes] = useState([]);
  const [doctype, setDoctype] = useState([]);
  const [trackingId, setTrackingId] = useState("");
  const [owner, setOwner] = useState("");
  const [desc, setDesc] = useState("");
  const [message, setMessage] = useState("");

  const { usersName, currOffice, usersId } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/offices").then((response) => {
      setOffices(response.data);
    });
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

  const officeList = offices.map(({ office_name }) => {
    const officeName = { value: office_name, label: office_name };
    return officeName;
  });

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

    const destOffice = selectedOffice.value;

    axios
      .post("/documents/addDoc", {
        trackingId,
        sender: usersId,
        owner,
        doctype: selectedDoctype,
        current_office: currOffice,
        destination_office: destOffice,
        description: desc,
      })
      .then((response) => {
        if (response.status == 200) {
          navigate("/my-documents");
        } else {
          setMessage("Tracking ID already exist");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDoctype = (doctypeList) => {
    setDoctype(doctypeList);
  };

  const handleOffice = (officeList) => {
    setSelectedOffice(officeList);
  };

  //   const date = new Date().toLocaleString();

  return (
    <>
      <MainContainer>
        <InnerContainer>
          <CardContainer>
            <form onSubmit={addDocument}>
              <CardHeader>
                <h1>Add document</h1>
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
                  <label style={{ marginTop: "20px" }}>
                    Destination office:
                  </label>
                  <Select options={officeList} onChange={handleOffice} />
                  <label style={{ marginTop: "20px" }}>From:</label>
                  <Input
                    type="text"
                    onChange={(e) => setOwner(e.target.value)}
                  />
                  <label style={{ marginTop: "10px" }}>Description: <span style={{color: "gray"}}>(optional)</span></label>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    maxLength="500"
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <p>Max Length: 500 characters</p>
                </FormGroup>
              </CardBody>
              <CardFooter>
                <button type="submit">Add document</button>
              </CardFooter>
            </form>
          </CardContainer>
        </InnerContainer>
        <Footer />
      </MainContainer>
    </>
  );
};

export default AddDocument;
