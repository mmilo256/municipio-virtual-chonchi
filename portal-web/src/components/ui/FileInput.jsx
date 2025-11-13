import { useRef } from 'react';

const FileInput = ({ label, file, setFile, name }) => {
  // Referencia al input oculto
  const hiddenInput = useRef(null);

  const handleButtonClick = () => {
    hiddenInput.current.click();
  };

  const clearFile = () => {
    setFile((prev) => ({
      ...prev,
      [name]: null,
    }));
  };

  return (
    <div className="text-sm mb-6">
      <input
        onChange={(e) => {
          setFile((prev) => ({ ...prev, [name]: e.target.files[0] }));
        }}
        name={name}
        ref={hiddenInput}
        type="file"
        className="hidden"
      />
      <div className="relative">
        <p className="text-slate-600 font-medium w-80 mb-1">{label}</p>
        <div className="w-full flex border rounded">
          <button
            className="w-52 font-medium bg-sky-600 text-white hover:bg-sky-500 py-1 px-4"
            type="button"
            onClick={handleButtonClick}
          >
            Subir archivo
          </button>
          <span className={`block  w-full p-2 ${file ? 'text-black' : 'text-slate-500'}`}>
            {file ? file.name : 'Ningún archivo seleccionado'}
          </span>
        </div>
        {file && (
          <button
            className="absolute right-2 top-8 text-2xl text-slate-500 hover:text-black hover:bg-slate-200 rounded h-5 w-5 flex items-center justify-center"
            onClick={clearFile}
            type="button"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default FileInput;
