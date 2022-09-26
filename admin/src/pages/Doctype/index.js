import React, {useState} from 'react'
import { FaRegFileAlt, FaCheck } from 'react-icons/fa';
import Table from '../../components/Table';
import { 
    MainContainer, 
    HeaderText, 
    HeaderContainer, 
    InnerContainer, 
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
// import "../../assets/css/table.css";

const Doctype = () => {

    const [active, setActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const thead = [
        {
            id: "1",
            category: "Category"
        },
        {
            id: "2",
            category: "Actions"
        }
    ]

    const data = [
        {
            name: "Certificate of Registration",
        },
        {
            name: "FHE Form",
        },
        {
            id: "3",
            name: "Memorandum",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
        },
        {
            id: "2",
            name: "FHE Form",
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
                    <FaRegFileAlt/> <HeaderText> Document Type</HeaderText>
                </HeaderContainer>
                <Container>
                    <HeaderContainer justifyContent="space-between">
                        <HeaderText>Records</HeaderText>
                        <Button bg="#50A8EA" padding="10px" onClick={()=> setActive(true)}>Add Document Type</Button>
                    </HeaderContainer>
                    <Table thead={thead} data={data} id={pageName}/>
                    {active && <Modal closeModal={setActive} />}
                </Container>
            </InnerContainer>
        </MainContainer>
    )
}

const Modal = ({closeModal}) => {
    return (
        <>
            <ModalBackdrop/>
            <ModalContainer>
                <ModalHeader>
                    <FaRegFileAlt/><h1>Add Document Type</h1>
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

export default Doctype