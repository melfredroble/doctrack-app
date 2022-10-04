import React, {useContext, useEffect, useState} from "react";
import {
    DeleteModalBackdrop,
    DeleteModalBody,
    DeleteModalContainer,
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
import { FaRegUser, FaCheck, FaUser } from 'react-icons/fa';

export const DeleteModal = ({closeModal, openModal}) => {

    const {userId, userData, setUserData, setShowMessage, setMessage} = useContext(UserContext)


    const deleteUser = (id)=> {
        Axios.delete(`http://localhost:5000/users/delete/${id}`)
        .then((response)=>{
            if(response.data.deleted === true){
                closeModal(false)
                setShowMessage(true)
                setMessage("Succcessfully deleted")
            }
            setUserData(userData.filter((val)=>{
                return val.id !== id
            }))
        })
    }

    return (
        <>
            <DeleteModalBackdrop onClick={()=> closeModal(false)} />
            <DeleteModalContainer>
            {/* <CloseButton onClick={()=> closeModal(false)}>X</CloseButton> */}
                <DeleteModalBody>
                    <Text>Are you sure to delete?</Text>
                    <ButtonContainer>
                        <DeleteButton onClick={()=> deleteUser(userId)}>Yes</DeleteButton>
                        <CloseButton onClick={()=> closeModal(false)}>No</CloseButton>
                    </ButtonContainer>
                </DeleteModalBody>
            </DeleteModalContainer>
        </>
    );
};


export const EditModal = ({closeModal, openModal}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [office, setOffice] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState([])

    const {userId, userList, setShowMessage, setMessage} = useContext(UserContext)

    const editUser = async () => {
        const response = await Axios.post("http://localhost:5000/users/add-user", {
            name: name,
            email: email,
            pin: pin,
            office: office,
            role: role
        })
        .catch(error => console.log(error))

        if(response.data.message){
            setError(response.data.message);
        }

        if(response.data.status === "success") {
            closeModal(false);
            userList();
            setShowMessage(true)
            setMessage("User added successfully");
        }
    }

    useEffect(()=> {

    })

    return (
        <>
            <ModalBackdrop onClick={()=> closeModal(false)} />
            <ModalContainer>
                <ModalHeader>
                    <FaUser/><h1>Edit User</h1>
                </ModalHeader>
                <ModalBody>
                        <FormGroup>
                            {error === "Email already exist!" && <ErrorText>{error}</ErrorText>}
                            <InputGroup>
                                <label>FULL NAME</label>
                                <input 
                                placeholder={userId} 
                                value={name} 
                                name="name"
                                onChange={(e)=> setName(e.target.value)}
                                required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>EMAIL ADDRESS</label>
                                <input 
                                placeholder='Enter email address'
                                name='email'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>PIN CODE</label>
                                <PinContainer>
                                    <button onClick={(e)=> {
                                        e.preventDefault()
                                        setPin(Math.floor(1000 + Math.random() * 9000))}
                                        }>Generate</button>
                                    <input 
                                    type="number" 
                                    name="pin"
                                    placeholder='4 pin code'
                                    value={pin} 
                                    onChange={(e) => setPin(e.target.value)}
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
                                onChange={(e)=> setOffice(e.target.value)}
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
                                defaultValue={role}
                                onChange={(e)=> setRole(e.target.value)}
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
                    <CloseModal onClick={()=> closeModal(false)}>&times; Close</CloseModal>
                    <Button 
                    bg="#07bc0c" 
                    type='submit' 
                    padding="8px 12px" 
                    onClick={editUser(userId)}>
                    <FaCheck style={{fontSize: "10px"}}/> Save</Button>
                </ModalFooter>
            </ModalContainer>
        </>
    )
}