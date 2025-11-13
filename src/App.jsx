import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 1. Import your auth context hook
import { useAuth } from "./context/AuthContext";

// 2. Import your components
import Login from "./components/Login";
import Signup from "./components/Signup";
import Extract from "./components/Extract";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar"; // <-- Import the Navbar

function App() {
  // 3. Get auth state from the context
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      
      {/* 4. Render the Navbar at the top so it's on every page */}
      <Navbar /> 

      {/* 5. A wrapper for your page content */}
      <div className="page-content p-5"> {/* Added Tailwind padding for content */}
        
        {/* 6. Define all your application routes */}
        <Routes>
          
          {/* Public Routes */}
          
          {/* If logged in, redirect from /login to /extract. Otherwise, show Login */}
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Login />} 
          />
          
          {/* If logged in, redirect from /signup to /extract. Otherwise, show Signup */}
          <Route 
            path="/signup" 
            element={isLoggedIn ? <Navigate to="/extract" /> : <Signup />} 
          />

          {/* Protected Route */}
          
          {/* Use ProtectedRoute to guard /extract. It will redirect to /login if not auth'd */}
          <Route
            path="/extract"
            element={
              <ProtectedRoute>
                <Extract />
              </ProtectedRoute>
            }
          />
          
          {/* Default Route */}
          
          {/* Any other path (*) redirects to /extract if logged in, or /login if not */}
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