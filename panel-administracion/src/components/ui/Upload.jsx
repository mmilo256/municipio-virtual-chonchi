import { useRef } from 'react';
import Button from './Button';

// Componente Upload para manejar la carga y visualización de archivos
const Upload = ({ label, file, setFile, name }) => {
  // Referencia al input de archivo oculto para controlar su clic
  const hiddenFileInput = useRef(null);

  // Función que simula el clic en el input de archivo oculto
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  /* // Función para manejar el cambio en el input de archivo
  const handleChange = (e) => {
    // Obtiene los archivos seleccionados como un array
    const selectedFile = e.target.files[0];
    // Actualiza el estado con los archivos seleccionados
    setFile(selectedFile);
  }; */

  /* // Función para eliminar un archivo específico del estado
    const handleRemove = (file) => {
        // Filtra el archivo a eliminar de la lista de archivos
        const newFilesArray = files.filter(thisFile => thisFile !== file)
        // Actualiza el estado con el nuevo array de archivos
        setFiles(newFilesArray)
    } */

  return (
    <div className="mb-4">
      <label className="block">{label}</label>
      <input
        type="file"
        multiple
        className="hidden"
        name={name}
        onChange={setFile}
        ref={hiddenFileInput}
      />
      <div className="border flex">
        <div>
          <Button variant="primary" text="Seleccionar archivo" onClick={handleClick} />
        </div>
        {!file ? (
          <span className="flex items-center px-4 text-slate-500">
            No se ha subido ningún archivo
          </span>
        ) : (
          <span className="flex items-center px-4">{file.name}</span>
        )}
      </div>
    </div>
  );
};

export default Upload;
