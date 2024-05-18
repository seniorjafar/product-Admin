import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import "./Admin.scss"
import { Outlet } from 'react-router-dom'
import AdminHeader from '../../components/admin-header/AdminHeader';

import { Container } from 'react-bootstrap';

const Admin = () => {
   const [close, setClose] = useState(false)
  return (
    <>
    <Container>
      <div className={`admin ${close ? "close" : ""}`}>
        <Sidebar/> 
        <div>
          <AdminHeader setClose={setClose}/>
          <Outlet/>
        </div>
      </div>
    </Container>
    </>
  )
}

export default Admin