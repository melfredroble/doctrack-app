import React, { useEffect, useMemo, useContext } from "react";
import DataTable from "react-data-table-component";
import useFetch from "../../hooks/useFetch";
import { Button, SearchContainer, ClearButton, Input } from "./styles";
import { FaFolderOpen } from "react-icons/fa";
import MainContext from "../../context/MainContext";

const ReceivedDocTable = ({ showDoc, showHome }) => {
    const user = JSON.parse(localStorage.getItem("userData"));
    const { data, loading, fetchData } = useFetch(`/documents/receivedDoc/${user.office_id}`);
    const { setDocId } = useContext(MainContext);

    useEffect(() => {
        fetchData();
    }, []);


    const columns = useMemo(
        () => [
        {
            name: "Tracking ID",
            center: true,
            selector: (row) => row.tracking_id,
            sortable: true,
        },
        {
            name: "Document type",
            center: true,
            selector: (row) => row.doctype,
            sortable: true,
        },
        {
            name: "From",
            center: true,
            selector: (row) => row.owner,
            sortable: true,
            width: "200px"
        },
        {
            name: "Status",
            center: true,
            selector: (row) => (
            <>
                <p style={{ color: "red" }}>{row.status}</p>
            </>
            ),
            sortable: true,
        },
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

export default ReceivedDocTable;
