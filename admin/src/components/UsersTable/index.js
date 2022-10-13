import React, {useState, useEffect, useMemo} from 'react'
import DataTable from 'react-data-table-component'
import axios from '../../api/axios'

const UsersTable = ({openDeleteModal, openEditModal}) => {
    const [data, setData] = useState([])
    const [id, setId] = useState(0)
    const [loading, isLoading] = useState(false)

    // const {usersData} = useContext(UserContext)


    useEffect(() => {
        userList();
    }, [])

    const userList = () => {
        isLoading(true)
        axios.get('http://localhost:5000/users')
        .then((response) => {
            setData(response.data)
            isLoading(false)
        })
        .catch(error => console.log(error))
    }

    const columns = useMemo(()=> [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: "Office",
            selector: (row) => row.office_name,
            sortable: true
        },
        {
            name: "Role",
            selector: (row) => row.role
        },
        {
            name: "Actions",
            selector: (row) => 
            <>
                <button onClick={()=> console.log(row.id)}>Edit</button>
                <button onClick={()=> console.log(row.id)}>Delete</button>
            </>
            ,
            allowOverflow: true,
            button: true
        },
    ],[])

    return (
        <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
        />
    )
}

export default UsersTable