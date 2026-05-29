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
    case 'date':
      return validarDate(valor, config, obligatorio);
    case 'time':
      return validarTime(valor, config, obligatorio);
    case 'radio':
      return validarRadio(valor, config, obligatorio);
    case 'checkbox':
      return validarCheckbox(valor, config, obligatorio);
    case 'checkboxGroup':
      return validarCheckboxGroup(valor, config, obligatorio);
    default:
      break;
  }
};

const validarCheckboxGroup = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length === 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length === 0) return null;
  if (!config) return null;
  return null;
};

const validarCheckbox = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && !valor) {
    return 'Este campo es obligatorio';
  }

  if (!valor) return null;
  if (!config) return null;
  return null;
};

const validarRadio = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && !valor) {
    return 'Este campo es obligatorio';
  }

  if (!valor) return null;
  if (!config) return null;
  return null;
};

const validarDate = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  const fecha = new Date(valor);

  if (isNaN(fecha.getTime())) {
    return 'Fecha inválida';
  }

  if (config.min) {
    const fechaMin = new Date(config.min.value);

    if (fecha < fechaMin) {
      return config.min.mensaje;
    }
  }

  if (config.max) {
    const fechaMax = new Date(config.max.value);

    if (fecha > fechaMax) {
      return config.max.mensaje;
    }
  }

  return null;
};

const validarTime = (valor = '', config = {}, obligatorio) => {
  if (obligatorio && valor.length <= 0) {
    return 'Este campo es obligatorio';
  }

  if (valor.length <= 0) return null;

  if (!config) return null;

  const timeToMinutes = (hora) => {
    const [h, m] = hora.split(':').map(Number);
    return h * 60 + m;
  };

  const hora = timeToMinutes(valor);

  if (config.min) {
    const min = timeToMinutes(config.min.value);

    if (hora < min) {
      return config.min.mensaje;
    }
  }

  if (config.max) {
    const max = timeToMinutes(config.max.value);

    if (hora > max) {
      return config.max.mensaje;
    }
  }

  return null;
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
  valor = valor || '';

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

  return null;
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
