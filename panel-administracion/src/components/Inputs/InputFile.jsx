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
  const MAX_MB = 10;
  const MAX_BYTES = MAX_MB * 1024 * 1024;

  const TIPOS_PERMITIDOS = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  // Referencia al input oculto
  const hiddenInput = useRef(null);

  const handleButtonClick = () => {
    hiddenInput.current.click();
  };

  const error = validarCampo(tipo, value, config, obligatorio);

  const handleChange = (e) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;
    if (!TIPOS_PERMITIDOS.includes(archivo.type)) {
      alert('Sólo se permiten archivos con formato PDF, DOCX, XLSX, JPG o PNG');
      e.target.value = '';
      return;
    }
    if (archivo.size > MAX_BYTES) {
      alert(`El archivo no puede superar los ${MAX_MB} MB.`);
      e.target.value = '';
      return;
    }
    onChange(e);
  };

  const quitarArchivo = () => {
    hiddenInput.current.value = '';

    // limpia el estado del formulario
    onChange({
      target: {
        name: slug,
        value: null,
        files: [],
      },
    });
  };

  return (
    <label htmlFor={slug} className="mb-2">
      <p className="text-sm font-medium text-slate-500 mb-1">
        {etiqueta}{' '}
        {!obligatorio && <span className="pl-1 text-slate-400 font-normal">(opcional)</span>}
      </p>
      <input
        name={slug}
        id={slug}
        accept={accept}
        onChange={handleChange}
        ref={hiddenInput}
        type="file"
        className="hidden"
      />
      <div className="relative">
        <div className="w-full flex items-center border rounded">
          {!value && (
            <button
              className="min-w-40 font-medium text-nowrap bg-slate-200 text-slate-600 hover:bg-slate-300 py-2 px-4"
              type="button"
              onClick={handleButtonClick}
            >
              Subir archivo
            </button>
          )}
          {value ? (
            <div className="w-full flex justify-between items-center min-w-0">
              <p className="px-2 flex-1 min-w-0 truncate text-sm">{value.name}</p>
              <button
                type="button"
                className="py-2 px-4 bg-red-400 hover:bg-red-300 font-bold text-red-900"
                onClick={quitarArchivo}
              >
                &times;
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center min-w-0">
              <p className="flex-1 min-w-0 truncate text-sm px-2 text-slate-400">
                Ningún archivo seleccionado
              </p>
            </div>
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
