import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  Container,
  CardContainer,
  CardHeader,
  CardBody,
  FormGroup,
  CardFooter,
  ErrorText,
} from "../../userPages/Login/styles";
// import logo from "../../assets/img/profile1.png";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "../../api/axios";
import MainContext from "../../context/MainContext";
import { BackgroundImg } from "../../userPages/LandingPage/styles";

const Login = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);

  const { fetchUsersName } = useContext(MainContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          navigate("/");
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      if (response.data.loggedIn === true) {
        navigate("/admin-dashboard");
        fetchUsersName();
        const userData = response.data.user;
        localStorage.setItem("userData", JSON.stringify(userData));
      }

      if (response.data.message) {
        setLoginStatus(response.data.message);
      }
    } catch (error) {
      if (error) {
        setLoginStatus("Server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundImg></BackgroundImg>
      <Container>
        <CardContainer>
          <CardHeader>
            <h2>Admin Login</h2>
            {loginStatus && <ErrorText>{loginStatus}</ErrorText>}
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardBody>
              <FormGroup>
                <FaEnvelope />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  id="email"
                />
              </FormGroup>
              <FormGroup>
                <FaLock />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  autoComplete="true"
                />
              </FormGroup>
            </CardBody>
            <CardFooter>
              <button type="submit">
                {!isLoading ? (
                  "Login"
                ) : (
                  <ClipLoader size={16} color="#ffffff" />
                )}
              </button>
              <Link to="/security-questions">Forgot password?</Link>
            </CardFooter>
          </form>
        </CardContainer>
      </Container>
    </>
  );
};

export default Login;
