import React, {useMemo} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import DataTable from "react-data-table-component";
import axios from '../../api/axios';
import MainContext from '../../context/MainContext';
import useFetch from '../../hooks/useFetch';

const Transactions = () => {

    const {docId} = useContext(MainContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(()=>{
        setLoading(true)
        axios.get(`/documents/transactions/${docId}`)
        .then((response)=>{
            setData(response.data);
        })
        .catch((error)=>console.log(error))
        .finally(()=>setLoading(false))
    },[docId])

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
            name: "Actions",
            center: true,
            selector: (row) => row.actions,
            sortable: true,
            wrap: true,
        },
        {
            name: "Office",
            center: true,
            selector: (row) => row.office,
            sortable: true,
            wrap: true,
        },
        {
            name: "Date and Time",
            center: true,
            selector: (row) => formatDate(row.datetime),
            sortable: true,
            wrap: true,
        },
        {
            name: "Remarks",
            center: true,
            selector: (row) => row.new_remarks,
            sortable: true,
            wrap: true,
        },
        ],
        []
    );


    return (
        <>
            <h1>Transaction History</h1>
            <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            striped
            highlightOnHover
            persistTableHead
            />
        </>
    )
}

export default Transactions