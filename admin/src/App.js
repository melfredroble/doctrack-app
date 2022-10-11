import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Login from './components/Login'
import Sidebar from './components/Sidebar';
import ProtectedRoutes from './components/ProtectedRoutes';
import { GlobalStyles } from './GlobalStyles';
import Navbar from './components/Navbar';
import Users from './pages/Users';
import Office from './pages/Office'
import AppSetting from './pages/AppSetting';
import AccountSetting from './pages/AccountSetting';
import Doctype from './pages/Doctype';
import ResetPassword from './pages/ResetPassword';
import { UserContextProvider } from './context/UserContext';
import SecuritySetting from './pages/SecuritySetting';
// import Document from './pages/Documents';

const App = () => {

    return (
        <UserContextProvider>
            <Router>
                <GlobalStyles />
                <Routes>
                    <Route element={<ProtectedRoutes />}>
                        <Route element={<Sidebar/>}>
                            <Route element={<Navbar/>}>
                                <Route path="/" element={<Dashboard/>} />
                                <Route path="/users" element={<Users/>} />
                                <Route path="/offices" element={<Office/>} />
                                <Route path="/app-setting" element={<AppSetting/>} />
                                <Route path="/account-setting" element={<AccountSetting/>} />
                                <Route path="/security-setting" element={<SecuritySetting/>} />
                                <Route path="/type" element={<Doctype/>} />
                            </Route>
                        </Route>
                    </Route>
                    {/* <Route path="/documents" element={<Document/>} /> */}
                    <Route path="/login" element={<Login/>} />
                    <Route path="/reset-password" element={<ResetPassword/>} />
                    <Route path="*" element={<ErrorPage/>} />
                </Routes>
            </Router>
        </UserContextProvider>
    )
}

export default App