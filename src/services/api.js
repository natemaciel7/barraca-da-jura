import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // muda se seu backend estiver em outro lugar
});

export default api;
