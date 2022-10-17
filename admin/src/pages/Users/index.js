import React, { useState, useContext, useEffect } from 'react'
import Table from '../../components/Table';
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
    ErrorText
} from './styles';
import { FaRegUser, FaCheck, FaUser } from 'react-icons/fa';
import axios from 'axios'
import Footer from '../../components/Footer';
import UsersTable from '../../components/UsersTable';
import useFetch from '../../hooks/useFetch';
import MainContext from '../../context/MainContext';
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
                        <Button bg="#50A8EA" padding="10px" onClick={() => setActive(true)}>Add User</Button>
                    </HeaderContainer>
                    <UsersTable/>
                    {active && <Modal closeModal={setActive} />}
                </Container>
            </InnerContainer>
            <Footer />
        </MainContainer>
    )
}


const Modal = ({ closeModal }) => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [office, setOffice] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState([])

    const {fetchData} = useFetch('/users')
    const { offices, fetchAdmin } = useContext(MainContext)

    useEffect(()=>{
        fetchAdmin()
    },[])

    const handleUserModal = (e) => {
    
        e.preventDefault()
        axios.post("http://localhost:5000/users/add-user", {
                name: name,
                email: email,
                pin: pin,
                office: office,
                role: role
        })
        .then((response)=>{
            if (response.data.message) {
                setError(response.data.message);
            }
            if (response.data.status === "success") {
                closeModal(false);
                fetchData()
            }
        })
    }


    return (
        <>
            <ModalBackdrop onClick={() => closeModal(false)} />
            {/* <animated.div style={animation}> */}
            <ModalContainer>
                <ModalHeader>
                    <FaUser /><h1>Add User</h1>
                </ModalHeader>
                <form onSubmit={handleUserModal}>
                    <ModalBody>
                        <FormGroup>
                            {error === "Email already exist!" && <ErrorText>{error}</ErrorText>}
                            <InputGroup>
                                <label>FULL NAME</label>
                                <input
                                    placeholder='Enter first name'
                                    value={name}
                                    name="name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>EMAIL ADDRESS</label>
                                <input
                                    placeholder='Enter email address'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </InputGroup>
                            <InputGroup>
                                <label>PIN CODE</label>
                                <PinContainer>
                                    <button onClick={(e) => {
                                        e.preventDefault()
                                        setPin(Math.floor(1000 + Math.random() * 9000))
                                    }
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
                                    onChange={(e) => setOffice(e.target.value)}
                                    required
                                >
                                    <option value="">Select office</option>
                                    {
                                            offices.map(({id, office_name}, key)=>{
                                                return (
                                                        <option key={key} value={id}>{office_name}</option>
                                                )
                                            })
                                        }
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
                                    <option value="Head">Office Head</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </InputGroup>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <CloseModal onClick={() => closeModal(false)}>&times; Close</CloseModal>
                        <Button bg="#07bc0c" type='submit' padding="8px 12px" ><FaCheck style={{ fontSize: "10px" }} /> Save</Button>
                    </ModalFooter>
                </form>
            </ModalContainer>
            {/* </animated.div> */}
        </>
    )
}

export default Users