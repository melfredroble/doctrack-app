import React, { useState, useEffect } from 'react'
import {FaSignOutAlt, FaUserCircle, FaUserCog} from 'react-icons/fa'
import {Link, Outlet } from 'react-router-dom'
import {MainContainer, Container, Button, Text, UserProfile, Item, ItemLink, InnerContainer} from './styles'
import Axios from 'axios'
import { useTransition, animated } from 'react-spring'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'
import userIcon from '../../assets/img/profile1.png'

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false)
    const transition = useTransition(isVisible, {
        from: {x: 0, y: 10, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: 10, opacity: 0}
    })
    // const [user, setUser] = useState()
    
    const {userinfo, setUserInfo} = useContext(UserContext)

    useEffect(() => {
        Axios.get('http://localhost:5000/users')
        .then((response) => {
            setUserInfo(response.data[0])
        })
        .catch(error => console.log(error))
    }, [setUserInfo])





    return (
        <>
            <MainContainer>
                <InnerContainer>
                        <h3>
                            {userinfo.office_name}
                        </h3>
                    <UserProfile onClick={()=> {
                        setIsVisible(v => !v)
                    }}>
                        <img alt='userImg' src={userIcon}/>
                        <p>{userinfo.name}</p>
                    </UserProfile>
                </InnerContainer>
                <Container onClick={()=> setIsVisible(false)}>
                    {transition((style, item)=> 
                        item ? 
                        <animated.div style={style}>
                            <Item>
                            <form action='http://localhost:5000/logout' method='get'>
                                <ItemLink>
                                    <FaUserCog/>
                                    <Link style={{textDecoration: "none"}} to="/account-setting" >Account settings</Link>
                                </ItemLink>
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
            <Outlet/>
        </>
    )
}

export default Navbar