import { useState } from 'react';
import { validarCampo } from '../../../utils/validaciones';

const InputText = ({
  etiqueta,
  disabled,
  mostrarErrores,
  value,
  tipo,
  onChange,
  slug,
  placeholder,
  obligatorio,
  textoAyuda,
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
      <input
        value={value}
        onChange={onChange}
        onBlur={() => {
          setTouched(true);
        }}
        id={slug}
        name={slug}
        disabled={disabled}
        type={tipo}
        placeholder={placeholder}
        minLength={config?.minLength?.value}
        maxLength={config?.maxLength?.value}
        className={`border ${error ? 'outline-red-400' : 'outline-blue-400'} w-full p-2 rounded border-slate-300 ${className}`}
      />
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </label>
  );
};

export default InputText;
