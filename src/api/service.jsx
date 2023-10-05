import axios from "axios";
import { API_URL } from "./config";

const API_Service = {
  getRequest: () => {
    return axios.get(API_URL);
  },
};
export default API_Service;
