import React, { createContext, useState, useContext , useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const checkAuthOnLoad = async () => {
      try {
        // Call the new /me endpoint to check for a valid cookie
        const response = await api.get("/me");
        setUser(response.data); // Set user if cookie is valid
      } catch (error) {
        // No valid cookie, or server error
        setUser(null);
      } finally {
        // Done checking, allow app to render
        setLoading(false);
      }
    };

    checkAuthOnLoad();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      setUser(response.data);
      navigate("/extract"); 
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      
      throw new Error(error.response?.data || "Invalid credentials"); 
    }
  };

  const signup = async (firstName, lastName, email, password) => {
    try {
      const response = await api.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      setUser(response.data);
      navigate("/extract"); 
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
     
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  
  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      navigate("/login"); 
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      
      setUser(null);
      navigate("/login");
    }
  };


  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};