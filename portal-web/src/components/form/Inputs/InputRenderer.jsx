import React from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputFile from './InputFile';

const InputRenderer = ({
  etiqueta,
  value,
  onChange,
  tipo,
  slug,
  placeholder,
  opciones,
  obligatorio,
  textoAyuda,
  config,
  className,
}) => {
  switch (tipo) {
    case 'text':
      return (
        <InputText
          tipo={tipo}
          etiqueta={etiqueta}
          obligatorio={obligatorio}
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
          tipo={tipo}
          etiqueta={etiqueta}
          textoAyuda={textoAyuda}
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
          etiqueta={etiqueta}
          obligatorio={obligatorio}
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
          obligatorio={obligatorio}
          textoAyuda={textoAyuda}
          etiqueta={etiqueta}
          config={config}
          slug={slug}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return (
        <InputText
          etiqueta={etiqueta}
          textoAyuda={textoAyuda}
          obligatorio={obligatorio}
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
