import React, { useState, useEffect } from 'react'
import {FaSignOutAlt, FaUserCircle, FaUserCog} from 'react-icons/fa'
import {Link, Outlet } from 'react-router-dom'
import {MainContainer, Container, Button, Text, UserProfile, Item, ItemLink} from './styles'
import Axios from 'axios'
import { useTransition, animated } from 'react-spring'
import { useContext } from 'react'
import UserContext from '../../context/UserContext'

const Navbar = () => {

    const [isVisible, setIsVisible] = useState(false)
    const transition = useTransition(isVisible, {
        from: {x: 0, y: 10, opacity: 0},
        enter: {x: 0, y: 0, opacity: 1},
        leave: {x: 0, y: 10, opacity: 0}

    })
    
    const {user, setIsAuth} = useContext(UserContext)



    return (
        <>
            <MainContainer>
                <UserProfile onClick={()=> {
                    setIsVisible(v => !v)
                }}>
                    <FaUserCircle/>
                    {/* <p>{user.name}</p> */}
                </UserProfile>
                
                <Container onClick={()=> setIsVisible(false)}>
                    {transition((style, item)=> 
                        item ? 
                        <animated.div style={style}>
                            <Item>
                            <form action='http://localhost:5000/logout' method='get'>
                                <ItemLink>
                                    <FaUserCog/>
                                    <Link style={{textDecoration: "none"}} to="/app-setting" >Account settings</Link>
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