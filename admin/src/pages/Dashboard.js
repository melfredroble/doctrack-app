import React from 'react'
import styled from 'styled-components'
import DashboardContent from '../components/DashboardContent'

const Dashboard = () => {
    return (
        <Container>
            <DashboardContent/>
        </Container>
    )
}

const Container = styled.div`
    margin-left: 250px;
    display: flex; 
    padding-top: 30px;
`

export default Dashboard
