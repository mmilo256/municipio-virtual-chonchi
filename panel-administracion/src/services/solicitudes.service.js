import apiClient from './apiClient';

export const solicitarCorreccion = async (codigo, data) => {
  const response = await apiClient.post(`/solicitudes/${codigo}/solicitar-correccion`, data);
  return response.data;
};

export const rechazarSolicitud = async (codigo, data) => {
  const response = await apiClient.post(`/solicitudes/${codigo}/rechazar`, data);
  return response.data;
};

export const aprobarSolicitud = async (codigo, data) => {
  const response = await apiClient.post(`/solicitudes/${codigo}/aprobar`, data);
  return response.data;
};

export const subirDocumentoAsociado = async (codigo, data) => {
  const response = await apiClient.post(`/solicitudes/${codigo}/subir-documento`, data);
  return response.data;
};

export const cambiarEstadoSolicitud = async (codigo, estado) => {
  const response = await apiClient.patch(`/solicitudes/${codigo}`, { estado });
  return response.data;
};

// Obtener todas las solicitudes de un trámite en específico
export const obtenerSolicitudesPermisosTransitorios = async (
  page = 1,
  pageSize = 10,
  filters,
  search = '',
) => {
  let queryString = `/solicitudes/tramite/permisos-transitorios?page=${page}&pageSize=${pageSize}`;

  if (filters) {
    queryString += `&filters=${filters}`;
  }
  if (search !== '') {
    queryString += `&search=${search}`;
  }

  const response = await apiClient.get(queryString);
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

export const agregarSolicitud = async (data) => {
  const response = await apiClient.post(`/solicitudes/agregar`, data);
  return response.data;
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

export const fetchRequestById = async (requestId) => {
  try {
    const response = await apiClient.get(`/requests/${requestId}`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error.message;
  }
};
