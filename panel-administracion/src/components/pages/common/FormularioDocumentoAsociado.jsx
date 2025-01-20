import { useState } from "react"
import FormLayout from "../../common/FormLayout"

const FormDocumentoAsociado = () => {

    const [file, setFile] = useState({})
    const [filename, setFilename] = useState("")

    const inputs = [{
        etiqueta: "Nombre del documento",
        tipo: "text",
        value: filename,
        onChange: setFilename
    }, {
        etiqueta: "Documento asociado",
        tipo: "file",
        file,
        setFile
    }]

    return (
        <div>
            <FormLayout title="Subir documento asociado" inputs={inputs} />
        </div>
    )
}

export default FormDocumentoAsociado