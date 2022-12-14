import React, {useState, useContext} from 'react'
import { TableContainer, Tbody, Thead, Button, SearchContent, InputGroup, PaginationContent} from './styles'
import { FaPenAlt, FaTrashAlt, FaSearch} from 'react-icons/fa'
import ReactPaginate from 'react-paginate'
import '../../assets/css/pagination.css'
import UserContext from '../../context/MainContext'


const Table = ({thead, data, id, openDeleteModal, openEditModal}) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [pageNumber, setPageNumber] = useState(0)
    const {setUserId, officeList, usersData} = useContext(UserContext)
    
// Pagination
    const dataPerPage = 10
    const pagesVisited = pageNumber * dataPerPage

    const officePage = Math.ceil(officeList.length / dataPerPage)
    const usersPage = Math.ceil(usersData.length / dataPerPage)
    // const docTypePage = Math.ceil(docTypeList.length / dataPerPage)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    };

    return (
        <>
            <SearchContent>
                <InputGroup>
                    <div style={{width: "50px"}}>
                        <Button width="100%" borderRadius="2px" height="100%">
                            <FaSearch/>
                        </Button>
                    </div>
                    <div>
                        <input type="text" placeholder="Search" onChange={(e) => {
                            setSearchTerm(e.target.value)
                        }}/>
                    </div>
                </InputGroup>
            </SearchContent>
            <TableContainer id="type_table" >
                <Thead>
                    <tr >
                        {thead.map(({category}, index) => (
                            <th style={{fontSize: "12px", width: "100%", padding: "16px"}} key={index}>{category}</th>
                        ))}
                    </tr>
                </Thead>

                {id.name === "usersPage" && <Tbody>
                        {
                        usersData.slice(pagesVisited, pagesVisited + dataPerPage).filter((val)=> {
                            if(searchTerm === "") {
                                return val
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).map(({id, name, email, office_name, role},index) => (
                            <tr key={index}>
                                <td>{name}</td>
                                <td >{email}</td>
                                <td >{office_name}</td>
                                <td >{role}</td>
                                <td style={{textAllign: "end"}}>
                                    <Button 
                                    bg="#50A8EA" 
                                    padding="5px" 
                                    style={{marginRight: "10px"}}
                                    onClick={()=> {
                                        openEditModal(true)
                                        setUserId(id)
                                    }}>
                                        <FaPenAlt/>
                                    </Button>
                                    <Button 
                                    bg="red" 
                                    padding="5px" 
                                    onClick={()=> {
                                        openDeleteModal(true)
                                        setUserId(id)
                                    }}>
                                        <FaTrashAlt/>
                                    </Button>
                                </td>
                            </tr>
                        ))
                        
                        }
                </Tbody>
                }

{/* DocTypes Table */}
                {id.name === "docTypePage" && <Tbody>
                    {
                        data.slice(pagesVisited, pagesVisited + dataPerPage).filter((val)=> {
                            if(searchTerm === "") {
                                return val
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).map(({office_name}, index) => (
                            <tr key={index}>
                                <td>{office_name}</td>
                                <td style={{width: "50%"}}><Button bg="#50A8EA" padding="5px" style={{marginRight: "10px"}}><FaPenAlt/></Button><Button bg="red" padding="5px"><FaTrashAlt/></Button></td>
                            </tr>
                        ))
                        
                    }
                </Tbody>
                }

{/* Offices Table */}
                {id.name === "offices" && <Tbody>
                    {
                        officeList.slice(pagesVisited, pagesVisited + dataPerPage).filter((val)=> {
                            if(searchTerm === "") {
                                return val
                            } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return val
                            }
                        }).map(({office_name}, index) => (
                            <tr key={index}>
                                <td>{office_name}</td>
                                <td style={{width: "50%"}}><Button bg="#50A8EA" padding="5px" style={{marginRight: "10px"}}><FaPenAlt/></Button><Button bg="red" padding="5px"><FaTrashAlt/></Button></td>
                            </tr>
                        ))
                        
                    }
                </Tbody>
                }
            </TableContainer>
            <PaginationContent>
                {
                id.name === "offices" &&
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageCount={ 
                            officePage
                        }
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                }

                {
                id.name === "usersPage" &&
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageCount={ 
                            usersPage
                        }
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                }

                {/* {
                id.name === "docTypePage" &&
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageCount={ 
                            docTypePage
                        }
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
                } */}
            </PaginationContent>
        </>
    )
}

export default Table