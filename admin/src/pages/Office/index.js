import React, {useContext, useState} from 'react'
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
import Footer from '../../components/Footer';
import axios from '../../api/axios';
import { ErrorText } from '../Users/styles';
import OfficeTable from '../../components/OfficeTable';
import useFetch from '../../hooks/useFetch';
import MainContext from '../../context/MainContext';

const Office = () => {
    
    const [active, setActive] = useState(false);

    return (
        <MainContainer>
            <InnerContainer>
                <HeaderContainer>
                    <FaRegBuilding/> <HeaderText>Offices</HeaderText>
                </HeaderContainer>
                <Container>
                    <HeaderContainer justifyContent="space-between">
                        <HeaderText>Records</HeaderText>
                        <Button bg="#50A8EA" padding="10px" onClick={()=> setActive(true)}>Add Office</Button>
                    </HeaderContainer>
                    <OfficeTable />
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
    const {fetchData} = useFetch('/offices')

    const addOffice = (e)=>{
        e.preventDefault()
        axios.post('/offices/add',{office: office})
        .then((response)=>{
            if (response.data.message) {
                setError(response.data.message);
            }
    
            if (response.data.status === "success") {
                closeModal(false)
                fetchData()
            }
        })
    }

    return (
        <>
            <ModalBackdrop onClick={()=> {closeModal(false)}}/>
            <ModalContainer>
                <ModalHeader>
                    <FaRegBuilding/><h1>Add Office</h1>
                </ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            {error === "Office already exist!" && <ErrorText>{error}</ErrorText>}
                            <InputGroup>
                                <label>Office</label>
                                <input 
                                type='text'
                                value={office}
                                name='office'
                                placeholder='Office'
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