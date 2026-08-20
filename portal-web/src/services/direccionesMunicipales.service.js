import apiClient from './apiClient';

export const obtenerDireccionesMunicipales = async () => {
  const response = await apiClient.get(`/direcciones-municipales`);
  return response.data;
};
