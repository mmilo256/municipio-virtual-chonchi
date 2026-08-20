import React from 'react';
import InputText from './InputText';
import InputTextarea from './InputTextarea';
import InputSelect from './InputSelect';
import InputFile from './InputFile';
import InputDate from './InputDate';
import InputRadio from './InputRadio';
import InputCheckbox from './InputCheckbox';
import InputCheckboxGroup from './InputCheckboxGroup';
import InputAgenda from './InputAgenda';

const InputRenderer = ({
  etiqueta = '',
  value = '',
  setAgenda,
  fechas = [],
  onChange,
  respuestas = {},
  disabled,
  tipo = 'text',
  slug = '',
  placeholder,
  opciones = '[]',
  mostrarErrores,
  contexto = {},
  obligatorio,
  textoAyuda,
  config = {},
  className,
}) => {
  const visibleWhen = config?.visibleWhen;

  if (visibleWhen) {
    const valorCampoRelacionado = respuestas[visibleWhen.campo_id];
    if (valorCampoRelacionado !== visibleWhen.value) {
      return null;
    }
  }

  switch (tipo) {
    case 'agenda':
      return (
        <InputAgenda
          mostrarErrores={mostrarErrores}
          tipo={tipo}
          fechas={fechas}
          setAgenda={setAgenda}
          etiqueta={etiqueta}
          obligatorio={obligatorio}
          disabled={disabled}
          contexto={contexto}
          textoAyuda={textoAyuda}
          value={value}
          onChange={onChange}
          slug={slug}
          placeholder={placeholder}
          config={config}
          className={className}
        />
      );
    case 'checkboxGroup':
      return (
        <InputCheckboxGroup
          mostrarErrores={mostrarErrores}
          obligatorio={obligatorio}
          tipo={tipo}
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
    case 'checkbox':
      return (
        <InputCheckbox
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
    case 'text':
      return (
        <InputText
          mostrarErrores={mostrarErrores}
          tipo={tipo}
          etiqueta={etiqueta}
          obligatorio={obligatorio}
          disabled={disabled}
          contexto={contexto}
          textoAyuda={textoAyuda}
          value={value}
          onChange={onChange}
          slug={slug}
          placeholder={placeholder}
          config={config}
          className={className}
        />
      );
    case 'date':
      return (
        <InputDate
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
          tipo={tipo}
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
    case 'radio':
      return (
        <InputRadio
          mostrarErrores={mostrarErrores}
          obligatorio={obligatorio}
          tipo={tipo}
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
          contexto={contexto}
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
