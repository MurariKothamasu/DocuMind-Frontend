import axios from "axios";

// Create an Axios instance
const api = axios.create({
  // Your backend server URL
  baseURL:  "https://documind-backend-fv6f.onrender.com",
  //"https://documind-backend-fv6f.onrender.com",
  // IMPORTANT: This allows cookies to be sent with requests
  withCredentials: true, 
});

export default api;