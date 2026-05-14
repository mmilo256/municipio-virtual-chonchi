export const validarCampo = (tipo, valor, config, obligatorio) => {
  switch (tipo) {
    case 'text':
      return validarTexto(valor, config, obligatorio);
    case 'textarea':
      return validarTexto(valor, config, obligatorio);
    case 'email':
      return validarEmail(valor, config, obligatorio);
    case 'phone':
      return validarTelefono(valor, config, obligatorio);
    case 'rut':
      return validarRut(valor, config, obligatorio);
    case 'select':
      return validarSelect(valor, config, obligatorio);
    case 'file':
      return validarFile(valor, config, obligatorio);
    default:
      break;
  }
};

const validarFile = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && !valor) {
    return 'Este campo es obligatorio';
  }

  if (!valor) return null;
  if (!config) return null;
  return null;
};

const validarSelect = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0 || valor === '') return null;

  if (!config) return null;

  if (config.maxLength && valor.length > config.maxLength.value) {
    return config.maxLength.mensaje;
  }

  if (config.regex && config.regex.value) {
    const regex = new RegExp(config.regex.value);
    if (!regex.test(valor)) {
      return config.regex.mensaje;
    }
  }
};

const validarRut = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  if (config.maxLength && valor.length > config.maxLength.value) {
    return config.maxLength.mensaje;
  }

  if (config.regex && config.regex.value) {
    const regex = new RegExp(config.regex.value);
    if (!regex.test(valor)) {
      return config.regex.mensaje;
    }
  }
};

const validarTelefono = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  if (config.maxLength && valor.length > config.maxLength.value) {
    return config.maxLength.mensaje;
  }

  if (config.regex && config.regex.value) {
    const regex = new RegExp(config.regex.value);
    if (!regex.test(valor)) {
      return config.regex.mensaje;
    }
  }
};

const validarEmail = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  if (config.maxLength && valor.length > config.maxLength.value) {
    return config.maxLength.mensaje;
  }

  if (config.regex && config.regex.value) {
    const regex = new RegExp(config.regex.value);
    if (!regex.test(valor)) {
      return config.regex.mensaje;
    }
  }
};

const validarTexto = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  if (config.minLength && valor.length < config.minLength.value) {
    return config.minLength.mensaje;
  }

  if (config.maxLength && valor.length > config.maxLength.value) {
    return config.maxLength.mensaje;
  }

  return null;
};
