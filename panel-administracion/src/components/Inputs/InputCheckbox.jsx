import { useState } from 'react';
import { validarCampo } from '../../utils/validaciones';

const InputCheckbox = ({
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
    <div>
      <label className="text-sm font-medium text-slate-500 flex items-center gap-2">
        <input
          checked={value}
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
          className={`border ${error ? 'outline-red-400' : 'outline-blue-400'} p-2 rounded border-slate-300 ${className}`}
        />
        <span>{etiqueta}</span>
      </label>
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </div>
  );
};

export default InputCheckbox;
