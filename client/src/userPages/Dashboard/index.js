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
  let fetchUsers = "/users";
  let fetchOffices = "/offices";

  const [users, setUsers] = useState(null);
  const [offices, setOffices] = useState(null);
  const [trackingId, setTrackingId] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(()=> {
      user.role === "admin" && navigate('/admin-dashboard');
  },[])

  const requestOne = axios.get(fetchUsers);
  const requestTwo = axios.get(fetchOffices);

  useEffect(() => {
    Axios.all([requestOne, requestTwo]).then(
      Axios.spread((...responses) => {
        setUsers(responses[0].data.length);
        setOffices(responses[1].data.length);
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
              <h5>{offices}</h5>
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
              <h5>{users}</h5>
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
              <h5>1</h5>
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
