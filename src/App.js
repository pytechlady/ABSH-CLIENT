import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Home from './pages/home';
import Register from './pages/auth';
import Login from './pages/auth2';
import StaffLogin from './pages/staff';
import UserDashboard from './pages/user_dashboard';
import UserAppointment from './pages/book_appointment';
import UserAppointments from './pages/appointments';
import DocDashboard from './pages/doc_dashboard';
import DocLogin from './pages/doc_auth';
import DocAppointment from './pages/doc_appointments';
import UserProfile from './pages/update_profile';
import RequireAuth from "./components/RequireAuth";
import UpdateAppt from './pages/update_appointment';
import UpdateAppts from './pages/doc_appt_update';


function App() {
  return (
    <div>
        {/* <BaseNav className="pt-4 pb-4" /> */}
      
      <Router>
      <Nav />
    <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/staff" element={<StaffLogin />}></Route>
    <Route path="/doc_login" element={<DocLogin />}></Route>
   
    <Route element={<RequireAuth />}>
    <Route path="/update-appointments/:appointment_id" element={<UpdateAppts />}></Route>
    <Route path="/update-appointment/:appointment_id" element={<UpdateAppt />}></Route>
    <Route path="/user_dashboard" element={<UserDashboard />}></Route>
    <Route path="/book_appointment" element={<UserAppointment />}></Route>
    <Route path="/appointments" element={<UserAppointments />}></Route>
    <Route path="/doc_dashboard" element={<DocDashboard />}></Route>
    <Route path="/doc_appointment" element={<DocAppointment />}></Route>
    <Route path="/user-profile" element={<UserProfile />}></Route>
    </Route>
    </Routes>
    <Footer />
  </Router>
      
      
      
    </div>
   
   
  );
}

export default App;
