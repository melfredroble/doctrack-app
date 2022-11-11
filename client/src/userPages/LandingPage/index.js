import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import {
  MainContainer,
  LogoImg,
  Card,
  CardHeader,
  CardBody,
  Footer,
  BackgroundImg,
} from "./styles";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <BackgroundImg></BackgroundImg>
      <MainContainer>
        <LogoImg>
          <img src={logo} alt="logo" />
        </LogoImg>
        <Card>
          <CardHeader>
            <h1>EVSU-OC DOCTRACK</h1>
            <p>The document monitoring system of EVSU-OC.</p>
          </CardHeader>
          <CardBody>
            <button onClick={() => navigate("/login")}>
              Login using evsu email
            </button>
            <p>
              You need to have a registered account to access the system. For
              account request or inquiries, contact us via email at
              admin@evsu.edu.ph
            </p>
          </CardBody>
        </Card>
        <Footer>
          <p>EVSU-OC Doctrack. All Rights Reserved 2022.</p>
        </Footer>
      </MainContainer>
    </>
  );
};

export default LandingPage;
