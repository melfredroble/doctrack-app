import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { Container, MainContainer, Card, InnerContainer, AddDocumentPage } from './styles'
const Document = () => {

    const [docTypeList, setDocTypeList] = useState([])
    const [officeList, setOfficeList] = useState([])
    const [documents, setDocuments] = useState([])
    const [docType, setDocType] = useState(0)
    const [userId, setUserId] = useState(6)
    const [currentOffice, setCurrentOffice] = useState(1)
    const [destinationOffice, setDestinationOffice] = useState(0)
    const [remarks, setRemarks] = useState('')
    const [description, setDescription] = useState('')


    useEffect(()=> {
        fetchDocTypeList()
    },[])

    useEffect(()=> {
        fetchOfficeList()
    },[])

    useEffect(()=>{
        fetchDocuments(userId)
    },[userId])

    const fetchDocTypeList = async() =>{
        await Axios.get('http://localhost:5000/documents/type')
        .then((response)=> {
            setDocTypeList(response.data)
        })
        .catch(error => console.log(error))
    }

    const fetchOfficeList = async() =>{
        await Axios.get('http://localhost:5000/offices')
        .then((response)=> {
            setOfficeList(response.data)
        })
        .catch(error => console.log(error))
    }

    const fetchDocuments = async(id) =>{
        await Axios.get(`http://localhost:5000/documents/${id}`)
        .then((response)=> {
            setDocuments(response.data)
        })
        .catch(error => console.log(error))
    }

    const addDocument = async (e) => {
        e.preventDefault()
        await Axios.post('http://localhost:5000/documents/add-document', 
        {
            userId: userId,
            docType: docType,
            description: description,
            currentOffice: currentOffice,
            destOffice: destinationOffice,
            remarks: remarks
        })
        .then((response)=> {
            console.log(response.data.message)
            fetchDocuments(userId)
        })

    }

    return (
        <MainContainer>
            <Container>
                <InnerContainer>
                    <AddDocumentPage>
                    <h1>Add Document</h1>
                    <label>Select Document Type</label>
                    <select  value={docType} onChange={(e)=> setDocType(e.target.value)} required>
                        <option value="">Choose document type</option>
                        {docTypeList.map(({id, name}, key)=> (
                            <option value={id} key={key}>{name}</option>
                        ))}
                    </select>
                    <label>Destination office</label>
                    <select name="destoffice" value={destinationOffice} onChange={(e)=> setDestinationOffice(e.target.value)}>
                        <option value="">Choose office</option>
                        {officeList.map(({id, office_name}, key)=> (
                            <option value={id} key={key}>{office_name}</option>
                        ))}
                    </select>
                    <label>Remark</label>
                    <input type="text" placeholder="Remark" name="remarks" value={remarks} onChange={(e)=> setRemarks(e.target.value)} required/>
                    <label>Description</label>
                    <textarea name="description" value={description} onChange={(e)=> setDescription(e.target.value)} cols="30" rows="10">Description</textarea>
                    <button onClick={addDocument}>Add document</button>
                    </AddDocumentPage>
                </InnerContainer>
            </Container>
            <Container>
                        <div>
                        <h1>My Document</h1>
                        </div>
                        <InnerContainer>
                        {
                            documents.map(({userFullName, documentName, description, datetime, currentOffice, destinationOffice, remarks, action, status}, key) => (
                                <Card key={key}>
                                    {/* <div>
                                        <p>User: </p>
                                        <p>{userFullName}</p>
                                    </div> */}
                                    <div>
                                        <p>Document type: </p>
                                        <p>{documentName}</p>
                                    </div>
                                    <div>
                                        <p>Description: </p>
                                        <p>{description}</p>
                                    </div>
                                    <div>
                                        <p>Datetime: </p>
                                        <p>{datetime}</p>
                                    </div>
                                    <div>
                                        <p>Current office: </p>
                                        <p>{currentOffice}</p>
                                    </div>
                                    {/* <div>
                                        <p>Destination office: </p>
                                        <p>{destinationOffice}</p>
                                    </div> */}
                                    <div>
                                        <p>Remarks: </p>
                                        <p>{remarks}</p>
                                    </div>
                                    <div>
                                        <p>Latest action: </p>
                                        <p>{action}</p>
                                    </div>
                                    <div>
                                        <p>Status: </p>
                                        <p>{status}</p>
                                    </div>
                                </Card>
                            ))
                        }
                        </InnerContainer>
            </Container>

            <Container>
                <h1>Incoming Documents</h1>
            </Container>

            <Container>
                <h1>Outgoing Documents</h1>
                <InnerContainer>
                        {
                            documents.map(({userFullName, documentName, description, datetime, currentOffice, destinationOffice, remarks, action, status}, key) => (
                                <Card key={key}>
                                    {/* <div>
                                        <p>User: </p>
                                        <p>{userFullName}</p>
                                    </div> */}
                                    <div>
                                        <p>Document type: </p>
                                        <p>{documentName}</p>
                                    </div>
                                    <div>
                                        <p>Description: </p>
                                        <p>{description}</p>
                                    </div>
                                    <div>
                                        <p>Datetime: </p>
                                        <p>{datetime}</p>
                                    </div>
                                    <div>
                                        <p>Current office: </p>
                                        <p>{currentOffice}</p>
                                    </div>
                                    {/* <div>
                                        <p>Destination office: </p>
                                        <p>{destinationOffice}</p>
                                    </div> */}
                                    <div>
                                        <p>Remarks: </p>
                                        <p>{remarks}</p>
                                    </div>
                                    <div>
                                        <p>Latest action: </p>
                                        <p>{action}</p>
                                    </div>
                                    <div>
                                        <p>Status: </p>
                                        <p>{status}</p>
                                    </div>
                                </Card>
                            ))
                        }
                        </InnerContainer>
            </Container>
        </MainContainer>
    )
}


export default Document