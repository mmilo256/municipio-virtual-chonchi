import { useRef } from "react"

const FileInput = ({ label, file, setFile, name }) => {

    // Referencia al input oculto
    const hiddenInput = useRef(null)

    const handleButtonClick = () => {
        hiddenInput.current.click()
    }

    const clearFile = () => {
        setFile("")
    }

    return (
        <div className="mb-5">
            <input name={name} ref={hiddenInput} onChange={(e) => { setFile(e.target.files[0]) }} type="file" className="hidden" />
            <p className="text-slate-600 font-medium mb-1">{label}</p>
            <div className="border-b pb-2 flex items-center justify-between">
                <div>
                    <button className="px-4 py-2 underline bg-primary hover:bg-primaryHover text-white mr-3" type="button" onClick={handleButtonClick}>Subir archivo</button>
                    <span className={`max-w-[80%] text-sm ${file ? "text-black" : "text-slate-500"}`}>{file ? file.name : "Sin archivo seleccionado"}</span>
                </div>
                <div>
                    {file && <button onClick={clearFile} type="button" className="text-3xl">&times;</button>}
                </div>
            </div>
        </div>
    )
}

export default FileInput