import axios from "axios"
import { API_URL } from "../constants/constants"
import { logout } from "./authServices"

export const fetchFormInputs = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/portal/procedures/${id}/forms`, { withCredentials: true })
        const data = response.data
        return data.inputs
    } catch (error) {
        console.log(error.message)
        logout()
    }
}

export const fetchAllProcedures = async () => {
    try {
        const response = await axios.get(`${API_URL}/portal/procedures`, { withCredentials: true })
        const data = response.data.procedures
        return data
    } catch (error) {
        console.log(error.message)
        logout()
    }
}

export const fetchProcedureById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/portal/procedures/${id}`, { withCredentials: true })
        const data = response.data.procedure
        return data
    } catch (error) {
        console.log(error.message)
        logout()
    }
}