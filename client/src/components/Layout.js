import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
    return (
        <>
            <Sidebar />
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout