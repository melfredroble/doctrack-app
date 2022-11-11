import React, { useState, useEffect } from "react";
import {
  FaSignOutAlt,
  FaQuestionCircle,
  FaRegUser,
} from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MainContainer,
  Container,
  HeaderText,
  Button,
  Text,
  UserProfile,
  Item,
  InnerContainer,
  ModalBackDrop,
  ModalContainer,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  CardFooter,
} from "./styles";
import { CloseButtonContainer, CloseButton } from "../Modal/styles";
import { useTransition, animated } from "react-spring";
import { useContext } from "react";
import MainContext from "../../context/MainContext";
// import userIcon from "../../assets/img/profile1.png";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../api/axios";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [officeName, setOfficeName] = useState(false);
  const transition = useTransition(isVisible, {
    from: { x: 0, y: 10, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 10, opacity: 0 },
  });

  const { usersName } = useContext(MainContext);
  const user = JSON.parse(localStorage.getItem("userData"));
  const userRole = user.role;

  useEffect(() => {
    axios.get(`/offices/${user.office_id}`).then((response) => {
      setOfficeName(response.data[0].office_name);
    });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <MainContainer>
        <InnerContainer>
          <HeaderText>
            <h3>{userRole !== "admin" && officeName}</h3>
          </HeaderText>
          <UserProfile
            onClick={() => {
              setIsVisible((v) => !v);
            }}
          >
            {/* <img alt="userImg" src={userIcon} /> */}
            <FaRegUser />
            <p>{usersName}</p>
          </UserProfile>
        </InnerContainer>
        <Container onClick={() => setIsVisible(false)}>
          {transition((style, item) =>
            item ? (
              <animated.div style={style}>
                <Item>
                  {/* <ItemLink>
                                    <FaQuestionCircle/>
                                    <Link style={{textDecoration: "none"}} to="/account-setting" >Change password</Link>
                                </ItemLink> */}
                  <Button
                    type="button"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    <FaQuestionCircle />
                    <Text>Change password</Text>
                  </Button>
                  {/* <form action="http://localhost:5000/logout" method="get"> */}
                  <Button
                    type="submit"
                    onClick={() => {
                      axios.get("/logout").then((response) => {
                        if (response) {
                          localStorage.clear();
                          navigate("/");
                        }
                      });
                    }}
                  >
                    <FaSignOutAlt />
                    <Text>Sign out</Text>
                  </Button>
                  {/* </form> */}
                </Item>
              </animated.div>
            ) : (
              ""
            )
          )}
        </Container>
      </MainContainer>
      {showModal && (
        <Modal showModal={setShowModal} showResetModal={setShowResetModal} />
      )}
      {showResetModal && <ResetPassword showModal={setShowResetModal} />}
      <Outlet />
    </>
  );
};

const Modal = ({ showModal, showResetModal }) => {
  const [ansOne, setAnsOne] = useState("");
  const [ansTwo, setAnsTwo] = useState("");
  const [ansThree, setAnsThree] = useState("");
  const [ansFour, setAnsFour] = useState("");
  const [ansFive, setAnsFive] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAnswers = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("/security/answer", { ansOne, ansTwo, ansThree, ansFour, ansFive })
      .then((response) => {
        if (response.status === 200) {
          showResetModal(true);
          showModal(false);
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
      <ModalBackDrop
        onClick={() => {
          showModal(false);
        }}
      />
      <ModalContainer width="500px">
        <form onSubmit={handleAnswers}>
          <CardContainer p="20px 10px">
            <CloseButtonContainer>
              <CloseButton
                fs="22px"
                background="none"
                padding="5px 10px"
                onClick={() => showModal(false)}
              >
                X
              </CloseButton>
            </CloseButtonContainer>
            <CardHeader>
              <h5>Security questions</h5>
              <p>{message}</p>
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
                <label htmlFor="qtnOne">
                  What is your mother's maiden name?
                </label>
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
          </CardContainer>
        </form>
      </ModalContainer>
    </>
  );
};

// Reset password modal

const ResetPassword = ({ showModal }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            setMessage("Changes saved");
            // showModal(false);
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

  return (
    <>
      <ModalBackDrop
        onClick={() => {
          showModal(false);
        }}
      />
      <ModalContainer width="500px">
        <form onSubmit={resetPassword}>
          <CardContainer p="30px 20px">
            <CloseButtonContainer>
              <CloseButton
                fs="22px"
                background="none"
                padding="5px 10px"
                onClick={() => showModal(false)}
              >
                X
              </CloseButton>
            </CloseButtonContainer>
            <CardHeader>
              <h2>Reset Password</h2>
              <p
                style={
                  message === "Changes saved"
                    ? { marginTop: "10px", color: "green", fontWeight: "bold" }
                    : { color: "red" }
                }
              >
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
                  autoComplete="true"
                />
              </FormGroup>
              <FormGroup>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  autoComplete="true"
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <button type="submit">
                {!isLoading ? (
                  "Reset"
                ) : (
                  <ClipLoader size={16} color="#ffffff" />
                )}
              </button>
            </CardFooter>
          </CardContainer>
        </form>
      </ModalContainer>
    </>
  );
};

export default Navbar;
