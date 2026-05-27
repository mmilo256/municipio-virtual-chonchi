import { useState } from 'react';
import { validarCampo } from '../../utils/validaciones';

const InputTextarea = ({
  etiqueta,
  value,
  onChange,
  slug,
  placeholder,
  mostrarErrores,
  tipo,
  textoAyuda,
  obligatorio,
  config,
  className,
}) => {
  const [touched, setTouched] = useState(false);

  const error = touched || mostrarErrores ? validarCampo(tipo, value, config, obligatorio) : null;

  return (
    <label htmlFor={slug}>
      <p className="text-sm font-medium text-slate-500 mb-1">
        {etiqueta}{' '}
        {!obligatorio && <span className="pl-1 text-slate-400 font-normal">(opcional)</span>}
      </p>
      <textarea
        value={value}
        onBlur={() => {
          setTouched(true);
        }}
        onChange={onChange}
        id={slug}
        name={slug}
        placeholder={placeholder}
        minLength={config?.minLength?.value}
        maxLength={config?.maxLength?.value}
        className={`border ${error ? 'outline-red-400' : 'outline-blue-400'} w-full mb-0 p-2 rounded border-slate-300 ${className}`}
      />
      <div className="flex justify-between">
        {error ? (
          <span className="text-xs text-red-500">{error}</span>
        ) : (
          <span className="text-xs text-slate-500">{textoAyuda}</span>
        )}
        <span className="text-xs text-slate-500">
          {value.length}/{config?.maxLength?.value && JSON.parse(config?.maxLength?.value)}
        </span>
      </div>
    </label>
  );
};

export default InputTextarea;
