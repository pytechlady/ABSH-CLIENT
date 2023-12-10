import React, { useContext } from 'react';
import AuthContext from '../context/AuthProvider';
// import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setAuth } = useContext(AuthContext); 
//   const navigate = useNavigate(); 

  const handleLogout = () => {
    setAuth({ user_id: null, accessToken: null, username: null, password: null });
    // navigate("/login", { replace: true });
  };

  return (
    <button className='btn btn-primary' onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
