import apiClient from './apiClient';

export const obtenerFormularios = async () => {
  const response = await apiClient.get('/formularios');
  return response.data;
};
