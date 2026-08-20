import apiClient from './apiClient';

// Función para obtener todos los trámites disponibles
export const obtenerTramites = async (direccion_id, busqueda) => {
  const params = new URLSearchParams();
  if (direccion_id) {
    params.append('direccion_id', direccion_id);
  }
  if (busqueda) {
    params.append('busqueda', busqueda);
  }
  const response = await apiClient.get(`/tramites?${params.toString()}`);
  const data = response.data;
  return data;
};

export const obtenerTramitePorSlug = async (slug) => {
  const response = await apiClient.get(`/tramites/slug/${slug}`);
  return response.data;
};

export const obtenerFormularioDelTramite = async (slug) => {
  const response = await apiClient.get(`/tramites/${slug}/formulario`);
  return response.data;
};

// Función para obtener un trámite específico por su ID
export const fetchProcedureById = async (id) => {
  try {
    // Realiza una solicitud GET para obtener los detalles de un trámite específico por ID
    const response = await apiClient.get(`/procedures/${id}`);

    // Extrae y devuelve el trámite desde la respuesta
    const data = response.data;
    return data;
  } catch (error) {
    // Si ocurre un error, muestra el mensaje de error y cierra la sesión
    console.log(error);
    throw error.message;
  }
};
