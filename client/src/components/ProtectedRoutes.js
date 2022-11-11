import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../api/axios";
import Login from "./Login";

const ProtectedRoutes = () => {
  const navigate = useNavigate("");
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setIsAuth]);

  return isAuth && <Outlet />;
};

export default ProtectedRoutes;
