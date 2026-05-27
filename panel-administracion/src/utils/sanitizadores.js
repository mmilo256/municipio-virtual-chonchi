export const sanitizarValor = (campo, valor) => {
  if (typeof valor !== 'string') return valor;

  // Teléfono: Sólo números y +
  if (campo.tipo === 'phone') {
    let sanitizado = valor.replace(/[^0-9+]/g, '');
    return sanitizado;
  }

  // RUT: sólo números y K
  if (campo.tipo === 'rut') {
    let sanitizado = valor.replace(/[^0-9kK-]/g, '');
    return sanitizado;
  }

  return valor;
};
