import { useRef } from "react"
import Button from "./Button"

// Componente Upload para manejar la carga y visualización de archivos
const Upload = ({ label, files, setFiles, name }) => {

    // Referencia al input de archivo oculto para controlar su clic
    const hiddenFileInput = useRef(null)

    // Función que simula el clic en el input de archivo oculto
    const handleClick = () => {
        hiddenFileInput.current.click()
    }

    // Función para manejar el cambio en el input de archivo
    const handleChange = (e) => {
        // Obtiene los archivos seleccionados como un array
        const selectedFile = e.target.files[0]
        // Actualiza el estado con los archivos seleccionados
        setFiles(selectedFile)
    }

    /* // Función para eliminar un archivo específico del estado
    const handleRemove = (file) => {
        // Filtra el archivo a eliminar de la lista de archivos
        const newFilesArray = files.filter(thisFile => thisFile !== file)
        // Actualiza el estado con el nuevo array de archivos
        setFiles(newFilesArray)
    } */

    return (
        <>
            {/* Etiqueta del componente */}
            <label className="block mb-2">{label}</label>
            {/* Botón que simula el clic en el input de archivo */}
            <Button variant="primary" text="Seleccionar archivo" onClick={handleClick} />
            {/* Input de archivo oculto */}
            <input type="file" multiple className="hidden" name={name} onChange={handleChange} ref={hiddenFileInput} />
            {/* Lista de archivos seleccionados */}
            <ul className="mt-5 flex flex-col gap-2">
                {/* Mensaje si no hay archivos seleccionados */}
                {!files && <p className="text-slate-500">No se ha subido ningún archivo</p>}
                {/* Mapea los archivos para mostrar cada uno en una lista */}

                {files && <li className="bg-blue-100 p-2 font-semibold text-blue-500 flex justify-between">
                    <span>{files.name}</span>
                    {/* Botón para eliminar un archivo específico */}
                    {/* <button onClick={() => { handleRemove(file) }} type="button">Borrar</button> */}
                </li>}

            </ul>
        </>
    )
}

export default Upload
