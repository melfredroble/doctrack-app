import React, {useContext, useState, useEffect} from 'react'
import { FaRegBuilding, FaCheck } from 'react-icons/fa';
import {
    MainContainer, 
    InnerContainer,
    HeaderContainer,
    HeaderText,
    Container,
    Button,
    ModalBackdrop,
    ModalContainer,
    ModalHeader,
    CloseModal,
    ModalBody,
    ModalFooter,
    FormGroup,
    InputGroup
} from './styles'
import Table from '../../components/Table';
import Footer from '../../components/Footer';
import Axios from 'axios'
import MainContext from '../../context/MainContext';
import { ErrorText } from '../Users/styles';
import Message from '../../components/Message';

const Office = () => {
    
    const [active, setActive] = useState(false);
    const { offices, showMessage } = useContext(MainContext)

    const thead = [
        {
            id: "1",
            category: "Offices"
        },
        {
            id: "2",
            category: "Actions"
        }
    ]


    const pageName = {
        name: "offices"
    };

    useEffect(()=>{
        offices()
    },[])
    

    return (
        <MainContainer>
            <InnerContainer>
                <HeaderContainer>
                    <FaRegBuilding/> <HeaderText>Offices</HeaderText>
                </HeaderContainer>
                <Container>
                    {showMessage === true && <Message />}
                    <HeaderContainer justifyContent="space-between">
                        <HeaderText>Records</HeaderText>
                        <Button bg="#50A8EA" padding="10px" onClick={()=> setActive(true)}>Add Office</Button>
                    </HeaderContainer>
                    <Table thead={thead}  id={pageName}/>
                        {active && <Modal closeModal={setActive} />}
                </Container>  
            </InnerContainer>    
            <Footer />  
        </MainContainer>

    )
}


const Modal = ({closeModal}) => {

    const [office, setOffice] = useState("")
    const [error, setError] = useState([])
    const { setShowMessage, setMessage, offices } = useContext(MainContext)

    const addOffice = (e)=>{
        e.preventDefault()
        Axios.post('http://localhost:5000/offices/add',{office: office})
        .then((response)=>{
            if (response.data.message) {
                setError(response.data.message);
            }
    
            if (response.data.status === "success") {
                closeModal(false)
                setShowMessage(true)
                setMessage("User added successfully")
                offices()
            }
        })
    }

    return (
        <>
            <ModalBackdrop/>
            <ModalContainer>
                <ModalHeader>
                    <FaRegBuilding/><h1>Add Office</h1>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            {error === "Office already exist!" && <ErrorText>{error}</ErrorText>}
                            <InputGroup>
                                <label>TITLE</label>
                                <input 
                                type='text'
                                value={office}
                                name='office'
                                placeholder='Title'
                                onChange={(e)=> {setOffice(e.target.value)}}
                                />
                            </InputGroup>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <CloseModal onClick={()=> {closeModal(false)}}>&times; Close</CloseModal>
                    <Button 
                    bg="green" 
                    padding="8px 12px"
                    onClick={addOffice}>
                        <FaCheck style={{fontSize: "10px"}}/> Save
                    </Button>
                </ModalFooter>
            </ModalContainer>
        </>
    )
}

export default Office