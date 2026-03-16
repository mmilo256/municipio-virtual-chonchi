import apiClient from './apiClient';

export const obtenerFuncionarios = async () => {
  try {
    const response = await apiClient.get(`/funcionarios`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const obtenerFuncionarioPorId = async (id) => {
  const response = await apiClient.get(`/funcionarios/${id}`);
  return response.data;
};

export const crearFuncionario = async (data) => {
  const response = await apiClient.post('/funcionarios', data);
  return response.data;
};

export const editarFuncionario = async (id, data) => {
  const response = await apiClient.patch(`/funcionarios/${id}`, data);
  return response.data;
};
