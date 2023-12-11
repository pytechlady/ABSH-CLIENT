import React from 'react'
import Appointment from '../components/forms/Appointment'
import Sidebar from '../components/sidenav/Sidebar'
import { Link } from 'react-router-dom';
import Logout from '../components/Logout';

const book_appointment = () => {
  return (
    <Sidebar 
    element={
      <>
      <li className="nav-item">
                        <Link to="/user_dashboard" className="nav-link align-middle px-0">
                            <span className="ms-1">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link to="/appointments" className="nav-link align-middle px-0">
                        <span className="ms-1">My Appointments</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/book_appointment" className="nav-link align-middle px-0">
                        <span className="ms-1">Book Appointment</span>
                    </Link>
                </li>
                <li className="nav-item">
                       <Link to="/user-profile" className="nav-link align-middle px-0">
                           <span className="ms-1">My Profile</span>
                       </Link>
                   </li>
                   <li className="nav-item">
                      <Link to="/" className="nav-link align-middle px-0">
                          <Logout />
                      </Link>
                  </li>
                </>
    }
    main_content={
      <Appointment />
    }
    />
  )
}

export default book_appointment