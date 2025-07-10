import StatusTag from "../ui/StatusTag"
import { formatDate } from "../../utils/format"
import Breadcrumbs from "../ui/Breadcrumbs"

const DetalleSolicitud = ({ requestData = [], actions, respuestas, documentosForm, documentosSubidos, status, breadcrumbs }) => {

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            {/* Encabezado con el estado de la solicitud */}
            <div className="flex items-center gap-5 mt-4">
                <h1 className="text-2xl font-bold">{requestData?.tramite} #{requestData?.id}</h1>
                <StatusTag status={status} />
            </div>
            {/* Fecha de la solicitud */}
            <p className="text-slate-500">
                <strong>Fecha de solicitud: </strong>
                {formatDate(requestData.createdAt, "DD [de] MMMM [de] YYYY [a las] HH:mm")}
            </p>
            {/* Acciones disponibles */}
            {actions}
            {/* Información del solicitante */}
            <div className="mt-4">
                <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
                <div className="bg-[#fff] p-4 shadow rounded">
                    <p>
                        <strong>Nombre: </strong>
                        {requestData?.respuestas?.name}
                    </p>
                    <p>
                        <strong>RUT: </strong>
                        {requestData?.respuestas?.rut}
                    </p>
                    <p>
                        <strong>Email: </strong>
                        {requestData?.respuestas?.email}
                    </p>
                    <p>
                        <strong>Teléfono: </strong>
                        {requestData?.respuestas?.phone}
                    </p>
                </div>
            </div>
            {/* Datos de la solicitud */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
                {respuestas}
                {documentosForm && <div>
                    <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos adjuntos en la solicitud</h2>
                    {documentosForm}
                </div>}
                {documentosSubidos && <div>
                    <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos asociados</h2>
                    {documentosSubidos}
                </div>}
            </div>
        </div>
    )
}

export default DetalleSolicitud