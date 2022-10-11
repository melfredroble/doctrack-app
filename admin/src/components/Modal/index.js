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
    ButtonContainer
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
    InputGroup,
    PinContainer,
    ErrorText
} from "../../pages/Users/styles";
import Axios from "axios";
import UserContext from '../../context/UserContext';
import { FaExclamationTriangle, FaCheck, FaUser } from 'react-icons/fa';

export const DeleteModal = ({ closeModal, openModal }) => {

    const { userId, usersData, setUsersData, setShowMessage, setMessage } = useContext(UserContext)


    const deleteUser = (id) => {
        Axios.delete(`http://localhost:5000/users/delete/${id}`)
            .then((response) => {
                if (response.data.deleted === true) {
                    closeModal(false)
                    setShowMessage(true)
                    setMessage("Succcessfully deleted")
                }
                setUsersData(usersData.filter((val) => {
                    return val.id !== id
                }))
            })
    }

    return (
        <>
            <DeleteModalBackdrop onClick={() => closeModal(false)} />
            <DeleteModalContainer>
                <DeleteModalHeader>
                    <CloseButtonContainer>
                        <CloseButton fs="22px" background="none" padding="5px 10px" onClick={() => closeModal(false)}>X</CloseButton>
                    </CloseButtonContainer>
                    <FaExclamationTriangle />
                    <Text>WARNING!</Text>
                    <Text fw="normal">Are you sure to delete this user?</Text>
                </DeleteModalHeader>
                <DeleteModalBody>
                    <ButtonContainer>
                        <CloseButton bg="#e0e0e0" padding="5px 30px" onClick={() => closeModal(false)}>Cancel</CloseButton>
                        <DeleteButton onClick={() => deleteUser(userId)}>Delete</DeleteButton>
                    </ButtonContainer>
                </DeleteModalBody>
            </DeleteModalContainer>
        </>
    );
};


export const EditModal = ({ closeModal, openModal }) => {


    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPin, setNewPin] = useState('')
    const [newOffice, setNewOffice] = useState('')
    const [newRole, setNewRole] = useState('')
    const [error, setError] = useState([])

    const { userId, userList, setShowMessage, setMessage } = useContext(UserContext)

    const editUser = () => {
        Axios.put(`http://localhost:5000/users/update`,
        {name: newName, email: newEmail, pin: newPin, office: newOffice, role: newRole, id: userId})
            .then((response) => {
                if (response.data.updated === true) {
                    closeModal(false)
                    setShowMessage(true)
                    setMessage("User updated")
                }
                userList()
                
            })
    }

    useEffect(()=> {
        Axios.get(`http://localhost:5000/users/${userId}`)
        .then((response)=> {
            if(response){
                setNewName(response.data[0].name)
                setNewEmail(response.data[0].email)
                setNewOffice(response.data[0].office_id)
                setNewRole(response.data[0].role)
            }
        })
        .catch(error => console.log(error))
    },[])


    return (
        <>
            <ModalBackdrop onClick={() => closeModal(false)} />
            <ModalContainer>
                <ModalHeader>
                    <FaUser /><h1>Edit User</h1>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        {error === "Email already exist!" && <ErrorText>{error}</ErrorText>}
                                <InputGroup>
                                    <label>FULL NAME</label>
                                    <input
                                        placeholder='Full Name'
                                        value={newName}
                                        name="name"
                                        onChange={(e) => setNewName(e.target.value)}
                                        required
                                    />
                                    <input value={userId} type="hidden" name="id"/>
                                </InputGroup>
                                <InputGroup>
                                    <label>EMAIL ADDRESS</label>
                                    <input
                                        placeholder='Enter email address'
                                        name='email'
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        required
                                    />
                                </InputGroup>
                                <InputGroup>
                                    <label>PIN CODE</label>
                                    <PinContainer>
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            setNewPin(Math.floor(1000 + Math.random() * 9000))
                                        }
                                        }>Generate</button>
                                        <input
                                            type="number"
                                            name="pin"
                                            placeholder='4 pin code'
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
                                        defaultValue={newOffice}
                                        onChange={(e) => setNewOffice(e.target.value)}
                                        required
                                    >
                                        <option value="">Select office</option>
                                        <option value="1">Registrar</option>
                                        <option value="2">HRMO</option>
                                        <option value="1">Campus Director</option>
                                        <option value="1">Computer Studies Department</option>
                                    </select>
                                </InputGroup>
                                <InputGroup>
                                    <label>ROLE</label>
                                    <select
                                        name="role"
                                        id=""
                                        defaultValue={newRole}
                                        onChange={(e) => setNewRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Select role</option>
                                        <option value="Head">Office Head</option>
                                        <option value="Employee">Employee</option>
                                    </select>
                                </InputGroup>
                            </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <CloseModal onClick={() => {closeModal(false)}}>&times; Close</CloseModal>
                    <Button
                        bg="#07bc0c"
                        type='submit'
                        padding="8px 12px"
                        onClick={()=> {
                            editUser()
                        }}>
                        <FaCheck style={{ fontSize: "10px" }} /> Save</Button>
                </ModalFooter>
            </ModalContainer>
        </>
    )
}