import axios from 'axios';
import { API_URL } from '../constants/constants';
import useAuthStore from '../stores/useAuthStore';

// Crear una instancia personalizada de Axios
const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true // Enviar cookies automáticamente
});

apiClient.interceptors.response.use(
    (response) => response, // Maneja respuestas exitosas normalmente
    (error) => {
        if (error.response) {
            const { setSessionExpired, isAuthenticated } = useAuthStore.getState();
            if (isAuthenticated) {
                setSessionExpired(true)
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject("Ha ocurrido un error");
        }
    }
);

export default apiClient;
