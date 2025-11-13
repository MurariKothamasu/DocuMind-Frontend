import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // Your backend server URL
  baseURL: "http://localhost:3000",
  
  // IMPORTANT: This allows cookies to be sent with requests
  withCredentials: true, 
});

export default api;