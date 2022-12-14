import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import MainContext from "../../context/MainContext";
import {
  Container,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  CardFooter,
  ErrorText,
} from "./styles";
import ClipLoader from "react-spinners/ClipLoader";
import { BackgroundImg } from "../../userPages/LandingPage/styles";
const SecurityQuestions = () => {
  const [ansOne, setAnsOne] = useState("");
  const [ansTwo, setAnsTwo] = useState("");
  const [ansThree, setAnsThree] = useState("");
  const [ansFour, setAnsFour] = useState("");
  const [ansFive, setAnsFive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setIsValidated } = useContext(MainContext);

  const navigate = useNavigate();

  const handleAnswers = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("/security/answer", { ansOne, ansTwo, ansThree, ansFour, ansFive })
      .then((response) => {
        if (response.status === 200) {
          setIsValidated(true);
          navigate("/reset-password");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Invalid answer/s");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <BackgroundImg></BackgroundImg>
      <Container>
        <CardContainer>
          {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
          <form onSubmit={handleAnswers}>      
          <CardHeader>
            <h5>Security questions</h5>
            {message && <ErrorText>{message}</ErrorText>}
          </CardHeader>
          <CardBody>
            <FormGroup>
              <label htmlFor="qtnOne">
                What is the name of your favorite pet?
              </label>
              <input
                type="text"
                value={ansOne}
                onChange={(e) => setAnsOne(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="qtnOne">What is your mother's maiden name?</label>
              <input
                type="text"
                value={ansTwo}
                onChange={(e) => setAnsTwo(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="qtnOne">
                What was your favorite subject in high school?
              </label>
              <input
                type="text"
                value={ansThree}
                onChange={(e) => setAnsThree(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="qtnOne">
                What was your dream job as a child?
              </label>
              <input
                type="text"
                value={ansFour}
                onChange={(e) => setAnsFour(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="qtnOne">What is your favorite movie?</label>
              <input
                type="text"
                value={ansFive}
                onChange={(e) => setAnsFive(e.target.value)}
                required
              />
            </FormGroup>
          </CardBody>
          <CardFooter>
            <button type="submit">
              {!isLoading ? (
                "Validate"
              ) : (
                <ClipLoader size={16} color="#ffffff" />
              )}
            </button>
          </CardFooter>
          </form>
        </CardContainer>
      </Container>
    </>
  );
};

export default SecurityQuestions;
