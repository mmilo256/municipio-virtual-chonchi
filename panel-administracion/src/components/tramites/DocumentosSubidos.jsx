import BaseTable from "../ui/BaseTable"
import Button from "../ui/Button"

const DocumentosSubidos = ({ docs = ["", ""], setDocs }) => {

    const columns = ["Documento", "Acciones"]

    const data = docs.map(doc => ({
        name: "nombre-documento",
        actions: "acciones"
    }))

    return (
        <div className="flex flex-col items-start gap-4">
            <Button variant="secondary" text="Subir documento" />
            <BaseTable columns={columns} data={data} />
        </div>
    )
}

export default DocumentosSubidos