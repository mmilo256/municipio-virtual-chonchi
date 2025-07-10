import Input from "../ui/Input"
import Upload from "../ui/Upload"
import Button from "../ui/Button"
import { useState } from "react"
import { subirDocumentoAsociado, updateRequestStatus } from "../../services/requestsServices"
import { useNavigate, useParams } from "react-router-dom"

const FormularioSubirDocumento = ({ titulo, estado, tipo, estadoSolicitud }) => {

    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const uploadDocument = async (e) => {
        e.preventDefault()
        if (!name || !file) {
            return alert("Complete todos los campos")
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        try {
            await subirDocumentoAsociado(id, formData, estado, tipo, name)
            if (estadoSolicitud) {
                await updateRequestStatus(id, estadoSolicitud)
            }
            alert("Se ha subido un documento")
            navigate(`../${id}`)
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }

    return (
        <div className="max-w-[30rem] mx-auto">
            {/* Título del formulario */}
            <h1 className="text-2xl font-bold mb-4">{titulo}</h1>
            <form encType="multipart/form-data" onSubmit={uploadDocument}>
                <Input name="uploadedDoc" label="Nombre" value={name} onChange={setName} />
                <Upload name="uploadedDoc" files={file} setFiles={setFile} />
                <div className="mt-4">
                    <Button isLoading={loading} type="submit" text="Subir documento" variant="secondary" />
                </div>
            </form>
        </div>
    )
}

export default FormularioSubirDocumento