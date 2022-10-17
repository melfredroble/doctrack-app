import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import { FaBuilding, FaUsers, FaUserTie } from 'react-icons/fa'
import axios from 'axios'
const Dashboard = () => {

    let fetchUsers = 'http://localhost:5000/users'
    let fetchOffices = 'http://localhost:5000/offices'

    const [users, setUsers] = useState(null)
    const [offices, setOffices] = useState(null)

    const requestOne = axios.get(fetchUsers)
    const requestTwo = axios.get(fetchOffices)

    useEffect(()=>{
        axios.all([requestOne, requestTwo])
        .then(axios.spread((...responses)=>{
            setUsers(responses[0].data.length)
            setOffices(responses[1].data.length)
        }))
    },[])

    return (
        <MainContainer>
            <InnerContainer>
                <DashboardText>Dashboard</DashboardText>
                <Container>
                    <Card>
                        <CardLeft>
                            <h5>{offices}</h5>
                        </CardLeft>
                        <CardRight>
                            <FaBuilding/>
                        </CardRight>
                        <CardBottom>
                            <h5>Offices</h5>
                        </CardBottom>
                    </Card>
                    <Card>
                        <CardLeft>
                            <h5>{users}</h5>
                        </CardLeft>
                        <CardRight>
                            <FaUsers style={{fontSize: "4rem"}} />
                        </CardRight>
                        <CardBottom>
                            <h5>Users</h5>
                        </CardBottom>
                    </Card>
                    <Card>
                        <CardLeft>
                            <h5>1</h5>
                        </CardLeft>
                        <CardRight>
                            <FaUserTie/>
                        </CardRight>
                        <CardBottom>
                            <h5>Admin</h5>
                        </CardBottom>
                    </Card>
                </Container>
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
    padding: 0 20px;
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


const Container = styled.div`
    display: flex;
    padding: 0 10px;
`

const Card = styled.div`
    
    box-shadow: 0px 5px 10px 3px rgba(0,0,0,0.2);
    height: 150px;
    width: 300px;
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    margin-right: 50px;

`
const CardLeft = styled.div`
    /* background-color: aliceblue; */
    padding-top: 30px;
    display: flex;
    justify-content: center;

    & h5 {
        font-size: 45px;
    }
`

const CardRight = styled.div`
    /* background-color: antiquewhite; */
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 100%;

    & svg {
        font-size: 55px;
        color: #cecece;
    }
`

const CardBottom = styled.div`
    /* background-color: aquamarine; */
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Dashboard
