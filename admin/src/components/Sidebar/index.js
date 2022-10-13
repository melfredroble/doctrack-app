import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {MainContainer, LogoImg, SidebarLinks, SidebarLink, SidebarHeader, LogoText, Container, HeaderText} from './styles'
import { FaRegBuilding, FaRegUser, FaCog, FaTachometerAlt, FaUsersCog, FaRegFileAlt} from 'react-icons/fa'
import logo from '../../assets/img/logo.png'

const Sidebar = () => {

    const url = useLocation();

    return (

        <>
            <MainContainer>
                <SidebarHeader>
                    <LogoImg src={logo} />
                    <LogoText>
                        <h1 style={{textAlign: 'center', color: '#ffffff'}}>Doc</h1>
                        <h1 style={{textAlign: 'center', color: '#50A8EA'}}>Track</h1>
                    </LogoText>
                </SidebarHeader>
                <SidebarLinks>
                    <SidebarLink>
                        <Link to="/" style={{backgroundColor: url.pathname === '/' && '#272d3f', color: url.pathname === '/' && '#ffffff' }}><FaTachometerAlt/>  Dashboard</Link>
                    </SidebarLink>
                    <Container>
                        <HeaderText>Manage</HeaderText>
                        <SidebarLink>
                            <Link to="/offices" style={{backgroundColor: url.pathname === '/office' && '#272d3f', color: url.pathname === '/offices' && '#ffffff'}}><FaRegBuilding/> Offices</Link>
                        </SidebarLink>
                        <SidebarLink>
                            <Link to="/users" style={{backgroundColor: url.pathname === '/users' && '#272d3f', color: url.pathname === '/users' && '#ffffff'}}> <FaRegUser/> Users</Link>
                        </SidebarLink>
                        <SidebarLink>
                            <Link to="/type" style={{backgroundColor: url.pathname === '/type' && '#272d3f', color: url.pathname === '/type' && '#ffffff'}}> <FaRegFileAlt/> Doc type</Link>
                        </SidebarLink>
                    </Container>
                    <Container>
                        <HeaderText>Settings</HeaderText>
                        {/* <SidebarLink>
                            <Link to="/app-setting" style={{backgroundColor: url.pathname === '/app-setting' && '#272d3f', color: url.pathname === '/app-setting' && '#ffffff'}}> <FaCog/> App settings</Link>
                        </SidebarLink> */}
                        <SidebarLink>
                            <Link to="/account-setting" style={{backgroundColor: url.pathname === '/account-setting' && '#272d3f', color: url.pathname === '/account-setting' && '#ffffff'}}> <FaUsersCog style={{fontSize: "32px"}}/> Account settings</Link>
                        </SidebarLink>
                        <SidebarLink>
                            <Link to="/security-setting" style={{backgroundColor: url.pathname === '/security-setting' && '#272d3f', color: url.pathname === '/security-setting' && '#ffffff'}}> <FaUsersCog style={{fontSize: "32px"}}/> Security settings</Link>
                        </SidebarLink>
                    </Container>
                </SidebarLinks>
            </MainContainer>
            <Outlet/>
        </>
    )
}

export default Sidebar