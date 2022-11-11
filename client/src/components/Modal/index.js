import React, { useContext, useEffect, useState } from "react";
import {
  DeleteModalBackdrop,
  DeleteModalHeader,
  DeleteModalBody,
  DeleteModalContainer,
  CloseButtonContainer,
  Text,
  CloseButton,
  DeleteButton,
  InputGroup,
  ButtonContainer,
} from "./styles";
import {
  ModalBackdrop,
  Button,
  ModalContainer,
  ModalHeader,
  CloseModal,
  ModalBody,
  ModalFooter,
  FormGroup,
  PinContainer,
  ErrorText,
} from "../../adminPages/Users/styles";
import Axios from "axios";
import {
  FaRegFileAlt,
  FaExclamationTriangle,
  FaCheck,
  FaUser,
  FaRegBuilding,
} from "react-icons/fa";
import MainContext from "../../context/MainContext";
import useFetch from "../../hooks/useFetch";

export const DeleteModal = ({ closeModal }) => {
  const { id, data, setData } = useContext(MainContext);

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:5000/users/delete/${id}`).then(
      (response) => {
        if (response.data.deleted === true) {
          closeModal(false);
        }
        setData(
          data.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <>
      <DeleteModalBackdrop onClick={() => closeModal(false)} />
      <DeleteModalContainer>
        <DeleteModalHeader>
          <CloseButtonContainer>
            <CloseButton
              fs="22px"
              background="none"
              padding="5px 10px"
              onClick={() => closeModal(false)}
            >
              X
            </CloseButton>
          </CloseButtonContainer>
          <FaExclamationTriangle />
          <Text>WARNING!</Text>
          <Text fw="bold">Are you sure to delete this user?</Text>
        </DeleteModalHeader>
        <DeleteModalBody>
          <ButtonContainer>
            <CloseButton
              bg="#e0e0e0"
              padding="5px 30px"
              onClick={() => closeModal(false)}
            >
              Cancel
            </CloseButton>
            <DeleteButton onClick={() => deleteUser(id)}>Delete</DeleteButton>
          </ButtonContainer>
        </DeleteModalBody>
      </DeleteModalContainer>
    </>
  );
};

export const DeleteDoctype = ({ closeModal }) => {
  const { id, data, setData } = useContext(MainContext);

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:5000/documents/delete/${id}`).then(
      (response) => {
        if (response.data.deleted === true) {
          closeModal(false);
        }
        setData(
          data.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <>
      <DeleteModalBackdrop onClick={() => closeModal(false)} />
      <DeleteModalContainer>
        <DeleteModalHeader>
          <CloseButtonContainer>
            <CloseButton
              fs="22px"
              background="none"
              padding="5px 10px"
              onClick={() => closeModal(false)}
            >
              X
            </CloseButton>
          </CloseButtonContainer>
          <FaExclamationTriangle />
          <Text>WARNING!</Text>
          <Text fw="bold">Are you sure to delete this data ?</Text>
        </DeleteModalHeader>
        <DeleteModalBody>
          <ButtonContainer>
            <CloseButton
              bg="#e0e0e0"
              padding="5px 30px"
              onClick={() => closeModal(false)}
            >
              Cancel
            </CloseButton>
            <DeleteButton onClick={() => deleteUser(id)}>Delete</DeleteButton>
          </ButtonContainer>
        </DeleteModalBody>
      </DeleteModalContainer>
    </>
  );
};

export const EditModal = ({ closeModal, openModal }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newOffice, setNewOffice] = useState("");
  const [newRole, setNewRole] = useState("");
  const { fetchData, error } = useFetch("/users");
  const { id, offices, fetchAdmin } = useContext(MainContext);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const editUser = () => {
    Axios.put(`http://localhost:5000/users/update`, {
      name: newName,
      email: newEmail,
      pin: newPin,
      office: newOffice,
      role: newRole,
      id: id,
    }).then((response) => {
      if (response.data.updated === true) {
        closeModal(false);
        fetchData();
      }
    });
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/users/${id}`)
      .then((response) => {
        if (response) {
          setNewName(response.data[0].name);
          setNewEmail(response.data[0].email);
          setNewOffice(response.data[0].office_id);
          setNewRole(response.data[0].role);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ModalBackdrop onClick={() => closeModal(false)} />
      <ModalContainer>
        <ModalHeader>
          <FaUser />
          <h1>Edit User</h1>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            {error === "Email already exist!" && <ErrorText>{error}</ErrorText>}
            <InputGroup>
              <label>FULL NAME</label>
              <input
                placeholder="Full Name"
                value={newName}
                name="name"
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>EMAIL ADDRESS</label>
              <input
                placeholder="Enter email address"
                name="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>PIN CODE</label>
              <PinContainer>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setNewPin(Math.floor(1000 + Math.random() * 9000));
                  }}
                >
                  Generate
                </button>
                <input
                  type="number"
                  name="pin"
                  placeholder="4 pin code"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  required
                />
              </PinContainer>
            </InputGroup>
            <InputGroup>
              <label>OFICE</label>
              <select
                name="office"
                id=""
                value={newOffice}
                onChange={(e) => setNewOffice(e.target.value)}
                required
              >
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
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                required
              >
                <option value="Head">Office Head</option>
                <option value="Secretary">Secretary</option>
                <option value="Employee">Employee</option>
              </select>
            </InputGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <CloseModal
            onClick={() => {
              closeModal(false);
            }}
          >
            &times; Close
          </CloseModal>
          <Button
            bg="#07bc0c"
            br="5px"
            type="submit"
            padding="8px 12px"
            onClick={() => {
              editUser();
            }}
          >
            <FaCheck style={{ fontSize: "10px" }} /> Save
          </Button>
        </ModalFooter>
      </ModalContainer>
    </>
  );
};

export const EditDoctypeModal = ({ closeModal }) => {
  const { id } = useContext(MainContext);
  const [newDoctype, setNewDoctype] = useState("");
  const { fetchData } = useFetch("/documents/types");

  const updateDoctype = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/documents/type/update", {
      id: id,
      doctype: newDoctype,
    })
      .then((response) => {
        if (response.data.updated === true) {
          closeModal(false);
          fetchData();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/documents/type/${id}`)
      .then((response) => {
        if (response) {
          setNewDoctype(response.data[0].name);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ModalBackdrop onClick={() => closeModal(false)} />
      <ModalContainer>
        <ModalHeader>
          <FaRegFileAlt />
          <h1> Edit Document Type</h1>
        </ModalHeader>
        <form onSubmit={updateDoctype}>
          <ModalBody>
            <FormGroup>
              <InputGroup>
                <label>TITLE</label>
                <input
                  placeholder="Title"
                  value={newDoctype}
                  onChange={(e) => setNewDoctype(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <CloseModal
              onClick={() => {
                closeModal(false);
              }}
            >
              &times; Close
            </CloseModal>
            <Button type="submit" br="5px" bg="#07bc0c" padding="8px 12px">
              <FaCheck style={{ fontSize: "10px" }} /> Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </>
  );
};

export const EditOfficeModal = ({ closeModal }) => {
  const { id } = useContext(MainContext);
  const [newOffice, setNewOffice] = useState("");
  const { fetchData } = useFetch("/offices");

  const updateDoctype = (e) => {
    e.preventDefault();
    Axios.put("http://localhost:5000/offices", { id: id, office: newOffice })
      .then((response) => {
        if (response.data.updated === true) {
          closeModal(false);
          fetchData();
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/offices/${id}`)
      .then((response) => {
        if (response) {
          setNewOffice(response.data[0].office_name);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <ModalBackdrop onClick={() => closeModal(false)} />
      <ModalContainer>
        <ModalHeader>
          <FaRegBuilding />
          <h1> Edit Office</h1>
        </ModalHeader>
        <form onSubmit={updateDoctype}>
          <ModalBody>
            <FormGroup>
              <InputGroup>
                <label>NAME</label>
                <input
                  placeholder="Office name"
                  value={newOffice}
                  onChange={(e) => setNewOffice(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <CloseModal
              onClick={() => {
                closeModal(false);
              }}
            >
              &times; Close
            </CloseModal>
            <Button type="submit" br="5px" bg="#07bc0c" padding="8px 12px">
              <FaCheck style={{ fontSize: "10px" }} /> Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContainer>
    </>
  );
};

export const DeleteOfficeModal = ({ closeModal }) => {
  const { id, data, setData } = useContext(MainContext);

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:5000/offices/delete/${id}`).then(
      (response) => {
        if (response.data.deleted === true) {
          closeModal(false);
        }
        setData(
          data.filter((val) => {
            return val.id !== id;
          })
        );
      }
    );
  };

  return (
    <>
      <DeleteModalBackdrop onClick={() => closeModal(false)} />
      <DeleteModalContainer>
        <DeleteModalHeader>
          <CloseButtonContainer>
            <CloseButton
              fs="22px"
              background="none"
              padding="5px 10px"
              onClick={() => closeModal(false)}
            >
              X
            </CloseButton>
          </CloseButtonContainer>
          <FaExclamationTriangle />
          <Text>WARNING!</Text>
          <Text fw="bold">Are you sure to delete this data ?</Text>
        </DeleteModalHeader>
        <DeleteModalBody>
          <ButtonContainer>
            <CloseButton
              bg="#e0e0e0"
              padding="5px 30px"
              onClick={() => closeModal(false)}
            >
              Cancel
            </CloseButton>
            <DeleteButton onClick={() => deleteUser(id)}>Delete</DeleteButton>
          </ButtonContainer>
        </DeleteModalBody>
      </DeleteModalContainer>
    </>
  );
};
