import axios from "axios";
import { API_URL } from "utils/constants";

const api = axios.create({
  baseURL: API_URL,
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
    return null;
  }
);

export const buildAuthorization = (token) => {
  return { Authorization: `Bearer ${token}` };
};

export default api;
