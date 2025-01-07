import axios from 'axios';
import { API_URL } from '../constants/constants';

// Crear una instancia personalizada de Axios
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true // Enviar cookies automáticamente
});

// Interceptor para manejar errores globales
apiClient.interceptors.response.use(
    (response) => response, // Devolver la respuesta si es exitosa
    (error) => error
);

export default apiClient;
