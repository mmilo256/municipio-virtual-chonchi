import axios from "axios";
import { API_URL } from "../constants/constants";

export const fetchUserId = async (run) => {
    try {
        const response = await axios.get(`${API_URL}/portal/users?run=${run}`, { withCredentials: true })
        const data = response.data.userId.id
        return data
    } catch (error) {
        throw new Error(error.message);
    }
}