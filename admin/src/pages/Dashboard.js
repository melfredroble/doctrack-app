import React from 'react'
import styled from 'styled-components'
import DashboardContent from '../components/DashboardContent'
import Footer from '../components/Footer';

const Dashboard = () => {
    return (
        <MainContainer>
            <InnerContainer>
                <DashboardText>Dashboard</DashboardText>
                <DashboardContent/>
            </InnerContainer>
            <Footer/>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    margin-left: 250px;
    padding-top: 30px;
    height: 100%;
`

const InnerContainer = styled.div`
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 74vh;
`
const DashboardText = styled.h1`
    color: #414a4c;
    font-size: 16px;
    margin-bottom: 20px;
    text-transform: uppercase;
`

export default Dashboard
