import { useState } from 'react';
import { validarCampo } from '../../utils/validaciones';

const InputSelect = ({
  etiqueta,
  value,
  onChange,
  slug,
  className,
  textoAyuda,
  obligatorio,
  opciones,
  config,
  mostrarErrores,
}) => {
  const [touched, setTouched] = useState(false);

  const error =
    touched || mostrarErrores ? validarCampo('select', value, config, obligatorio) : null;

  return (
    <label htmlFor={slug}>
      <p className="text-sm font-medium text-slate-500 mb-1">
        {etiqueta}{' '}
        {!obligatorio && <span className="pl-1 text-slate-400 font-normal">(opcional)</span>}
      </p>
      <select
        value={value}
        onChange={onChange}
        id={slug}
        name={slug}
        type="select"
        className={`border w-full p-2 rounded border-slate-300 ${className}`}
      >
        <option value="" disabled>
          Seleccionar
        </option>
        {opciones.map((op, index) => (
          <option key={index} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </label>
  );
};

export default InputSelect;
