import React, {useState} from 'react'
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

const Office = () => {

    
    const [active, setActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const data = [
        {
            id: "1",
            name: "Certificate of Registration",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "3",
            name: "Memorandum",
        },
        {
            id: "2",
            name: "FHE Form",
        }
    ];

    const pageName = {
        name: "docTypePage"
    };
    

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
                    <Table thead={thead} data={data} id={pageName}/>
                        {active && <Modal closeModal={setActive} />}
                </Container>  
            </InnerContainer>    
            <Footer />  
        </MainContainer>

    )
}


const Modal = ({closeModal}) => {
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
                            <InputGroup>
                                <label>TITLE</label>
                                <input placeholder='Title'/>
                            </InputGroup>
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <CloseModal onClick={()=> closeModal(false)}>&times; Close</CloseModal>
                    <Button bg="green" padding="8px 12px" ><FaCheck style={{fontSize: "10px"}}/> Save</Button>
                </ModalFooter>
            </ModalContainer>
        </>
    )
}

export default Office