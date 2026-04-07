import apiClient from './apiClient';

export const obtenerPasoFormularioPorId = async (id) => {
  const response = await apiClient.get(`/pasos-formularios/${id}`);
  return response.data;
};

export const crearPasosFormulario = async (data) => {
  const response = await apiClient.post('/pasos-formularios', data);
  return response.data;
};

export const editarPasosFormulario = async (data) => {
  const response = await apiClient.patch('/pasos-formularios/editar', data);
  return response.data;
};
