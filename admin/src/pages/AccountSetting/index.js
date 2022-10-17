import React, {  useState, useContext, useEffect } from 'react'
import { MainContainer, CardContainer, CardHeader, CardBody, CardFooter, FormGroup, Text, Button } from './styles'
import { FaUserCog } from 'react-icons/fa';
import Footer from '../../components/Footer';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import MainContext from '../../context/MainContext';

const AccountSetting = () => {

    axios.defaults.withCredentials = true;

    const [isLoading, setIsLoading] = useState(false)
    const {fetchAdmin,userName, setUserName, userEmail, setUserEmail, userOffice, setUserOffice, offices} = useContext(MainContext)

    // useEffect(()=>{
    //     fetchAdmin()
    // },[])


    // const nameRef = useRef(null)
    // const officeRef = useRef(null)
    // const emailRef = useRef(null)

    const updateAdmin = (e) =>{
        e.preventDefault()
        setIsLoading(true)
        axios.put(`http://localhost:5000/users/update/admin`,
        {name: userName, email: userEmail, office: userOffice})
        .then((response)=>{
            if(response){
                setIsLoading(false)
                console.log(response.data)
            }
        })
        .catch(error => {
            console.log(error.message)
            setIsLoading(false)
        })
        .finally(()=> {
            setIsLoading(false)
        })
    }
    
    
    return (
        <MainContainer>
            <CardContainer>
                <CardHeader>
                    <FaUserCog/><Text>Account Settings</Text>
                </CardHeader>
                        <CardBody >
                            <FormGroup>
                                <label htmlFor="">Full name</label>
                                <input 
                                type="text" 
                                value={userName} 
                                onChange={(e)=> setUserName(e.target.value)}
                                name="" 
                                id="" 
                                />
                            </FormGroup>
                            <FormGroup>
                                <label htmlFor="">Email</label>
                                <input 
                                type="email" 
                                value={userEmail} 
                                onChange={(e)=> setUserEmail(e.target.value)}
                                name="" 
                                id="" />
                            </FormGroup>
                            <FormGroup>
                                <label>Office</label>
                                <select
                                    name="office"
                                    id=""
                                    defaultValue={userOffice}
                                    onChange={(e)=> setUserOffice(e.target.value)}
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
                            </FormGroup>
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