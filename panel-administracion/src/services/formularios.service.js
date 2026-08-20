import apiClient from './apiClient';

export const obtenerFormularioPorId = async (id) => {
  const response = await apiClient.get(`/formularios/${id}`);
  return response.data;
};

export const obtenerFormularios = async () => {
  const response = await apiClient.get('/formularios');
  return response.data;
};

export const crearFormulario = async (data) => {
  const response = await apiClient.post('/formularios', data);
  return response.data;
};

export const editarFormulario = async (id, data) => {
  const response = await apiClient.patch(`/formularios/${id}`, data);
  return response.data;
};
