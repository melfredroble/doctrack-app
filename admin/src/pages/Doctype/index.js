import React, {useState} from 'react'
import { FaRegFileAlt, FaCheck, FaPlus } from 'react-icons/fa';
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
    InputGroup,
    ErrorText
} from './styles'
import Footer from '../../components/Footer';
import DocTypeTable from '../../components/DocTypeTable';
import useFetch from '../../hooks/useFetch';
import axios from '../../api/axios';
import MainContext from '../../context/MainContext';

const Doctype = () => {

    const [active, setActive] = useState(false);

    return (
        <MainContainer>
            <InnerContainer>
                <HeaderContainer>
                    <FaRegFileAlt/> 
                    <HeaderText> Document Type</HeaderText>
                </HeaderContainer>
                <Container>
                    <HeaderContainer justifyContent="space-between">
                        <HeaderText>Records</HeaderText>
                        <Button display="flex" content="end" align="center" bg="#50A8EA" br="100%" padding="8px 10px" onClick={()=> setActive(true)}>
                            <FaPlus/>
                        </Button>
                    </HeaderContainer>
                    <DocTypeTable/>
                    {active && <Modal closeModal={setActive} />}
                </Container>
            </InnerContainer>
            <Footer/>
        </MainContainer>
    )
}

const Modal = ({closeModal}) => {

    const [docType, setDocType] = useState('')
    const [error, setError] = useState([])
    const {fetchData} = useFetch('/documents/types')
    
    const addDoctype = (e)=> {
        e.preventDefault()
        if(docType !== ''){
            axios.post('/documents/addDocType', {withCredentials: true, doctype: docType})
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
    }

    return (
        <>
            <ModalBackdrop onClick={() => closeModal(false)} />
            <ModalContainer>
                <ModalHeader>
                    <FaRegFileAlt/><h1>  Add Document Type</h1>
                </ModalHeader>
                {error === "Email already exist!" && <ErrorText>{error}</ErrorText>}
                <form onSubmit={addDoctype}>
                    <ModalBody>
                            <FormGroup>
                                <InputGroup>
                                    <label>TITLE</label>
                                    <input 
                                    placeholder='Title' 
                                    value={docType}
                                    onChange={(e)=> setDocType(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <CloseModal onClick={()=> {closeModal(false)}}>&times; Close</CloseModal>
                        <Button type='submit' bg="#07bc0c" br="5px" padding="8px 12px" ><FaCheck style={{fontSize: "10px"}}/> Save</Button>
                    </ModalFooter>
                </form>
            </ModalContainer>
        </>
    )
}


export default Doctype