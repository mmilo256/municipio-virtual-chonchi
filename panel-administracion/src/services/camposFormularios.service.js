import apiClient from './apiClient';

export const crearCamposFormulario = async (data) => {
  const response = await apiClient.post('/campos-formularios', data);
  return response.data;
};
