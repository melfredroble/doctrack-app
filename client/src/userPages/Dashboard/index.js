import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import {
  FaArrowRight,
  FaFolder,
  FaArrowLeft,
  FaArrowDown,
} from "react-icons/fa";
import Axios from "axios";
import axios from "../../api/axios";
import {
  MainContainer,
  InnerContainer,
  DashboardText,
  Container,
  Card,
  CardContainer,
  CardBottom,
  CardLeft,
  CardRight,
  CardHeader,
  CardBody,
  FormGroup,
} from "./styles";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

  const [outgoing, setOutgoing] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [receivedDoc, setReceivedDoc] = useState(0);
  const [trackingId, setTrackingId] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));
  const  userId = user.id;
  // useEffect(()=> {
  //     user.role === "admin" && navigate('/admin-dashboard');
  // },[])
  let outgoingNum = `/documents/outgoingCount/${userId}`;
  let incomingNum = `/documents/incomingDoc/${user.office_id}`;
  let receivedNum = `/documents/receivedDoc/${user.office_id}`;

  const requestOne = axios.get(outgoingNum);
  const requestTwo = axios.get(incomingNum);
  const requestThree = axios.get(receivedNum);

  useEffect(() => {
    Axios.all([requestOne, requestTwo, requestThree]).then(
      Axios.spread((...responses) => {
        setOutgoing(responses[0].data.length);
        setIncoming(responses[1].data.length);
        setReceivedDoc(responses[2].data.length);
      })
    );
  }, []);

  useEffect(() => {
    axios
      .get("/documents/trackingId")
      .then((response) => setTrackingId(response.data.trackingId));
  }, []);

  return (
    <MainContainer>
      <InnerContainer>
        <DashboardText>Dashboard</DashboardText>
        <Container>
          <Card w="260px" h="120px">
            <CardLeft>
              <h5>Received documents</h5>
            </CardLeft>
            <CardRight>
              <h5>{receivedDoc}</h5>
            </CardRight>
            <CardBottom>
              <span>
                <FaFolder />
              </span>
            </CardBottom>
          </Card>
          <Card w="260px" h="120px">
            <CardLeft>
              <h5>Incoming documents</h5>
            </CardLeft>
            <CardRight>
              <h5>{incoming}</h5>
            </CardRight>
            <CardBottom>
              <span>
                {/* <FaArrowRight /> */}
                <FaFolder />
              </span>
            </CardBottom>
          </Card>
          <Card w="260px" h="120px">
            <CardLeft>
              <h5>Outgoing documents</h5>
            </CardLeft>
            <CardRight>
              <h5>{outgoing}</h5>
            </CardRight>
            <CardBottom>
              <span>
                {/* <FaArrowLeft /> */}
                <FaFolder />
              </span>
            </CardBottom>
          </Card>
        </Container>
        <Container>
          <CardContainer mt="50px" w="400px" h="160px">
            <CardHeader>
              <h5>Add Document</h5>
            </CardHeader>
            <CardBody>
              <FormGroup bg="#eeeeee">
                <input
                  type="text"
                  bg="#eeeeee"
                  readOnly
                  value={trackingId}
                />
                <button onClick={() => navigate("/add-document")}>Add</button>
              </FormGroup>
            </CardBody>
          </CardContainer>
          <CardContainer mt="50px" w="400px" h="160px">
            <CardHeader>
              <h5>Track Document</h5>
            </CardHeader>
            <CardBody>
              <FormGroup>
                <input type="text" />
                <button>Track</button>
              </FormGroup>
            </CardBody>
          </CardContainer>
        </Container>
      </InnerContainer>
      <Footer />
    </MainContainer>
  );
};

export default Dashboard;
