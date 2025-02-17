import axios from "axios";
import { API_URL } from "../constants/constants";

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export default apiClient