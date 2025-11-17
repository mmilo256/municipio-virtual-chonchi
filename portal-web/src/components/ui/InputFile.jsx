import { useRef } from 'react';

const InputFile = ({ id }) => {
  // Referencia al input oculto
  const hiddenInput = useRef(null);

  const handleButtonClick = () => {
    hiddenInput.current.click();
  };

  return (
    <div>
      <input
        /* onChange={(e) => {
          setFile((prev) => ({ ...prev, [name]: e.target.files[0] }));
        }} */
        name={id}
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
          <p className="px-2 text-slate-500">Ningún archivo seleccionado</p>
        </div>
      </div>
    </div>
  );
};

export default InputFile;
