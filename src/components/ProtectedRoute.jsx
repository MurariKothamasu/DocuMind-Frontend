import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


//protected Route that check for user login and if not loged in it will redirect to /login page
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;