import React, { useState, useEffect, useMemo, useContext } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../hooks/useFetch";
import { Button, SearchContainer, ClearButton, Input } from "./styles";
import { FaFolderOpen } from "react-icons/fa";
import { EditModal, DeleteModal } from "../../components/Modal";
import MainContext from "../../context/MainContext";

const MyDocumentsTable = ({ showDoc, showHome }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  // const [date, setDate] = useState();
  // const [time, setTime] = useState();
  const user = JSON.parse(localStorage.getItem("userData"));
  const { data, loading, error, fetchData } = useFetch(`/documents/${user.id}`);
  const { setDocId } = useContext(MainContext);

  useEffect(() => {
    fetchData();
  }, []);

    const formatDate = (dateTime) =>{
      const myDate = new Date(dateTime);
      const date = (myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear();
      let hours = myDate.getHours();
      let minutes = myDate.getMinutes();
      
      // Check whether AM or PM
      let newformat = hours >= 12 ? 'PM' : 'AM'; 
      
      // Find current hour in AM-PM Format
      hours = hours % 12; 
      
      // To display "0" as "12"
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0' + minutes : minutes;
  
      const time = hours + ":" + minutes + " " + newformat;

      const createdAt = date + " " + time;

      return createdAt;
    }


  if (error) {
    console.log(error);
  }

  const columns = useMemo(
    () => [
      {
        name: "Tracking ID",
        center: true,
        selector: (row) => row.tracking_id,
        sortable: true,
        wrap: true,
      },
      {
        name: "Document type",
        center: true,
        selector: (row) => row.doctype,
        sortable: true,
        wrap: true
      },
      {
        name: "From",
        center: true,
        selector: (row) => row.owner,
        sortable: true,
        width: "200px",
        wrap: true
      },
      {
        name: "Created At",
        center: true,
        selector: (row) => formatDate(row.datetime_created),
        sortable: true,
      },
      {
        name: "Remarks",
        center: true,
        selector: (row) => row.remarks,
        sortable: true,
        wrap: true
      },
      // {
      //   name: "Status",
      //   center: true,
      //   selector: (row) => (
      //     <>
      //       <p style={{ color: "red", backgroundColor: "#f0f0f0", padding: "5px 10px", borderRadius: "5px"}}>{row.status}</p>
      //     </>
      //   ),
      //   sortable: true,
      // },
      {
        name: "",
        selector: (row) => (
          <>
            <Button
              padding="5px"
              style={{ marginRight: "10px", color: "#50A8EA" }}
              onClick={() => {
                showDoc(true);
                showHome(false);
                setDocId(row.id);
              }}
            >
              <FaFolderOpen/>
              Open
            </Button>
          </>
        ),
        button: true,
      },
    ],
    []
  );

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = data.filter(
    (item) =>
      item.tracking_id &&
      item.tracking_id.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
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
  );
};

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

export default MyDocumentsTable;
