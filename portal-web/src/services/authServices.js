import axios from "axios"
import { API_URL, HOME_URL, LOGOUT_URL } from "../constants/constants"

export const verifyToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/portal/auth/protected`, { withCredentials: true })
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export const logout = async () => {
    try {
        await fetch(`${API_URL}/portal/auth/logout`, {
            method: "POST",
            credentials: 'include'
        })
    } catch (error) {
        console.log(error)
    } finally {
        sessionStorage.removeItem('session')
        window.location.href = LOGOUT_URL
        setTimeout(() => {
            window.location.href = HOME_URL
        }, 1000);
    }

}