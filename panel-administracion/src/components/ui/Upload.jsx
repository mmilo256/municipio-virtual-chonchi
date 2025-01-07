import { useRef } from "react"

// Componente Upload para manejar la carga y visualización de archivos
const Upload = ({ label, file, setFile, name = "files" }) => {

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
        setFile(selectedFile)
    }

    return (
        <>
            {/* Botón que simula el clic en el input de archivo */}
            {!file && <button onClick={handleClick} className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded">{label}</button>}
            {/* Input de archivo oculto */}
            <input type="file" multiple className="hidden" name={name} onChange={handleChange} ref={hiddenFileInput} />
        </>
    )
}

export default Upload
