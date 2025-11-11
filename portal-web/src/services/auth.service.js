import apiClient from './apiClient';

// Función para cerrar sesión del usuario
export const logout = async () => {
  try {
    // Realiza una solicitud POST al endpoint '/portal/auth/logout' para cerrar sesión en el backend
    await apiClient.post('/auth/logout');
  } catch (error) {
    // Si ocurre un error durante el cierre de sesión, lo imprime en la consola
    throw error.message;
  }
};

export const verifySession = async () => {
  try {
    const response = await apiClient.get('/auth/session');
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
