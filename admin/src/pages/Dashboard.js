import React from 'react'
import styled from 'styled-components'
import DashboardContent from '../components/DashboardContent'

const Dashboard = () => {
    return (
        <MainContainer>
            <InnerContainer>
                <DashboardContent/>
            </InnerContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    margin-left: 250px;
    display: flex; 
    padding-top: 30px;
`

const InnerContainer = styled.div`
    padding: 0 30px;
    display: flex;
    width: 100%;
`

export default Dashboard
