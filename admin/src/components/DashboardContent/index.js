import React from 'react'
import { Container, Card, CardRight, CardLeft, CardBottom} from './styles'
import { FaBuilding, FaUsers, FaUserTie } from 'react-icons/fa'

const DashboardContent = () => {
    return (
        <Container>
            <Card>
                <CardLeft>
                    <h5>08</h5>
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
                    <h5>15</h5>
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