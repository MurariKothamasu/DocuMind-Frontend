import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import the authentication context to check if the user is logged in
import { useAuth } from "./context/AuthContext";

// Import page components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Extract from "./components/Extract";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; 

function App() {
  
  // Get the isLoggedIn status from the global auth context
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
 
      {/* The Navbar will be displayed on every page */}
      <Navbar /> 

      {/* A wrapper for all page content */}
      <div className="page-content p-5"> 

        {/* Routes defines all the pages the app can navigate to */}
        <Routes>
          
          {/* /login page: If logged in, redirect to /extract. Otherwise, show Login. */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Login />} 
          />
                
          {/* /signup page: If logged in, redirect to /extract. Otherwise, show Signup. */}
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Signup />} 
          />

          {/* /extract page: This route is protected. */}
          <Route
            path="/extract"
            element={
              // The ProtectedRoute component will check for a user.
              // If no user, it redirects to /login.
              <ProtectedRoute>
                <Extract />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all route (*): Redirects any unknown URL. */}
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