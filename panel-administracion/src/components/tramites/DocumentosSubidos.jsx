import BaseTable from "../ui/BaseTable"
import Button from "../ui/Button"
import { useNavigate } from 'react-router-dom'

const DocumentosSubidos = ({ docs = ["", ""], setDocs }) => {

    const navigate = useNavigate()

    const columns = ["Documento", "Acciones"]

    const data = docs.map(doc => ({
        name: "nombre-documento",
        actions: "acciones"
    }))

    const onNavigate = () => {
        navigate("subir-documento")
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <Button onClick={onNavigate} variant="secondary" text="Subir documento" />
            <BaseTable columns={columns} data={data} />
        </div>
    )
}

export default DocumentosSubidos