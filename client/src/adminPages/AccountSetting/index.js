import React, { useState, useContext, useEffect } from "react";
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
import { FaUserCog } from "react-icons/fa";
import Footer from "../../components/Footer";
import axios from "../../api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import MainContext from "../../context/MainContext";
import { useNavigate } from "react-router-dom";

const AccountSetting = () => {
  axios.defaults.withCredentials = true;

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState();
  const [message, setMessage] = useState("");

  const { fetchUsersName } = useContext(MainContext);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(()=> {
      user.role !== "admin" && navigate('/dashboard');
  },[])

  useEffect(() => {
    axios
      .get("/users/admin")
      .then((response) => {
        if (response.status === 200) {
          setName(response.data[0].name);
          setEmail(response.data[0].email);
          setId(response.data[0].id);
          // setOffice(response.data[0].office_id);
        }
      })
      .catch((error) => {
        setMessage(error.message);
      });
  }, []);

  // const nameRef = useRef(null)
  // const officeRef = useRef(null)
  // const emailRef = useRef(null)

  const updateAdmin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/users/update/admin`, { name, email, id })
      .then((response) => {
        if (response) {
          fetchUsersName();
          setMessage("Changes saved");
        }
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainContainer>
      <CardContainer>
        <CardHeader>
          <FaUserCog />
          <Text>Account Settings</Text>
        </CardHeader>
        <CardBody>
          {message && (
            <p
              style={{
                color: "#000000",
                textAlign: "center",
                marginBottom: "15px",
                fontSize: "13px",
                padding: "8px 0",
                backgroundColor: "rgb(198, 238, 200)",
                border: "1px solid #07bc0c",
              }}
            >
              {message}
            </p>
          )}
          <FormGroup>
            <label htmlFor="">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name=""
              id=""
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
            />
          </FormGroup>
          {/* <FormGroup>
                                <label>Office</label>
                                <select
                                    name="office"
                                    id=""
                                    defaultValue={office}
                                    onChange={(e)=> setOffice(e.target.value)}
                                    required
                                    >
                                        {
                                            offices.map(({id, office_name}, key)=>{
                                                return (
                                                        <option key={key} value={id}>{office_name}</option>
                                                )
                                            })
                                        }
                                </select>
                            </FormGroup> */}
        </CardBody>
        <CardFooter>
          <Button onClick={updateAdmin}>
            {!isLoading ? (
              "Save changes"
            ) : (
              <ClipLoader size={16} color="#ffffff" />
            )}
          </Button>
        </CardFooter>
      </CardContainer>
      <Footer />
    </MainContainer>
  );
};

export default AccountSetting;
