import { useState } from 'react';
import { validarCampo } from '../../../utils/validaciones';

const InputCheckboxGroup = ({
  etiqueta,
  disabled,
  mostrarErrores,
  value,
  tipo,
  onChange,
  opciones,
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
      <p className="text-sm font-medium text-slate-500">{etiqueta}</p>
      {!obligatorio && <span className="pl-1 text-slate-400 font-normal">(opcional)</span>}
      <div className="grid grid-cols-3">
        {opciones.map((op) => (
          <label className="flex gap-x-1" key={op.value}>
            <input
              value={op.value}
              onChange={onChange}
              checked={(value || []).includes(op.value)}
              onBlur={() => {
                setTouched(true);
              }}
              id={slug}
              name={slug}
              disabled={disabled}
              type="checkbox"
              placeholder={placeholder}
              minLength={config?.minLength?.value}
              maxLength={config?.maxLength?.value}
              className={`border ${error ? 'outline-red-400' : 'outline-blue-400'} p-2 rounded border-slate-300 ${className}`}
            />
            <span className="text-sm">{op.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </div>
  );
};

export default InputCheckboxGroup;
