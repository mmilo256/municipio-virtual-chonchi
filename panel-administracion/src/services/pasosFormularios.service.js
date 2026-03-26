import apiClient from './apiClient';

export const crearPasosFormulario = async (data) => {
  const response = await apiClient.post('/pasos-formularios', data);
  return response.data;
};
