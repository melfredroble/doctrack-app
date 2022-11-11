import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import UserContext from '../context/UserContext'

export const useOfficeList = () => {
    const {officeList, setOfficeList} = useContext(UserContext)

    useEffect(()=>{
        offices()
    },[])

    const offices = ()=>{
        axios.get('http://localhost:5000/offices')
        .then((response)=>{
            setOfficeList(response.data)
            console.log(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

}
