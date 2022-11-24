import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./adminPages/ErrorPage";
import Dashboard from "./adminPages/Dashboard";
import Login from "./components/Login";
import UserLogin from "./userPages/Login";
import Sidebar from "./components/Sidebar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { GlobalStyles } from "./GlobalStyles";
import Navbar from "./components/Navbar";
import Users from "./adminPages/Users";
import Office from "./adminPages/Office";
// import AppSetting from './adminPages/AppSetting';
import AccountSetting from "./adminPages/AccountSetting";
import Doctype from "./adminPages/Doctype";
import ResetPassword from "./adminPages/ResetPassword";
import { MainContextProvider } from "./context/MainContext";
import SecuritySetting from "./adminPages/SecuritySetting";
import UsersTable from "./components/UsersTable";
import SecurityQuestions from "./adminPages/SecurityQuestions";
import LandingPage from "./userPages/LandingPage";
import Inquiry from "./userPages/Inquiry";
import UserDashboard from "./userPages/Dashboard";
import AddDocument from "./userPages/AddDocument";
import MyDocuments from "./userPages/Documents";
import OutgoingDoc from "./userPages/OutgoingDoc";
import IncomingDoc from "./userPages/IncomingDoc";
import ReceivedDoc from "./userPages/ReceivedDoc";
import TerminalDoc from "./userPages/TerminalDoc";
import axios from "./api/axios";
// import Layout from "./components/Layout";
// import Document from './adminPages/Documents';

const App = () => {

  const [role, setRole] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:5000/login")
      .then((response) => {
        if (response.data.loggedIn === true) {
          setRole(response.data.userRole);
        } 
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <MainContextProvider>
      <Router>
        <GlobalStyles />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Sidebar />}>
              <Route element={<Navbar />}>
                { role === 'admin' ?
                <>
                  <Route path="/admin-dashboard" element={<Dashboard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/offices" element={<Office />} />
                  <Route path="/account-setting" element={<AccountSetting />} />
                  <Route path="/security-setting" element={<SecuritySetting />} />
                  <Route path="/type" element={<Doctype />} />
                </>
                :
                <>
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/my-documents" element={<MyDocuments />} />
                  <Route path="/outgoingDoc" element={<OutgoingDoc/>} />
                  <Route path="/incomingDoc" element={<IncomingDoc/>} />
                  <Route path="/receivedDoc" element={<ReceivedDoc/>} />
                  <Route path="/terminalDoc" element={<TerminalDoc />} />
                  <Route path="/add-document" element={<AddDocument />} />
                </>
                }
              </Route>
            </Route>
          </Route>
          <Route path="/usertable" element={<UsersTable />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/security-questions" element={<SecurityQuestions />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </MainContextProvider>
  );
};

export default App;
