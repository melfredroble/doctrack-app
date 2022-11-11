import React, { useState } from "react";
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
} from "./styles";
import { FaSearch } from "react-icons/fa";
import axios from "../../api/axios";

const Inquiry = () => {
  const [trackingId, setTrackingId] = useState("");
  const [message, setMessage] = useState("");
  const [document, setDocument] = useState();
  const [showDoc, setShowDoc] = useState(true);

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

  return (
    <>
      <BackgroundImg></BackgroundImg>
      <MainContainer>
        {showDoc === true ? (
          <>
            <Card w="500px" p="50px">
              <CardHeader>
                <h1>EVSU-OC DOCTRACK</h1>
                <p>Please provide a valid document tracking ID below.</p>
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
                    action,
                    current_office,
                    datetime_created,
                    description,
                    destination_office,
                    doctype,
                    owner,
                    remarks,
                    sender,
                    status,
                    tracking_id,
                  },
                  key
                ) => {
                  // let datetime = new Date(datetime_created);
                  const datetime = datetime_created
                    .replace("T", " ")
                    .replace("Z", "");
                  return (
                    <CardContainer key={key} w="100%" p="5px">
                      <Table>
                        <tbody>
                          <tr>
                            <th>Tracking ID</th>
                            <th>Document type</th>
                            {/* <th>From</th>
                            <th>Sender</th> */}
                            {/* <th>Destination office</th> */}
                            <th>Current office</th>
                            {/* <th>Description</th> */}
                            <th>Latest remarks</th>
                            <th>Latest action</th>
                            <th>Status</th>
                            <th></th>
                          </tr>
                          <tr>
                            <td>{tracking_id}</td>
                            <td>{doctype}</td>
                            {/* <td>{owner}</td>
                            <td>{sender}</td> */}
                            {/* <td>{destination_office}</td> */}
                            <td>{current_office}</td>
                            {/* <td>{description}</td> */}
                            <td>{remarks}</td>
                            <td>{action}</td>
                            <td style={{ color: "red" }}>{status}</td>
                            <td>
                              <button>View</button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <button
                        onClick={() => setShowDoc(false)}
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
                    </CardContainer>
                  );
                }
              )}
          </>
        ) : (
          <CardContainer w="500px" margin="auto">
            <h1>Hello</h1>
          </CardContainer>
        )}
      </MainContainer>
    </>
  );
};

export default Inquiry;
