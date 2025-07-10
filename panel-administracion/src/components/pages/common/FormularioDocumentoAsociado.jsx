import { useState } from "react"
import FormLayout from "../../common/FormLayout"
import { subirDocumentoAsociado } from "../../../services/requestsServices"
import { useNavigate, useParams } from "react-router-dom"

const FormDocumentoAsociado = () => {

    const { id } = useParams()

    const navigate = useNavigate()

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

    const onSubmit = async () => {
        const formData = new FormData()
        formData.append('nombre', filename)
        formData.append('uploadedDoc', file)
        const data = {
            ...formData,
            type: "subido"
        }
        try {
            await subirDocumentoAsociado(id, data)
            alert("Documento subido correctamente")
            navigate(`../${id}`)
        } catch (error) {
            alert("No se ha podido subir el documento")
            console.log(error)
        }
    }

    return (
        <div>
            <FormLayout uploadName="uploadedDoc" onSubmit={onSubmit} submitText="Subir documento" title="Subir documento asociado" inputs={inputs} />
        </div>
    )
}

export default FormDocumentoAsociado