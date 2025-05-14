import { SERVER_URL } from "../../constants/constants"
import BaseTable from "../ui/BaseTable"
import Button from "../ui/Button"
import { useNavigate } from 'react-router-dom'

const DocumentosSubidos = ({ docs = [] }) => {

    const navigate = useNavigate()

    const columns = ["Documento", "Acciones"]

    const data = docs.map(doc => {
        const ruta = `${SERVER_URL}/${doc?.ruta}`
        return ({
            document: <a target="_blank" className="text-blue-500 underline" href={ruta}>{doc.nombre}</a>,
            actions: "acciones"
        })
    })

    const onNavigate = () => {
        navigate("subir-documento")
    }

    return (
        <div className="flex flex-col items-start gap-4 mb-4">
            <Button onClick={onNavigate} variant="secondary" text="Subir documento" />
            {Object.values(docs).length === 0
                ? <p>No hay documentos subidos</p>
                : <BaseTable columns={columns} data={data} />}
        </div>
    )
}

export default DocumentosSubidos