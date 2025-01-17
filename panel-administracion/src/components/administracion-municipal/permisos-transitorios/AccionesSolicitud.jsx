import { Link } from "react-router-dom";

const AccionesSolicitud = ({
    status,
    handleRejectRequest,
    approveRequest,
    handlePreviewUnsignedDoc,
    handlePreviewSignedDoc,
    openApproveModal,
}) => {
    switch (status) {
        case "pendiente":
        case "en revision":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button onClick={handleRejectRequest} className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded">Rechazar solicitud</button>
                    <button onClick={approveRequest} className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded">Generar decreto</button>
                </div>
            );
        case "por firmar":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button onClick={handleRejectRequest} className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded">Rechazar solicitud</button>
                    <button onClick={handlePreviewUnsignedDoc} className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded">Descargar decreto</button>
                    <Link to="subir-decreto-firmado" className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded">Subir decreto firmado</Link>
                </div>
            );
        case "aprobada":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button onClick={handlePreviewUnsignedDoc} className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded">Descargar decreto sin firma</button>
                    <button onClick={handlePreviewSignedDoc} className="bg-violet-300 hover:bg-violet-200 text-violet-800 py-2 px-5 rounded">Descargar decreto firmado</button>
                    <button onClick={openApproveModal} className="bg-green-300 hover:bg-green-200 text-green-800 py-2 px-5 rounded">Enviar decreto</button>
                </div>
            );
        case "finalizada":
            return (
                <div className="flex items-center gap-4 my-4">
                    <button onClick={handlePreviewUnsignedDoc} className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded">Descargar decreto sin firma</button>
                    <button onClick={handlePreviewSignedDoc} className="bg-violet-300 hover:bg-violet-200 text-violet-800 py-2 px-5 rounded">Descargar decreto firmado</button>
                </div>
            );
        default:
            return null;
    }
}

export default AccionesSolicitud