import React, {  useState, useContext, useEffect } from 'react'
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'
import { FaUserCog } from 'react-icons/fa';
import Footer from '../../components/Footer';
import axios from '../../api/axios';
import ClipLoader from "react-spinners/ClipLoader";
import MainContext from '../../context/MainContext';

const AccountSetting = () => {

    axios.defaults.withCredentials = true;

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [id, setId] = useState();
    // const [office, setOffice] = useState('');
    // const {offices} = useContext(MainContext);
    const [message, setMessage] = useState('');

    const {adminData} = useContext(MainContext);

    useEffect(()=>{
        axios.get("/users/admin")
        .then((response)=>{
            if(response.status === 200){
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setId(response.data[0].id);
                // setOffice(response.data[0].office_id);
            }
        })
        .catch((error)=>{
            setMessage(error.message);
        })
    },[])





    // const nameRef = useRef(null)
    // const officeRef = useRef(null)
    // const emailRef = useRef(null)

    const updateAdmin = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        axios.put(`http://localhost:5000/users/update/admin`,
        {name, email, id})
        .then((response)=>{
            if(response){
                adminData();
                setMessage("Heyy");
            }
        })
        .catch((error)=>{
            setMessage(error.message);
        })
        .finally(()=> {
            setIsLoading(false);
        })
    }
    
    
    return (
        <MainContainer>
            <CardContainer>
                <CardHeader>
                    <FaUserCog/><Text>Account Settings</Text>
                </CardHeader>
                        <CardBody >
                            <p>{message}</p>
                            <FormGroup>
                                <label htmlFor="">Full name</label>
                                <input 
                                type="text" 
                                value={name} 
                                onChange={(e)=> setName(e.target.value)}
                                name="" 
                                id="" 
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="">Email</label>
                                <input 
                                type="email" 
                                value={email} 
                                onChange={(e)=> setEmail(e.target.value)}
                                name="" 
                                id="" />
                            </FormGroup>
                            {/* <FormGroup>
                                <label>Office</label>
                                <select
                                    name="office"
                                    id=""
                                    defaultValue={office}
                                    onChange={(e)=> setOffice(e.target.value)}
                                    required
                                    >
                                        {
                                            offices.map(({id, office_name}, key)=>{
                                                return (
                                                        <option key={key} value={id}>{office_name}</option>
                                                )
                                            })
                                        }
                                </select>
                            </FormGroup> */}
                        </CardBody>
                <CardFooter>
                    <Button onClick={updateAdmin}>
                    {
                    !isLoading ? "Save changes" : <ClipLoader size={16} color="#ffffff" />
                    }
                    </Button>
                </CardFooter>
            </CardContainer>
            <Footer/>
        </MainContainer>
    )
}

export default AccountSetting