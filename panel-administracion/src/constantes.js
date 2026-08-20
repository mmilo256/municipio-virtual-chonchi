export const ROLES = {
  FUNCIONARIO: 'funcionario',
  ADMINISTRADOR: 'admin',
};

export const NAVEGACION = [
  { label: 'Gestionar funcionarios', href: 'funcionarios', roles: ['admin'] },
  { label: 'Gestionar trámites', href: 'tramites', roles: ['admin'] },
  { label: 'Gestionar formularios', href: 'formularios', roles: ['admin'] },
];
