import { createContext, useState, useCallback, useEffect } from "react";
import Axios from "axios";
import axios from "../api/axios";
// import UserDispatchContext from "./UserDispatchContext";
const MainContext = createContext();

export const MainContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [id, setId] = useState(null);
  const [userName, setUserName] = useState([]);
  const [userEmail, setUserEmail] = useState([]);
  const [userOffice, setUserOffice] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState([]);
  const [currOffice, setCurrOffice] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [usersName, setUsersName] = useState("");
  const [usersId, setUsersId] = useState();
  const [docId, setDocId] = useState();
  const [answers, setAnswers] = useState("");
  const [showToast, setShowToast] = useState(false);

  Axios.defaults.withCredentials = true;

  // Fetch Users
  // useEffect(() => {
  //     userList();
  // }, [])

  const userList = useCallback(() => {
    Axios.get("http://localhost:5000/users")
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // Fetch User Admin

  const fetchAdmin = useCallback(() => {
    const requestOne = Axios.get("http://localhost:5000/users/admin");
    const requestTwo = Axios.get("http://localhost:5000/offices");

    Axios.all([requestOne, requestTwo])
      .then(
        Axios.spread((...responses) => {
          setUserName(responses[0].data[0].name);
          setUserEmail(responses[0].data[0].email);
          setUserOffice(responses[0].data[0].office_id);
          setOffices(responses[1].data);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetchUsersName();
  }, []);

  const fetchUsersName = () => {
    Axios.get("http://localhost:5000/users/admin").then((response) => {
      if (response.status === 200) {
        setUsersName(response.data[0].name);
        setUsersId(response.data[0].id);
      }
    });
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = () => {
    Axios.get("http://localhost:5000/security/answers-list").then(
      (response) => {
        if (response) {
          setAnswers(response.data);
        }
      }
    );
  };

  const user = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getCurrOffice();
  }, []);

  const getCurrOffice = () => {
    user &&
      axios.get(`/offices/${user.office_id}`).then((response) => {
        setCurrOffice(response.data[0].office_name);
      });
  };

  const state = {
    id,
    userId,
    usersData,
    userName,
    userEmail,
    userList,
    data,
    error,
    userOffice,
    offices,
    isAuth,
    isValidated,
    setIsValidated,
    setIsAuth,
    setOffices,
    setUserName,
    setUserEmail,
    setError,
    loading,
    setId,
    setLoading,
    setData,
    setUserId,
    setUsersData,
    setUserOffice,
    fetchAdmin,
    usersName,
    fetchUsersName,
    setUsersName,
    answers,
    setAnswers,
    fetchAnswers,
    currOffice,
    setCurrOffice,
    getCurrOffice,
    usersId,
    setUsersId,
    docId,
    setDocId,
    showToast, 
    setShowToast
  };

  // const dispatch = {
  //     setIsAuth,
  //     setUserId,
  //     setUserData,
  //     setUserInfo,
  //     setShowMessage,
  //     setMessage
  // }

  return (
    // <UserDispatchContext.Provider value={dispatch}>
    <MainContext.Provider value={state}>{children}</MainContext.Provider>
    // </UserDispatchContext.Provider>
  );
};

export default MainContext;
