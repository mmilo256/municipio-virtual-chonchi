export const API_URL = 'http://localhost:10000/api/portal';
export const HOME_URL = 'http://localhost:10000/';
/* export const API_URL = 'https://municipiovirtualchonchi.cl/api/portal';
export const HOME_URL = 'https://municipiovirtualchonchi.cl/'; */
export const LOGOUT_URL = 'https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout';

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
};

// Funcionarios a quienes se les notifica cuando llega una nueva solicitud
export const CORREOS_FUNCIONARIOS = {
  /* permisosTransitorios: [
    'esoto@municipalidadchonchi.cl',
    'constanzaaguilar@municipalidadchonchi.cl',
  ], */
  permisosTransitorios: ['esoto@municipalidadchonchi.cl'],
  fechaEleccionDirectorio: ['esoto@municipalidadchonchi.cl'],
  actaDirectorio: ['esoto@municipalidadchonchi.cl'],
};
