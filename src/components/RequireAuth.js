import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const RequireAuth = () => {
    const { auth } = useContext(AuthContext);
    const location = useLocation();
    return (
        auth?.accessToken ? <Outlet /> 
        : <Navigate to={{pathname: "/login", state: {from: location}}} />
    )
}

export default RequireAuth