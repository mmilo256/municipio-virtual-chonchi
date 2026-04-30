import apiClient from './apiClient';

export const cambiarEstadoSolicitud = async (codigo, estado) => {
  const response = await apiClient.patch(`/solicitudes/${codigo}`, { estado });
  return response.data;
};

// Obtener todas las solicitudes de un trámite en específico
export const obtenerSolicitudesPorTramite = async (
  slug,
  page = 1,
  pageSize = 10,
  filters,
  search = '',
) => {
  let queryString = `/solicitudes/tramite/${slug}?page=${page}&pageSize=${pageSize}`;

  if (filters) {
    queryString += `&filters=${filters}`;
  }
  if (search !== '') {
    queryString += `&search=${search}`;
  }

  const response = await apiClient.get(queryString);
  return response.data;
};

// Obtener el detalle de una solicitud por su código
export const obtenerSolicitudPorCodigo = async (codigo) => {
  const response = await apiClient.get(`/solicitudes/${codigo}`);
  return response.data;
};

// Función para enviar una nueva solicitud con los datos proporcionados
export const adjuntarDocumento = async (data, solicitudId) => {
  try {
    // Realiza una solicitud POST para enviar la nueva solicitud con los datos proporcionados
    const response = await apiClient.post(`/requests/${solicitudId}/adjuntar-documento`, data);
    return response.data;
  } catch (error) {
    // Si ocurre un error, lanza una excepción con el mensaje de error
    console.log(error);
    throw error.message;
  }
};

export const crearSolicitud = async (requestData) => {
  try {
    const response = await apiClient.post(`/requests`, requestData);
    const data = response.data;
    return data;
  } catch (e) {
    throw e.message;
  }
};

export const borrarDocumentoAsociado = async (solicitudId, documentoId) => {
  try {
    await apiClient.delete(`/requests/${solicitudId}/documentos-asociados/${documentoId}`);
  } catch (error) {
    throw error.message;
  }
};

export const fetchDocumentosAsociados = async (id) => {
  try {
    const response = await apiClient.get(`/requests/${id}/documents?type=subido`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const fetchDocumentosAdjuntos = async (id) => {
  try {
    const response = await apiClient.get(`/requests/${id}/documents?type=adjunto`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const subirDocumentoAsociado = async (id, data, status = null, type = null, name = null) => {
  let queries = {};
  if (status) {
    queries.status = status;
  }
  if (type) {
    queries.type = type;
  }
  if (name) {
    queries.name = name;
  }

  const queryString = new URLSearchParams(queries).toString();

  try {
    await apiClient.post(`/requests/${id}/documents?${queryString}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    throw error.message;
  }
};

export const fetchRequestById = async (requestId) => {
  try {
    const response = await apiClient.get(`/requests/${requestId}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};
