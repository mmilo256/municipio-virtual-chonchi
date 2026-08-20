export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api/portal';
export const HOME_URL = import.meta.env.VITE_HOME_URL || 'http://localhost:5173/';
export const LOGOUT_URL =
  import.meta.env.VITE_CLAVEUNICA_LOGOUT_URL ||
  'https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout';

export const ORG_TYPES = [
  'Junta de Vecinos',
  'Comunidad Indígena',
  'Club Deportivo',
  'Fundación',
  'Empresa',
  'Agrupación',
  'Otro',
];

export const PROCEDURES_ID = {
  permisosTransitorios: 1,
  reparacionCaminos: 2,
  fechaEleccionDirectorio: 3,
  actaEleccionDirectorio: 4,
  audienciasAlcalde: 5,
};

// Funcionarios a quienes se les notifica cuando llega una nueva solicitud
export const CORREOS_FUNCIONARIOS = {
  /*   permisosTransitorios: [
    'esoto@municipalidadchonchi.cl',
    'constanzaaguilar@municipalidadchonchi.cl',
  ], */
  permisosTransitorios: ['esoto@municipalidadchonchi.cl'],
  fechaEleccionDirectorio: ['esoto@municipalidadchonchi.cl'],
  actaDirectorio: ['esoto@municipalidadchonchi.cl'],
  audienciasAlcalde: ['esoto@municipalidadchonchi.cl'],
};
