import Input from "../ui/Input"
import Upload from "../ui/Upload"
import Button from "../ui/Button"
import { useState } from "react"
import { subirDocumentoAsociado, updateRequestStatus } from "../../services/requestsServices"
import { useNavigate, useParams } from "react-router-dom"
import Breadcrumbs from "../ui/Breadcrumbs"
import { ToastContainer, toast } from 'react-toastify';

const FormularioSubirDocumento = ({ titulo, estado, tipo, estadoSolicitud, breadcrumbsData }) => {


    const [name, setName] = useState("")
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    const breadcrumbs = [
        { label: breadcrumbsData.tramite, href: breadcrumbsData.tramiteHref },
        { label: `Solicitud #${id}`, href: `${breadcrumbsData.tramiteHref}/${id}` },
        { label: `Subir documento`, href: `${breadcrumbsData.tramiteHref}/${id}/${breadcrumbsData.pagina}` }
    ]

    const uploadDocument = async (e) => {
        e.preventDefault()
        if (!name || !file) {
            return toast.error("Debe rellenar todos los campos")
        }
        setLoading(true)
        const formData = new FormData()
        formData.append("file", file)
        try {
            await subirDocumentoAsociado(id, formData, estado, tipo, name)
            if (estadoSolicitud) {
                await updateRequestStatus(id, estadoSolicitud)
            }
            navigate(`../${id}`, {
                state: {
                    showToast: true,
                    toastMessage: "El documento ha sido subido exitosamente"
                }
            })
        } catch (error) {
            console.log(error)
            toast.error("Ha ocurrido un error y no se pudo subir el documento")
        }
    }

    return (
        <div className="max-w-[36rem] mx-auto">
            <ToastContainer />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {/* Título del formulario */}
            <h1 className="text-2xl font-bold my-4">{titulo}</h1>
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