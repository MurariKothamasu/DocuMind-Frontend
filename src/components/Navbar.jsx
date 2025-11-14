/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

import { DocumentTextIcon, UserCircleIcon } from '@heroicons/react/24/outline';


//Navbar Component
//Dynamic navbar that Shoes Login signup on loginpage or signup page and when loged in it will show user name and logiut option 
//on right side having the logo of application
const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout(); 
  };

  return (
    <nav className="bg-white text-gray-800 p-4 flex justify-between items-center shadow-md">
      
      
      <Link to="/" className="flex items-center gap-2">
        <DocumentTextIcon className="w-8 h-8 text-red-600" />
        <span className="text-2xl font-bold font-display text-gray-900">
          DocuMind
        </span>
      </Link>

      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          
          <>
            
            <span className="font-medium flex items-center gap-2">
              <UserCircleIcon className="w-6 h-6 text-gray-500" />
              Welcome, {user?.firstName}
            </span>
            <motion.button 
              onClick={handleLogout} 
              className="bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-red-700 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          
          <>
            
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link 
                to="/login" 
                className="font-medium text-gray-600 hover:text-red-600 py-2 px-4 rounded transition-colors"
              >
                Login
              </Link>
            </motion.div>
            
            
            <motion.div whileTap={{ scale: 0.98 }}>
              <Link
                to="/signup"
                className="bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-red-700 transition-colors"
              >
                Sign Up
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;