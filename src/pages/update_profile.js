import React from 'react'
import Sidebar from '../components/sidenav/Sidebar'
import Profile from '../components/forms/Profile'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout';

const update_profile = () => {
    return (
        <Sidebar 
        element={
         <>
         <li className="nav-item">
                           <Link to="/user_dashboard" className="nav-link align-middle px-0">
                               <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                           </Link>
                       </li>
                       <li className="nav-item">
                       <Link to="/appointments" className="nav-link align-middle px-0">
                           <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">My Appointments</span>
                       </Link>
                   </li>
                   <li className="nav-item">
                       <Link to="/book_appointment" className="nav-link align-middle px-0">
                           <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Book Appointment</span>
                       </Link>
                   </li>
                   <li className="nav-item">
                       <Link to="/user-profile" className="nav-link align-middle px-0">
                           <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">My Profile</span>
                       </Link>
                   </li>
                   <li className="nav-item">
                      <Link to="/" className="nav-link align-middle px-0">
                          <Logout />
                      </Link>
                  </li>
                   </>
       }
       main_content = {
         <Profile />
       }
        />
       )
     }

export default update_profile