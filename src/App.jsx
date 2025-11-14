import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


import { useAuth } from "./context/AuthContext";


import Login from "./components/Login";
import Signup from "./components/Signup";
import Extract from "./components/Extract";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; 

function App() {
  
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
 
      <Navbar /> 

      <div className="page-content p-5"> 

        <Routes>
          
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Login />} 
          />
                
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Signup />} 
          />

          <Route
            path="/extract"
            element={
              <ProtectedRoute>
                <Extract />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="*" 
            element={<Navigate to={isLoggedIn ? "/extract" : "/login"} />} 
          />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;