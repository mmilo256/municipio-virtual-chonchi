import { useRef } from 'react';
import { validarCampo } from '../../utils/validaciones';

const InputFile = ({
  etiqueta,
  slug,
  value,
  textoAyuda,
  tipo,
  mostrarErrores,
  obligatorio,
  config,
  onChange,
  accept,
}) => {
  // Referencia al input oculto
  const hiddenInput = useRef(null);

  const handleButtonClick = () => {
    hiddenInput.current.click();
  };

  const error = validarCampo(tipo, value, config, obligatorio);

  return (
    <label htmlFor={slug}>
      <p className="text-sm font-medium text-slate-500 mb-1">
        {etiqueta}{' '}
        {!obligatorio && <span className="pl-1 text-slate-400 font-normal">(opcional)</span>}
      </p>
      <input
        name={slug}
        id={slug}
        accept={accept}
        onChange={onChange}
        ref={hiddenInput}
        type="file"
        className="hidden"
      />
      <div className="relative">
        <div className="w-full flex items-center border rounded">
          <button
            className="w-40 font-medium bg-slate-200 text-slate-600 hover:bg-slate-300 py-2 px-4"
            type="button"
            onClick={handleButtonClick}
          >
            Subir archivo
          </button>
          {value ? (
            <p className="px-2 text-customBlack">{value.name}</p>
          ) : (
            <p className="px-2 text-slate-400">Ningún archivo seleccionado</p>
          )}
        </div>
      </div>
      {mostrarErrores && error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : (
        <span className="text-xs text-slate-500">{textoAyuda}</span>
      )}
    </label>
  );
};

export default InputFile;
