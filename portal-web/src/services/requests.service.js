import apiClient from './apiClient';

// Función para obtener el historial de estados de una solicitud específica
export const obtenerSolicitudPorCodigo = async (codigo) => {
  const response = await apiClient.get(`/solicitudes/${codigo}`);
  return response.data;
};

export const fetchRequestById = async (requestId) => {
  try {
    const response = await apiClient.get(`/solicitudes/${requestId}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const fetchDocumentosAdjuntos = async (id) => {
  try {
    const response = await apiClient.get(`/solicitudes/${id}/documents?type=adjunto`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};

// Función para obtener todas las solicitudes realizadas por un usuario dado su ID
export const fetchRequestsByUserId = async (id, page = 1, pageSize = 10) => {
  try {
    // Realiza una solicitud GET para obtener las solicitudes asociadas al ID proporcionado
    const response = await apiClient.get(
      `/solicitudes/user/${id}?page=${page}&pageSize=${pageSize}`,
    );

    // Extrae y devuelve las solicitudes desde la respuesta
    const data = response.data;
    return data;
  } catch (error) {
    // Si ocurre un error, lanza una excepción con el mensaje de error
    console.log(error);
    throw error.message;
  }
};

// Función para enviar una nueva solicitud con los datos proporcionados
export const createRequest = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await apiClient.post(`/requests`, data, config);
  return response.data;
};
