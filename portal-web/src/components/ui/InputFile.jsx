import { useRef } from 'react';

const InputFile = ({ id, values, onChange, accept }) => {
  // Referencia al input oculto
  const hiddenInput = useRef(null);

  const handleButtonClick = () => {
    hiddenInput.current.click();
  };

  return (
    <div>
      <input
        name={id}
        id={id}
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
          {values[id] ? (
            <p className="px-2 text-customBlack">{values[id].name}</p>
          ) : (
            <p className="px-2 text-slate-400">Ningún archivo seleccionado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputFile;
