import apiClient from './apiClient';

export const obtenerTramites = async () => {
  const response = await apiClient.get(`/tramites`);
  return response.data;
};

export const obtenerTramitePorId = async (id) => {
  const response = await apiClient.get(`/tramites/${id}`);
  return response.data;
};

export const crearTramite = async (data) => {
  const response = await apiClient.post('/tramites', data);
  return response.data;
};

export const editarTramite = async (id, data) => {
  const response = await apiClient.patch(`/tramites/${id}`, data);
  return response.data;
};
