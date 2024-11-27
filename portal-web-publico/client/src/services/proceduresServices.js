import axios from "axios"
import { API_URL } from "../constants/constants"

export const fetchFormInputs = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/procedures/${id}/forms`)
        const data = response.data
        return data.inputs
    } catch (error) {
        throw new Error(`No se pudo obtener los campos del formulario. ${error.message}`)
    }
}

export const fetchAllProcedures = async () => {
    try {
        const response = await axios.get(`${API_URL}/procedures`)
        const data = response.data.procedures
        return data
    } catch (error) {
        throw new Error(`No se pudo obtener los trámites. ${error.message}`);
    }
}

export const fetchProcedureById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/procedures/${id}`)
        const data = response.data.procedure
        return data
    } catch (error) {
        throw new Error(`No se pudo obtener el trámite. ${error.message}`);
    }
}