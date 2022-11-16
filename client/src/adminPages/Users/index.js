import React, { useState, useContext, useEffect } from "react";
import Table from "../../components/Table";
import {
  MainContainer,
  Container,
  InnerContainer,
  HeaderContainer,
  HeaderText,
  Button,
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  CloseModal,
  ModalBody,
  ModalFooter,
  FormGroup,
  InputGroup,
  PinContainer,
  ErrorText,
} from "./styles";
import { FaRegUser, FaCheck, FaUser, FaPlus } from "react-icons/fa";
import axios from "axios";
import Footer from "../../components/Footer";
import UsersTable from "../../components/UsersTable";
import useFetch from "../../hooks/useFetch";
import MainContext from "../../context/MainContext";
// import {useSpring, animated} from 'react-spring';

const Users = () => {
  const [active, setActive] = useState(false);

  return (
    <MainContainer>
      <InnerContainer>
        <HeaderContainer>
          <FaRegUser /> <HeaderText> Users</HeaderText>
        </HeaderContainer>
        <Container>
          <HeaderContainer justifyContent="space-between">
            <HeaderText>Records</HeaderText>
            <Button
              display="flex"
              content="end"
              align="center"
              bg="#50A8EA"
              br="100%"
              padding="8px 10px"
              onClick={() => setActive(true)}
            >
              <FaPlus />
            </Button>
          </HeaderContainer>
          <UsersTable />
          {active && <Modal closeModal={setActive} />}
        </Container>
      </InnerContainer>
      <Footer />
    </MainContainer>
  );
};

const Modal = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [office, setOffice] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState([]);

  const { fetchData } = useFetch("/users");
  const { offices, fetchAdmin } = useContext(MainContext);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const randomPassword = (length) => {
    let result  = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setNewPassword(result);
  }

  const handleUserModal = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/add-user", {
        name: name,
        email: email,
        pin: newPassword,
        office: office,
        role: role,
      })
      .then((response) => {
        if (response.data.message) {
          setError(response.data.message);
        }
        if (response.data.status === "success") {
          closeModal(false);
          fetchData();
        }
      });
  };

  return (
    <>
      <ModalBackdrop onClick={() => closeModal(false)} />
      {/* <animated.div style={animation}> */}
      <ModalContainer>
        <ModalHeader>
          <FaUser />
          <h1>Add User</h1>
        </ModalHeader>
        <form onSubmit={handleUserModal}>
          <ModalBody>
            <FormGroup>
              {error === "Email already exist!" && (
                <ErrorText>{error}</ErrorText>
              )}
              <InputGroup>
                <label>FULL NAME</label>
                <input
                  placeholder="Enter first name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>EMAIL ADDRESS</label>
                <input
                  placeholder="Enter email address"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>
              <InputGroup>
                <label>PASSWORD</label>
                <PinContainer>
                <button type="button" onClick={()=>randomPassword(6)}>
                  Generate
                </button>
                <input
                  type="text"
                  name="pin"
                  placeholder="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                </PinContainer>
              </InputGroup>
              <InputGroup>
                <label>OFICE</label>
                <select
                  name="office"
                  id=""
                  defaultValue={office}
                  onChange={(e) => setOffice(e.target.value)}
                  required
                >
                  <option value="">Select office</option>
                  {offices.map(({ id, office_name }, key) => {
                    return (
                      <option key={key} value={id}>
                        {office_name}
                      </option>
                    );
                  })}
                </select>
              </InputGroup>
              <InputGroup>
                <label>ROLE</label>
                <select
                  name="role"
                  id=""
                  defaultValue={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select role</option>
                  <option value="Secretary">Secretary</option>
                </select>
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <CloseModal onClick={() => closeModal(false)}>
              &times; Close
            </CloseModal>
            <Button bg="#07bc0c" br="5px" type="submit" padding="8px 12px">
              <FaCheck style={{ fontSize: "10px" }} /> Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
      {/* </animated.div> */}
    </>
  );
};

export default Users;
