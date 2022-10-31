import React, { useContext, useState } from "react";
import { FaUserShield } from "react-icons/fa";
import {
  MainContainer,
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Text,
  Button,
} from "./styles";
import Footer from "../../components/Footer";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../api/axios";
import MainContext from "../../context/MainContext";

const SecuritySetting = () => {
  const [qtnOne, setQtnOne] = useState("");
  const [qtnTwo, setQtnTwo] = useState("");
  const [qtnThree, setQtnThree] = useState("");
  const [qtnFour, setQtnFour] = useState("");
  const [qtnFive, setQtnFive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { fetchAnswers, answers } = useContext(MainContext);

  const handleSecurity = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put("/security/update", { qtnOne, qtnTwo, qtnThree, qtnFour, qtnFive })
      .then((response) => {
        if (response.status === 200) {
          setMessage(response.data.message);
          fetchAnswers();
        }
      })
      .catch((error) => {
        if (error) {
          setMessage(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainContainer>
      <CardContainer>
        <form onSubmit={handleSecurity}>
          <CardHeader>
            <FaUserShield />
            <Text>Security Questions</Text>
          </CardHeader>
          <CardBody>
            {message && (
              <p
                style={{
                  color: "#07bc0c",
                  textAlign: "center",
                  marginBottom: "15px",
                  fontWeight: "bold",
                }}
              >
                {message}
              </p>
            )}
            <FormGroup>
              <label htmlFor="">What is the name of your favorite pet?</label>
              <input
                type="text"
                defaultValue={answers.decrpytedAnswerOne}
                onChange={(e) => setQtnOne(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="">What is your mother's maiden name?</label>
              <input
                type="text"
                defaultValue={answers.decrpytedAnswerTwo}
                onChange={(e) => setQtnTwo(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="">
                What was your favorite subject in high school?
              </label>
              <input
                type="text"
                defaultValue={answers.decrpytedAnswerThree}
                onChange={(e) => setQtnThree(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="">What was your dream job as a child?</label>
              <input
                type="text"
                defaultValue={answers.decrpytedAnswerFour}
                onChange={(e) => setQtnFour(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="">What is your favorite movie?</label>
              <input
                type="text"
                defaultValue={answers.decrpytedAnswerFive}
                onChange={(e) => setQtnFive(e.target.value)}
              />
            </FormGroup>
          </CardBody>
          <CardFooter>
            <Button type="submit">
              {!isLoading ? (
                "Save changes"
              ) : (
                <ClipLoader size={16} color="#ffffff" />
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContainer>
      <Footer />
    </MainContainer>
  );
};

export default SecuritySetting;
