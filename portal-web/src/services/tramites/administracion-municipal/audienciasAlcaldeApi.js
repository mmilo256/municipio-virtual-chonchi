import apiClient from '../../apiClient';

// Función para enviar las respuestas del formulario y obtener el ID de la solicitud
export const crearSolicitud = async (data) => {
  try {
    // Realiza una solicitud POST para enviar la nueva solicitud con los datos proporcionados
    const response = await apiClient.post(`/requests`, data);
    return response.data;
  } catch (error) {
    // Si ocurre un error, lanza una excepción con el mensaje de error
    console.log(error);
    throw error.message;
  }
};
