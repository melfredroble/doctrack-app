import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { BackgroundImg } from "../LandingPage/styles";
import {
  MainContainer,
  Card,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  MessageText,
  Table,
  BackButton
} from "./styles";
import { FaSearch, FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "../../api/axios";
import ViewDocument from "../Documents/ViewDocument";
import { useContext } from "react";
import MainContext from "../../context/MainContext";
import Transactions from "../../components/Transactions";

const Inquiry = () => {
  const [trackingId, setTrackingId] = useState("");
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState();
  const [showDoc, setShowDoc] = useState(true);
  const { setDocId } = useContext(MainContext);
  // const [data, setData] = useState([]);

  // useEffect(()=>{
  //   axios.get(`/documents/view/${docId}`)
  //   .then((response)=>{
  //       setData(response.data[0])
  //   })
  //   .catch((error)=> console.log(error))
  //   },[docId])

  const trackDocument = () => {
    axios
      .post("/documents/trackDoc", { trackingId })
      .then((response) => {
        if (response.data.length !== 0) {
          setDocument(response.data);
          setMessage("");
        } else {
          setMessage("No document record found.");
          setDocument("");
        }
      })
      .catch((error) => console.log(error));
  };

  const formatDate = (dateTime) =>{
    const myDate = new Date(dateTime);
    const date = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    
    // Check whether AM or PM
    let newformat = hours >= 12 ? 'PM' : 'AM'; 
    
    // Find current hour in AM-PM Format
    hours = hours % 12; 
    
    // To display "0" as "12"
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const time = hours + ":" + minutes + " " + newformat;

    const createdAt = date + " " + time;

    return createdAt;
  }

  return (
    <>
      <BackgroundImg></BackgroundImg>
      <MainContainer>
        {showDoc === true ? (
          <>
            <Card w="500px" p="50px">
              <CardHeader>
                <BackButton>
                  <Link to="/login">
                    <FaArrowAltCircleLeft/>
                  </Link>
                </BackButton>
                <div>
                  <h1>EVSU-OC DOCTRACK</h1>
                  <p>Please provide a valid document tracking ID below.</p>
                </div>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <input
                    type="text"
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Document tracking ID"
                  />
                  <button onClick={trackDocument}>
                    <FaSearch />
                  </button>
                </FormGroup>
              </CardBody>
            </Card>
            {message && (
              <MessageText>
                <p>{message}</p>
              </MessageText>
            )}
            {document &&
              document.map(
                (
                  {
                    id,
                    datetime_created,
                    originating_office,
                    doctype,
                    owner,
                    status,
                    tracking_id,
                  },
                  key
                ) => {

                  return (
                    <Card key={key} w="100%" p="5px" mt="30px">
                      <Table>
                        <tbody>
                          <tr>
                            <th>Tracking ID</th>
                            <th>Document type</th>
                            <th>Originating office</th>
                            <th>Owner</th>
                            <th>Created at</th>
                            <th>Status</th>
                          </tr>
                          <tr>
                            <td>{tracking_id}</td>
                            <td>{doctype}</td>
                            <td>{originating_office}</td>
                            <td>{owner}</td>
                            <td>{formatDate(datetime_created)}</td>
                            <td style={{ color: "red" }}>{status}</td>
                            {/* <td>
                              <button onClick={() => {
                                setShowDoc(false);
                                setDocId(id);
                              }}>View</button>
                            </td> */}
                          </tr>
                        </tbody>
                      </Table>
                      <button
                        onClick={() => {
                          setDocId(id)
                          setShowDoc(false)
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          cursor: "pointer",
                          color: "blue",
                          padding: "5px",
                          fontSize: "14px",
                          marginTop: "10px",
                        }}
                      >
                        See transaction history
                      </button>
                    </Card>
                  );
                }
              )}
          </>
        ) : (
          <Transactions />
        )}
      </MainContainer>
    </>
  );
};

export default Inquiry;
