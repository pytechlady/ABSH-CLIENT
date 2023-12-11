import React from 'react'
import Sidebar from '../components/sidenav/Sidebar';
import { Link } from 'react-router-dom';
import DocAppt from '../components/dashboard/DocAppt';
import Logout from '../components/Logout';


const doc_appointments = () => {
    return (
        <Sidebar 
        element={
            <>
            <li className="nav-item">
                              <Link to="/doc_dashboard" className="nav-link align-middle px-0">
                                  <span className="ms-1">Dashboard</span>
                              </Link>
                          </li>
                          <li className="nav-item">
                          <Link to="/doc_appointment" className="nav-link align-middle px-0">
                              <span className="ms-1">My Appointments</span>
                          </Link>
                      </li>
                      {/* <li className="nav-item">
                          <Link to="/book_appointment" className="nav-link align-middle px-0">
                              <span className="ms-1">Book Appointment</span>
                          </Link>
                      </li> */}
                      <li className="nav-item">
                      <Link to="/" className="nav-link align-middle px-0">
                          <Logout />
                      </Link>
                  </li>
                      </>
          }
        main_content={
        <DocAppt />
        }
        />
      )
    }

export default doc_appointments