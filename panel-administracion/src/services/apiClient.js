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
    async (error) => {
        if (error.response) {
            const { status } = await error.response
            if (status === 401 || status === 500) {
                const { setIsAuthenticated, isAuthenticated } = useAuthStore.getState();
                if (isAuthenticated) {
                    setIsAuthenticated(false)
                    try {
                        await axios.post(`${API_URL}/auth/logout`, null, {
                            withCredentials: true
                        })
                        alert("La sesión ha expirado")
                    } catch (e) {
                        console.log(e.message)
                    }
                }
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject("Ha ocurrido un error");
        }
    }
);

export default apiClient;
