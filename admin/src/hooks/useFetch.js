import { useContext, useEffect} from "react"
import axios from "../api/axios"
import UserContext from "../context/MainContext"

export default function useFetch(url){

    const {data, setData,  error, setError, loading, setLoading} = useContext(UserContext)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () =>{
        setLoading(true)
        axios.get(url)
        .then((response) => {
            setData(response.data)
            setLoading(false)
        })
        .catch(error => setError(error))
        .finally(()=>{
            setLoading(false)
        })
    }

    return { data, error, loading, fetchData, setData }

}