import React, { useContext, useState } from "react";
import {
  Container,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  CardFooter,
  ModalBackDrop,
  ModalContainer,
  InnerContainer,
} from "./styles";
import axios from "../../api/axios";
import MainContext from "../../context/MainContext";
import { FaRegCheckCircle } from "react-icons/fa";
import Login from "../../components/Login";
import ClipLoader from "react-spinners/ClipLoader";
import { BackgroundImg } from "../../userPages/LandingPage/styles";

const ResetPassword = () => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isValidated } = useContext(MainContext);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setMessage("Password doesn't match");
      setIsLoading(false);
    } else {
      axios
        .put("/security/reset", { password })
        .then((response) => {
          if (response.status === 200) {
            setShowModal(true);
            console.log(response);
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return isValidated ? (
    <>
      <BackgroundImg></BackgroundImg>
      <Container>
      <form onSubmit={resetPassword}>
        <CardContainer>
          {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}

          <CardHeader>
            <h2>Reset Password</h2>
            <p style={{ marginTop: "10px", color: "red", fontWeight: "bold" }}>
              {message}
            </p>
          </CardHeader>
          <CardBody>
            <FormGroup>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormGroup>
            <FormGroup>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </FormGroup>
          </CardBody>
          <CardFooter>
            <button type="submit">
              {!isLoading ? "Reset" : <ClipLoader size={16} color="#ffffff" />}
            </button>
          </CardFooter>
        </CardContainer>
      </form>
      {showModal && <Modal showModal={setShowModal} isShowModal={showModal} />}
    </Container>
    </>
  ) : (
    <Login />
  );
};

const Modal = ({ showModal }) => {
  const { setIsValidated } = useContext(MainContext);

  setTimeout(() => {
    setIsValidated(false);
    showModal(false);
  }, 1000);

  return (
    <>
      <ModalBackDrop />
      <ModalContainer>
        <InnerContainer>
          <FaRegCheckCircle />
          <h5>Success</h5>
        </InnerContainer>
      </ModalContainer>
    </>
  );
};

export default ResetPassword;
