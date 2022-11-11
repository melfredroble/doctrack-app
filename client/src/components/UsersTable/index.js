import React, {useState, useEffect, useMemo, useContext} from 'react'
import DataTable from 'react-data-table-component'
import useFetch from '../../hooks/useFetch';
import UserContext from '../../context/MainContext';
import { Button, SearchContainer, ClearButton, Input } from './styles';
import {FaPen, FaTrashAlt} from 'react-icons/fa';
import { EditModal, DeleteModal } from '../../components/Modal';

const UsersTable = () => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const {setId} = useContext(UserContext)

    const {data,loading,error,fetchData} = useFetch('/users')

    useEffect(() => {
        fetchData()
    }, [])
    
    if(error){
        console.log(error)
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
            selector: (row) => row.role,
            sortable: true
        },
        {
            name: "Actions",
            selector: (row) => 
            <>
                <Button bg="#50A8EA" padding="5px" style={{marginRight: "10px"}} onClick={()=> {
                    setId(row.id)
                    setEditModal(true)
                }}><FaPen/></Button>
                <Button bg="red" padding="5px" onClick={()=> {
                    setId(row.id)
                    setDeleteModal(true)
                }}><FaTrashAlt/></Button>
            </>
            ,
            allowOverflow: true,
            button: true
        },
    ],[])

    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const filteredItems = data.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, resetPaginationToggle]);

    return (
        <>
            {subHeaderComponentMemo}
            <DataTable
                columns={columns}
                data={filteredItems}
                progressPending={loading}
                pagination
                striped
                highlightOnHover
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                persistTableHead
            />
            {deleteModal && <DeleteModal closeModal={setDeleteModal} />}
            {editModal && <EditModal closeModal={setEditModal} />}
        </>
    )
}

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <SearchContainer>
        <Input
            id="search"
            type="text"
            placeholder="Search"
            value={filterText}
            onChange={onFilter}
        />
        <ClearButton onClick={onClear}>X</ClearButton>
    </SearchContainer>
);



export default UsersTable