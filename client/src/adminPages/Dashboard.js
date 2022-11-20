import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer';
import { FaBuilding, FaUsers, FaUserTie } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("userData"));

    useEffect(()=> {
        user.role !== "admin" && navigate('/dashboard');
    },[])

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
                            <h5>Total offices</h5>
                        </CardLeft>
                        <CardRight>
                            <h5>{offices}</h5>
                        </CardRight>
                        <CardBottom>
                            <span>
                                <FaBuilding/>
                            </span>
                        </CardBottom>
                    </Card>
                    <Card>
                        <CardLeft>
                            <h5>Total users</h5>
                        </CardLeft>
                        <CardRight>
                            <h5>{users}</h5>
                        </CardRight>
                        <CardBottom>
                            <span>
                            <FaUsers  />
                            </span>
                        </CardBottom>
                    </Card>
                    <Card>
                        <CardLeft>
                            <h5>Total admin</h5>
                        </CardLeft>
                        <CardRight>
                            <h5>1</h5>
                        </CardRight>
                        <CardBottom>
                            <span>
                            <FaUserTie/>
                            </span>
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
    margin-left: 10px;
    margin-bottom: 20px;
    text-transform: uppercase;
`


const Container = styled.div`
    display: flex;
    padding: 0 10px;
`

const Card = styled.div`
    
    background-color: #ffffff;
    box-shadow: 0px 5px 10px 3px rgba(0,0,0,0.2);
    border-radius: 5px;
    height: 120px;
    width: 260px;
    margin-right: 50px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    
    & >* {
        flex: 1 1 50px;
    }

`
const CardRight = styled.div`
    /* background-color: aliceblue; */
    display: flex;
    justify-content: center;

    & h5 {
        font-size: 28px;
    }
`

const CardBottom = styled.div`
    /* background-color: antiquewhite; */
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    & span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #cecece;
        border-radius: 100%;
        height: 70px;
        width: 75px;
    }

    & svg {
        font-size: 40px;
        color: #ffffff;
    }
`

const CardLeft = styled.div`
    /* background-color: aquamarine; */
    display: flex;
    align-items: center;
    justify-content: center;

    & h5 {
        font-size: 16px;
        font-weight: 500;
    }
`

export default Dashboard
