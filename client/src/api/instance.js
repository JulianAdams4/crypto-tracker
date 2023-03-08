import axios from "axios";
import { REACT_APP_API_URL } from "utils/constants";

const api = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return error.response;
  }
);

export default api;
