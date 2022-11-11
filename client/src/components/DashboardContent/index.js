import React, { useEffect, useState } from 'react'
import { Container, Card, CardRight, CardLeft, CardBottom} from './styles'
import { FaBuilding, FaUsers, FaUserTie } from 'react-icons/fa'
import axios from 'axios'

const DashboardContent = () => {

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
    )
}

export default DashboardContent