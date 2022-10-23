import React, { useEffect, useState } from 'react'
import {FaSignOutAlt, FaQuestionCircle} from 'react-icons/fa'
import {Link, Outlet, useNavigate } from 'react-router-dom'
import {
    MainContainer, 
    Container, 
    HeaderText, 
    Button, 
    Text, 
    UserProfile, 
    Item, 
    InnerContainer,
    ModalBackDrop,
    ModalContainer,
    ModalInnerContainer
} from './styles';
import { 
    CardContainer,
    CardHeader, 
    CardBody, 
    FormGroup, 
    CardFooter
} from '../../pages/SecurityQuestions/styles';
import { useTransition, animated } from 'react-spring';
import { useContext } from 'react';
import MainContext from '../../context/MainContext';
import userIcon from '../../assets/img/profile1.png';
import ClipLoader from "react-spinners/ClipLoader";
import axios from '../../api/axios';
// import useFetch from '../../hooks/useFetch'

const Navbar = () => {

    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false)
    const transition = useTransition(isVisible, {
        from: {x: 0, y: 10, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: 10, opacity: 0}
    })
    // const [user, setUser] = useState()
    
    // const {userName} = useContext(MainContext)


    return (
        <>
            <MainContainer>
                <InnerContainer>
                    <HeaderText>
                        <h3>
                            {/* Administering Office */}
                        </h3>
                    </HeaderText>
                    <UserProfile onClick={()=> {
                        setIsVisible(v => !v)
                    }}>
                        <img alt='userImg' src={userIcon}/>
                        <p>Melfred Roble</p>
                    </UserProfile>
                </InnerContainer>
                <Container onClick={()=> setIsVisible(false)}>
                    {transition((style, item)=> 
                        item ? 
                        <animated.div style={style}>
                            <Item>
                            <form action='http://localhost:5000/logout' method='get'>
                                {/* <ItemLink>
                                    <FaQuestionCircle/>
                                    <Link style={{textDecoration: "none"}} to="/account-setting" >Change password</Link>
                                </ItemLink> */}
                                <Button type='button' onClick={()=> {
                                    setShowModal(true)
                                    }}>
                                    <FaQuestionCircle/>
                                    <Text>Change password</Text>
                                </Button>
                                <Button type='submit' onClick={()=> {
                                    localStorage.clear()
                                    }}>
                                    <FaSignOutAlt/>
                                    <Text>Sign out</Text>
                                </Button>
                            </form>
                            </Item>
                        </animated.div> : ''
                    )}
                </Container>
            </MainContainer>
            {showModal && <Modal showModal={setShowModal} isShowModal={showModal}/>}
            <Outlet/>
        </>
    )
}

const Modal = ({showModal})=>{

    const [ansOne, setAnsOne] = useState('');
    const [ansTwo, setAnsTwo] = useState('');
    const [ansThree, setAnsThree] = useState('');
    const [ansFour, setAnsFour] = useState('');
    const [ansFive, setAnsFive] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('')
    const {setIsValidated} = useContext(MainContext);

    const navigate = useNavigate();

    const handleAnswers = (e)=>{
        e.preventDefault()
        setIsLoading(true)

        axios.post('/security/questions', 
        {ansOne, ansTwo, ansThree, ansFour, ansFive})
        .then((response)=>{
            if(response.data.validated === true){
                setIsValidated(true);
                navigate('/reset-password');
            }
        })
        .catch((error)=>{
            console.log(error);
            setMessage("Invalid answer/s")
        })
        .finally(()=>{
            setIsLoading(false)
        })
    }


    return (
        <>
        <ModalBackDrop onClick={()=> {
            showModal(false)
        }}/>
        <ModalContainer>
            <form onSubmit={handleAnswers}>
                <CardContainer>
                    {/* <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Doctrack</h1> */}
                    
                    <CardHeader>
                        <h5>Security questions</h5>
                        <p>{message}</p>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <label htmlFor="qtnOne">What is the name of your favorite pet?</label>
                            <input 
                            type="text"
                            value={ansOne}
                            onChange={(e)=> setAnsOne(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="qtnOne">What is your mother's maiden name?</label>
                            <input 
                            type="text"
                            value={ansTwo}
                            onChange={(e)=> setAnsTwo(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="qtnOne">What was your favorite subject in high school?</label>
                            <input 
                            type="text"  
                            value={ansThree}
                            onChange={(e)=> setAnsThree(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="qtnOne">What was your dream job as a child?</label>
                            <input 
                            type="text"  
                            value={ansFour}
                            onChange={(e)=> setAnsFour(e.target.value)}
                            required
                            />
                        </FormGroup>
                        <FormGroup>
                            <label htmlFor="qtnOne">What is your favorite movie?</label>
                            <input 
                            type="text"  
                            value={ansFive}
                            onChange={(e)=> setAnsFive(e.target.value)}
                            required
                            />
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <button type="submit">
                            {
                            !isLoading ? "Validate" : <ClipLoader size={16} color="#ffffff" />
                            }
                        </button>
                    </CardFooter>
                </CardContainer>
            </form>
        </ModalContainer>
        </>
    )

}

export default Navbar