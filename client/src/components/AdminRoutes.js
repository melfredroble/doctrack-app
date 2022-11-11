import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";
import axios from "../api/axios";
import Dashboard from "../userPages/Dashboard";

const AdminRoutes = () => {

    const user = JSON.parse(localStorage.getItem("userData"));

    return user.role === "admin" ? <Outlet /> : <Navigate to={<Dashboard/>}/>;
};

export default AdminRoutes;
