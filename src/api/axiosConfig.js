import axios from "axios";


const api = axios.create({
  baseURL:  "https://documind-backend-fv6f.onrender.com",
  withCredentials: true, 
});

export default api;