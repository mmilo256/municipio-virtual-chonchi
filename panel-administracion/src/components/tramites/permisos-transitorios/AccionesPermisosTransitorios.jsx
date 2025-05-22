import { Link, useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import { useState } from "react";
import Input from "../../ui/Input";
import { rejectTemplate } from "../../../email-templates/permisos-transitorios/rejectTemplate.js";
import { sendEmail } from "../../../services/emailServices.js";
import { updateRequestStatus } from "../../../services/requestsServices.js";

const AccionesPermisosTransitorios = ({
    requestId,
    status = "pendiente",
    setStatus,
    request
}) => {

    const navigate = useNavigate()

    const requestEmail = request?.respuestas?.email
    const userFullName = request?.respuestas?.name

    // RECHAZAR SOLICITUD -------------------------------------------
    const [rejectModal, setRejectModal] = useState(false)
    const [rejectInput, setRejectInput] = useState("")
    const rejectTitle = "SOLICITUD DE PERMISO TRANSITORIO: RECHAZADA"

    const openRejectModal = () => {
        setRejectModal(true)
    }

    const onRejectRequest = async () => {
        if (!rejectInput) {
            return alert("Debe ingresar un motivo")
        }
        const emailTemplate = rejectTemplate(userFullName, rejectInput)
        try {
            await sendEmail(requestEmail, rejectTitle, emailTemplate)
            await updateRequestStatus(requestId, "rechazada")
            setStatus("rechazada")
            alert("Se ha notificado al usuario el rechazo de su solicitud")
        } catch (error) {
            alert(error.message)
        }
    }

    const rechazarSolicitudButton = <>
        <button
            onClick={openRejectModal}
            className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded"
        >
            Rechazar solicitud
        </button>
        <Modal onClick={onRejectRequest} title="Rechazar solicitud" btnText="Rechazar solicitud" modal={rejectModal} toggleModal={() => { setRejectModal(prev => !prev) }} >
            <Input value={rejectInput} onChange={setRejectInput} type="textarea" label="Indique el motivo por el cual rechaza la solicitud:" />
        </Modal>
    </>

    // GENERAR DECRETO (SIN FIRMA) -------------------------------------------
    const generarDecretoButton = <button
        onClick={() => { navigate("generar-decreto") }}
        className="bg-amber-300 hover:bg-amber-200 text-amber-800 py-2 px-5 rounded"
    >
        Generar decreto
    </button>


    // Renderiza diferentes botones según el estado de la solicitud.
    switch (status) {
        // Estados: "pendiente" o "en revisión".
        // Acciones disponibles: rechazar la solicitud o generar un decreto.
        case "pendiente":
        case "en revision":
            return (
                <div className="flex items-center gap-4 my-4">
                    {rechazarSolicitudButton}
                    {generarDecretoButton}
                </div>
            );

        // Estado: "por firmar".
        // Acciones disponibles: rechazar la solicitud, descargar el decreto sin firmar o subir un decreto firmado.
        case "por firmar":
            return (
                <div className="flex items-center gap-4 my-4">
                    {rechazarSolicitudButton}
                    <button
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
                        className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded"
                    >
                        Descargar decreto sin firma
                    </button>
                    <button
                        className="bg-violet-300 hover:bg-violet-200 text-violet-800 py-2 px-5 rounded"
                    >
                        Descargar decreto firmado
                    </button>
                    <button
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
                        className="bg-blue-300 hover:bg-blue-200 text-blue-800 py-2 px-5 rounded"
                    >
                        Descargar decreto sin firma
                    </button>
                    <button
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
