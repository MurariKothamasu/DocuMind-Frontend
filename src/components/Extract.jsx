import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";


// extract Component that take file from dragand Drop and generate summary and key points
const Extract = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); 
  const [summaryLength, setSummaryLength] = useState("medium"); 
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false); 

 
  useEffect(() => {
    return () => {
      if (filePreview && filePreview.startsWith("blob:")) {
        URL.revokeObjectURL(filePreview);
      }
    };
  }, [filePreview]);

  
  const updateFile = (selectedFile) => {
    if (!selectedFile) return;

    setError("");
    setResult(null);

    if (filePreview && filePreview.startsWith("blob:")) {
      URL.revokeObjectURL(filePreview);
    }

    setFile(selectedFile);

    
    if (selectedFile.type.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFilePreview("generic");
    }
  };

  
  const handleFileChange = (e) => {
    updateFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    updateFile(e.dataTransfer.files[0]);
  };

  const handleClearFile = () => {
    setFile(null);
    setFilePreview(null);
    setError("");
    
    document.getElementById('file-upload').value = null;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("length", summaryLength); 

    try {
      const response = await api.post("/extract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (err) {
      console.error("File upload error:", err);
      setError(err.response?.data?.message || "An error occurred during upload.");
    } finally {
      setLoading(false);
    }
  };
  
  
  const tagContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };
  
  const tagItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Hero Text At top Of Page */}
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Unlock Your Documents
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Upload. Summarize. Understand. Fast.
        </p>
      </motion.div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* //Left Grid For File Upload */}
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upload Document
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            
            <div>
              <label className="text-sm font-medium text-gray-900">
                Select Summary Length
              </label>
              <fieldset className="mt-2">
                <div className="flex items-center space-x-4">
                  {['short', 'medium', 'large'].map((length) => (
                    <div key={length} className="flex items-center">
                      <input
                        id={length}
                        name="summary-length"
                        type="radio"
                        value={length}
                        checked={summaryLength === length}
                        onChange={(e) => setSummaryLength(e.target.value)}
                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                      />
                      <label htmlFor={length} className="ml-2 block text-sm text-gray-700 capitalize">
                        {length}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            
            
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${isDragOver ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold text-red-600">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG, JPEG</p>
                </div>
              ) : (
                
                <div className="relative flex items-center justify-center w-full h-full p-4">
                  {file.type.startsWith("image/") ? (
                    <img src={filePreview} alt="Selected file preview" className="object-contain max-w-full max-h-full rounded-md" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd"></path><path d="M6 12a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM6 9a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zM7 6a1 1 0 100 2h6a1 1 0 100-2H7z"></path></svg>
                      <p className="mt-2 text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</p>
                    </div>
                  )}
                </div>
              )}
              <input id="file-upload" name="file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"/>
            </label>

            
            {error && (
              <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            
            <div className="flex gap-4">
              <motion.button
                type="submit"
                disabled={loading || !file}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed
                           shadow-md"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {loading ? "Processing..." : "Extract Data"}
              </motion.button>
              
              {file && !loading && (
                <motion.button
                  type="button"
                  onClick={handleClearFile}
                  className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                             shadow-md"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                >
                  Clear
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        
        <motion.div 
          className="bg-white p-8 rounded-lg shadow-lg lg:col-span-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Extraction Results
          </h2>
          
          <AnimatePresence mode="wait">
            
            
            {loading && (
              <motion.div
                key="loader"
                className="flex items-center justify-center h-full min-h-[300px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              </motion.div>
            )}

          
            {!loading && !result && (
              <motion.div
                key="placeholder"
                className="flex items-center justify-center h-full min-h-[300px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-gray-500">Upload a file to see the results here.</p>
              </motion.div>
            )}

            {/* //Summarized Div on the right Side */}
            {result && (
              <motion.div
                key="results"
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                

                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Summary
                  </h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                    {result.text}
                  </p>
                </div>

                
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Key Points
                  </h3>
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={tagContainerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {result.keyPoints.map((point, index) => (
                      <motion.span 
                        key={index} 
                        className="bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full"
                        variants={tagItemVariants} 
                      >
                        {point}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </div>
  );
};

export default Extract;