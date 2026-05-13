import React from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputFile from './InputFile';

const InputRenderer = ({
  etiqueta = '',
  value = '',
  onChange,
  disabled,
  tipo = 'text',
  slug = '',
  placeholder,
  opciones = '[]',
  mostrarErrores,
  obligatorio,
  textoAyuda,
  config = [],
  className,
}) => {
  switch (tipo) {
    case 'text':
      return (
        <InputText
          mostrarErrores={mostrarErrores}
          tipo={tipo}
          etiqueta={etiqueta}
          obligatorio={obligatorio}
          disabled={disabled}
          textoAyuda={textoAyuda}
          value={value}
          onChange={onChange}
          slug={slug}
          placeholder={placeholder}
          config={config}
          className={className}
        />
      );
    case 'textarea':
      return (
        <InputTextarea
          mostrarErrores={mostrarErrores}
          tipo={tipo}
          etiqueta={etiqueta}
          textoAyuda={textoAyuda}
          disabled={disabled}
          obligatorio={obligatorio}
          value={value}
          onChange={onChange}
          slug={slug}
          placeholder={placeholder}
          config={config}
          className={className}
        />
      );
    case 'select':
      return (
        <InputSelect
          mostrarErrores={mostrarErrores}
          etiqueta={etiqueta}
          obligatorio={obligatorio}
          disabled={disabled}
          value={value}
          onChange={onChange}
          textoAyuda={textoAyuda}
          slug={slug}
          config={config}
          opciones={JSON.parse(opciones)}
          className={className}
        />
      );
    case 'file':
      return (
        <InputFile
          mostrarErrores={mostrarErrores}
          obligatorio={obligatorio}
          disabled={disabled}
          textoAyuda={textoAyuda}
          etiqueta={etiqueta}
          config={config}
          slug={slug}
          opciones={JSON.parse(opciones)}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return (
        <InputText
          mostrarErrores={mostrarErrores}
          etiqueta={etiqueta}
          textoAyuda={textoAyuda}
          obligatorio={obligatorio}
          disabled={disabled}
          tipo={tipo}
          value={value}
          onChange={onChange}
          slug={slug}
          placeholder={placeholder}
          config={config}
          className={className}
        />
      );
  }
};

export default InputRenderer;
