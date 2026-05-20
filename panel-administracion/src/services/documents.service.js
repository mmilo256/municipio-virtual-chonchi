import { API_URL } from '../../config.js';
import apiClient from './apiClient.js';

export const borrarDocumento = async (id) => {
  const response = await apiClient.delete(`/documentos/${id}`);
  return response.data;
};

export const downloadDocumentService = (id) => {
  try {
    window.open(`${API_URL}/documents/${id}/download`);
  } catch (error) {
    console.log(error);
    throw error.message;
  }
};
