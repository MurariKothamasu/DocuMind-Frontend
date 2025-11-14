import axios from "axios";


//axios Configeration for Backend Url and withCredentials Must True
const api = axios.create({
  baseURL:  "https://documind-backend-fv6f.onrender.com",
  withCredentials: true, 
});

export default api;