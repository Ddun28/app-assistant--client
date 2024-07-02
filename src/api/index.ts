import axios from "axios";

const api = axios.create({
  baseURL: "https://server-dev-gkp0.onrender.com",
  headers: {
    "Authorization": "Bearer 123"
  },
});

export default api;