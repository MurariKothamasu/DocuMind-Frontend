/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // 1. Import AnimatePresence
// 2. Import icons for the checklist
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";


//signup Component 
//take firstname , last name emial password nad for password it have a cretieria also when the cretia meets it will allow user to signup and takes to extract page
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // --- 3. State for password validation ---
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [criteria, setCriteria] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    length: false,
  });

  const { signup } = useAuth();

  // useEffect to validate password on change
  useEffect(() => {
    setCriteria({
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      length: password.length >= 8,
    });
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Check if all criteria are met before submitting
    const allCriteriaMet = Object.values(criteria).every(Boolean);
    if (!allCriteriaMet && password.length > 0) { // Only show if user tried to type
      setError("Password does not meet all criteria.");
      return;
    }
    
    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    
    try {
      await signup(firstName, lastName, email, password);
    } catch (err) {
      setError(err.message);
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Helper component for the criteria list item
  const CriteriaItem = ({ label, met }) => (
    <motion.li 
      className={`flex items-center text-sm ${met ? 'text-green-600' : 'text-gray-500'} transition-colors`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {met ? 
        <CheckCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" /> : 
        <XCircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
      }
      {label}
    </motion.li>
  );

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      
      <motion.div 
        className="max-w-4xl w-full bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
       
        <div className="hidden md:flex md:flex-col md:justify-between bg-red-600 p-12 text-white">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Join DocuMind Today!
            </h2>
            <p className="text-red-100 text-lg">
              Unlock the power of instant document summarization and key point extraction. Get started in seconds.
            </p>
          </motion.div>
          
          
          <motion.div 
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            DocuMind
          </motion.div>
        </div>

        
        <div className="p-8 md:p-12">
          
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
                Sign In
              </Link>
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
             
              <div>
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="last-name" className="sr-only">Last Name</label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {/* --- 7. Updated Password Input --- */}
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
            </div>

            {/* --- 8. Animated Password Criteria List --- */}
            <AnimatePresence>
              {isPasswordFocused && (
                <motion.div
                  className="bg-gray-50 p-4 rounded-md"
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-1">
                    <CriteriaItem label="At least 8 characters" met={criteria.length} />
                    <CriteriaItem label="One lowercase letter (a-z)" met={criteria.lowercase} />
                    <CriteriaItem label="One uppercase letter (A-Z)" met={criteria.uppercase} />
                    <CriteriaItem label="One number (0-9)" met={criteria.number} />
                    <CriteriaItem label="One special character" met={criteria.specialChar} />
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="h-4">
              {error && (
                <div className="text-red-600 text-sm text-left">
                  {error}
                </div>
              )}
            </div>

            
            <div>
              <motion.button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400
                           shadow-md hover:shadow-lg transition-all"
                whileTap={{ scale: 0.98 }} 
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </motion.button>
            </div>
          </form>
          
        </div>
        
      </motion.div>
    </div>
  );
};

export default Signup;