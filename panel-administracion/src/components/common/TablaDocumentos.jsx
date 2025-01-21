import { useNavigate } from "react-router-dom"
import BaseTable from "../ui/BaseTable"
import Button from "../ui/Button"
import { useEffect, useState } from "react"
import { borrarDocumentoAsociado, fetchDocumentosAsociados } from "../../services/requestsServices"
import { API_URL } from "../../constants/constants"

const TablaDocumentos = ({ id }) => {

    const navigate = useNavigate()

    const [documentos, setDocumentos] = useState([])
    const [refresh, setRefresh] = useState(false)

    // Obtener todos los documentos asociados
    useEffect(() => {
        (async () => {
            const data = await fetchDocumentosAsociados(id)
            // Función para borrar documentos asociados
            const handleDeleteDocument = async (solicitudId, documentoId) => {
                await borrarDocumentoAsociado(solicitudId, documentoId)
                setRefresh(!refresh)
            }
            const formattedData = data.map((doc) => ({
                nombre: <a target="__blank" href={`${API_URL}/${doc.ruta}`} className="text-blue-600 underline">{doc.nombre}</a>,
                acciones: <button onClick={() => { handleDeleteDocument(id, doc.id) }} className="text-red-800 text-sm bg-red-200 hover:bg-red-300 hover:cursor-pointer px-4 rounded">Borrar</button>
            }))
            setDocumentos(formattedData)
        })()
    }, [id, refresh])

    const table = {
        columns: ["Documento", ""],
        data: documentos
    }

    const handleAddDocument = () => {
        navigate("documentos-asociados")
    }

    return (
        <div className="mb-4 flex flex-col gap-4">
            <div>
                <Button onClick={handleAddDocument} type="link" variant="secondary" text="Subir documento" />
            </div>
            <BaseTable table={table} />
        </div>
    )
}

export default TablaDocumentos