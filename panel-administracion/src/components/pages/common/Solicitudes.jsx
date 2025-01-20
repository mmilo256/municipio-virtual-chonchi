import BaseTable from "../../ui/BaseTable"

const Solicitudes = ({ requests }) => {

    const table = {
        columns: ["ID", "Nombre del solicitante", "Trámite", "Fecha de solicitud", "Estado", ""],
        data: requests
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Solicitudes de permisos transitorios</h1>
            <BaseTable table={table} />
        </div>
    )
}

export default Solicitudes