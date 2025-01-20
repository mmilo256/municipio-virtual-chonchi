import { useNavigate } from "react-router-dom"
import BaseTable from "../ui/BaseTable"
import Button from "../ui/Button"

const TablaDocumentos = () => {

    const navigate = useNavigate()

    const table = {
        columns: ["Documento", ""],
        data: [{
            doc: <a href="#" className="text-blue-500 underline">Nombre del documento</a>,
            acciones: <button className="text-red-800 bg-red-200 hover:bg-red-300 hover:cursor-pointer py-1 px-4 rounded">Borrar</button>
        }]
    }

    const handleAddDocument = () => {
        navigate("documentos-asociados")
    }

    return (
        <div className="my-5 flex flex-col gap-4">
            <div>
                <Button onClick={handleAddDocument} type="link" variant="secondary" text="Subir documento" />
            </div>
            <BaseTable table={table} />
        </div>
    )
}

export default TablaDocumentos