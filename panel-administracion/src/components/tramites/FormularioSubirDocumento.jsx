import Input from "../ui/Input"
import Upload from "../ui/Upload"
import Button from "../ui/Button"
import { useState } from "react"
import { subirDocumentoAsociado } from "../../services/requestsServices"
import { useParams } from "react-router-dom"

const FormularioSubirDocumento = () => {

    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const { id } = useParams()
    console.log(id)

    const uploadDocument = async (e) => {
        e.preventDefault()
        if (!name || !file) {
            return alert("Complete todos los campos")
        }
        const formData = new FormData()
        formData.append("name", name)
        formData.append("file", file)
        formData.append("type", "subido")
        try {
            await subirDocumentoAsociado(id, formData)
            alert("Se ha subido un documento")
        } catch (error) {
            console.log(error)
            alert("Error")
        }
    }

    return (
        <div className="max-w-[30rem] mx-auto">
            {/* Título del formulario */}
            <h1 className="text-2xl font-bold mb-4">Subir documento asociado a la solicitud</h1>
            <form encType="multipart/form-data" onSubmit={uploadDocument}>
                <Input name="uploadedDoc" label="Nombre" value={name} onChange={setName} />
                <Upload name="uploadedDoc" files={file} setFiles={setFile} />
                <div className="mt-4">
                    <Button type="submit" text="Subir documento" variant="secondary" />
                </div>
            </form>
        </div>
    )
}

export default FormularioSubirDocumento