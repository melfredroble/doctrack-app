import React from 'react'
import { Card, CardRight, CardLeft, CardBottom} from './styles'
import { FaBuilding, FaUsers } from 'react-icons/fa'

const DashboardContent = () => {
    return (
        <>
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
            {/* <Card>
                <CardLeft>
                    <h5>10</h5>
                </CardLeft>
                <CardRight>
                    <FaUsers/>
                </CardRight>
                <CardBottom>
                    <h5>Admin</h5>
                </CardBottom>
            </Card> */}
        </>
    )
}

export default DashboardContent