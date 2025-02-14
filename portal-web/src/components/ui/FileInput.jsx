import { useRef } from "react"

const FileInput = ({ label, file, setFile, name }) => {

    // Referencia al input oculto
    const hiddenInput = useRef(null)

    const handleButtonClick = () => {
        hiddenInput.current.click()
    }

    const clearFile = () => {
        setFile(prev => ({
            ...prev,
            [name]: null
        }))
    }

    return (
        <div className="text-sm border-b mb-4">
            <input onChange={(e) => { setFile(prev => ({ ...prev, [name]: e.target.files[0] })) }} name={name} ref={hiddenInput} type="file" className="hidden" />
            <div className="flex gap-4 relative">
                <p className="text-slate-600 font-medium w-80">{label}</p>
                <div className="w-full">
                    <button className="border border-slate-300 text-slate-800 bg-slate-200 hover:bg-slate-300 py-1 px-4 rounded" type="button" onClick={handleButtonClick}>Subir archivo</button>
                    <span className={`block bg-white py-2 ${file ? "text-black" : "text-slate-500"}`}>{file ? file.name : "Sin archivo seleccionado"}</span>
                </div>
                {file && <button className="absolute right-0 text-2xl text-slate-500 hover:text-black hover:bg-slate-200 rounded h-5 w-5 flex items-center justify-center" onClick={clearFile} type="button">&times;</button>}
            </div>
        </div>
    )
}

export default FileInput