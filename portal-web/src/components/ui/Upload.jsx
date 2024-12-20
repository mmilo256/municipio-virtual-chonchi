import { useRef } from "react"
import Button from "./Button"

// Componente Upload para manejar la carga y visualización de archivos
const Upload = ({ label, files, setFiles, name = "files" }) => {

    // Referencia al input de archivo oculto para controlar su clic
    const hiddenFileInput = useRef(null)


    // Función que simula el clic en el input de archivo oculto
    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    // Función para manejar el cambio en el input de archivo
    const handleChange = (e) => {
        // Obtiene los archivos seleccionados como un array
        const selectedFiles = Object.values(e.target.files)
        // Actualiza el estado con los archivos seleccionados
        setFiles(prevState => [...prevState, ...selectedFiles])
    }

    // Función para eliminar un archivo específico del estado
    const handleRemove = (file) => {
        // Filtra el archivo a eliminar de la lista de archivos
        const newFilesArray = files.filter(thisFile => thisFile !== file)
        // Actualiza el estado con el nuevo array de archivos
        setFiles(newFilesArray)
    }

    return (
        <>
            {/* Etiqueta del componente */}
            <label className="block mb-2">{label}</label>
            {/* Botón que simula el clic en el input de archivo */}
            <Button onClick={handleClick}>Subir archivos</Button>
            {/* Input de archivo oculto */}
            <input type="file" multiple className="hidden" name={name} onChange={handleChange} ref={hiddenFileInput} />
            {/* Lista de archivos seleccionados */}
            <ul className="mt-5 flex flex-col gap-2">
                {/* Mensaje si no hay archivos seleccionados */}
                {files.length === 0 && <p className="text-slate-500">No se ha subido ningún archivo</p>}
                {/* Mapea los archivos para mostrar cada uno en una lista */}
                {files.map((file, index) => {
                    return (
                        <li className="bg-blue-100 p-2 font-semibold text-blue-500 flex justify-between" key={index}>
                            <span>{file.name ?? file.originalname}</span>
                            {/* Botón para eliminar un archivo específico */}
                            <button onClick={() => { handleRemove(file) }} type="button">Borrar</button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Upload
