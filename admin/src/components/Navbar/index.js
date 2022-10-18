import React, { useEffect, useState } from 'react'
import {FaSignOutAlt, FaQuestionCircle} from 'react-icons/fa'
import {Link, Outlet } from 'react-router-dom'
import {MainContainer, Container, HeaderText, Button, Text, UserProfile, Item, ItemLink, InnerContainer} from './styles'
import { useTransition, animated } from 'react-spring'
import { useContext } from 'react'
import MainContext from '../../context/MainContext'
import userIcon from '../../assets/img/profile1.png'
// import useFetch from '../../hooks/useFetch'

const Navbar = () => {

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
                                <ItemLink>
                                    <FaQuestionCircle/>
                                    <Link style={{textDecoration: "none"}} to="/account-setting" >Change password</Link>
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