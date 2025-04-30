import { Link } from "react-router-dom";

// Componente que muestra las acciones disponibles según el estado de una solicitud.
// Recibe como props: 
// - `status`: el estado actual de la solicitud.
// - `toggleRejectModal`: función para abrir/cerrar el modal de rechazo.
// - `approveRequest`: función para iniciar el proceso de aprobación de la solicitud.
// - `handlePreviewUnsignedDoc`: función para visualizar el decreto sin firmar.
// - `handlePreviewSignedDoc`: función para visualizar el decreto firmado.
// - `toggleApproveModal`: función para abrir/cerrar el modal de envío del decreto aprobado.

const AccionesPermisosTransitorios = ({
    status = "pendiente",
    toggleRejectModal,
    approveRequest,
    handlePreviewUnsignedDoc,
    handlePreviewSignedDoc,
    toggleApproveModal,
}) => {
    // Renderiza diferentes botones según el estado de la solicitud.
    switch (status) {
        // Estados: "pendiente" o "en revisión".
        // Acciones disponibles: rechazar la solicitud o generar un decreto.
        case "pendiente":
        case "en revision":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button
                        onClick={toggleRejectModal}
                        className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded"
                    >
                        Rechazar solicitud
                    </button>
                    <button
                        onClick={approveRequest}
                        className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded"
                    >
                        Generar decreto
                    </button>
                </div>
            );

        // Estado: "por firmar".
        // Acciones disponibles: rechazar la solicitud, descargar el decreto sin firmar o subir un decreto firmado.
        case "por firmar":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button
                        onClick={toggleRejectModal}
                        className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded"
                    >
                        Rechazar solicitud
                    </button>
                    <button
                        onClick={handlePreviewUnsignedDoc}
                        className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded"
                    >
                        Descargar decreto
                    </button>
                    <Link
                        to="subir-decreto-firmado"
                        className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded"
                    >
                        Subir decreto firmado
                    </Link>
                </div>
            );

        // Estado: "aprobada".
        // Acciones disponibles: descargar el decreto sin firmar, descargar el decreto firmado o enviarlo.
        case "aprobada":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button
                        onClick={handlePreviewUnsignedDoc}
                        className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded"
                    >
                        Descargar decreto sin firma
                    </button>
                    <button
                        onClick={handlePreviewSignedDoc}
                        className="bg-violet-300 hover:bg-violet-200 text-violet-800 py-2 px-5 rounded"
                    >
                        Descargar decreto firmado
                    </button>
                    <button
                        onClick={toggleApproveModal}
                        className="bg-green-300 hover:bg-green-200 text-green-800 py-2 px-5 rounded"
                    >
                        Enviar decreto
                    </button>
                </div>
            );

        // Estado: "finalizada".
        // Acciones disponibles: descargar el decreto sin firmar o firmado.
        case "finalizada":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button
                        onClick={handlePreviewUnsignedDoc}
                        className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded"
                    >
                        Descargar decreto sin firma
                    </button>
                    <button
                        onClick={handlePreviewSignedDoc}
                        className="bg-violet-300 hover:bg-violet-200 text-violet-800 py-2 px-5 rounded"
                    >
                        Descargar decreto firmado
                    </button>
                </div>
            );

        // En cualquier otro estado no renderiza nada.
        default:
            return null;
    }
};

export default AccionesPermisosTransitorios;
