import { useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import MainContext from "../context/MainContext";

export default function useFetch(url) {
  // const [data, setData] = useState([])
  // const [error, setError] = useState('')
  // const [loading, setLoading] = useState(false)
  const { data, setData, error, setError, loading, setLoading } =
    useContext(MainContext);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, error, loading, setData, fetchData };
}
