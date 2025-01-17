import { useState } from "react";
import { updateRequestStatus } from "../../services/requestsServices";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../../utils/format";
import { API_URL } from "../../constants/constants";
import StatusTag from "./StatusTag";
import { sendEmail } from "../../services/emailServices";
import { renderTemplatePT } from "../../email-templates/permisosTransitorios";
import ModalesSolicitudPT from "../administracion-municipal/permisos-transitorios/ModalesSolicitudPT";
import useRequestDetails from "../../hooks/useRequestDetails";
import AccionesSolicitud from "../administracion-municipal/permisos-transitorios/AccionesSolicitud";

const DetallesSolicitud = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const { request, status, unsignedDoc, signedDoc, loading, setStatus } = useRequestDetails(id)

    const [rejectModal, setRejectModal] = useState(false)
    const [confirmRejectModal, setConfirmRejectModal] = useState(false)
    const [confirmApproveModal, setConfirmApproveModal] = useState(false)

    const [modalInput, setModalInput] = useState("")

    // Abrir modal para rechazar solicitud de permiso
    const handleRejectRequest = () => {
        setRejectModal(true)
    }

    // Abrir modal de confirmación
    const openConfirmModal = () => {
        if (modalInput.trim().length > 3) {
            setRejectModal(false)
            setConfirmRejectModal(true)
        } else {
            alert("Debe ingresar un motivo para rechazar la solicitud")
        }
    }

    const openApproveModal = () => {
        setConfirmApproveModal(true)
    }


    const approveRequest = () => {
        const requestInfo = {
            id: request.id,
            activity: request.respuestas.permissionName,
            orgName: request.respuestas.orgName,
            orgRut: request.respuestas.orgRut,
            presidentName: request.respuestas.presidentName,
            presidentRut: request.respuestas.presidentRut,
            startDate: request.respuestas.permissionStartDate,
            startTime: request.respuestas.permissionStartTime,
            endTime: request.respuestas.permissionEndTime,
            place: request.respuestas.permissionPlace
        }
        navigate("aprobar-solicitud", { state: requestInfo })
    }

    // Función para visualizar el decreto generado
    const handlePreviewUnsignedDoc = () => {
        window.open(`${API_URL}/${unsignedDoc.ruta}`, "_blank")
        console.log(unsignedDoc)
    }
    // Función para visualizar el decreto firmado
    const handlePreviewSignedDoc = () => {
        window.open(`${API_URL}/${signedDoc.ruta}`, "_blank")
        console.log(signedDoc)
    }

    // Enviar decreto firmado por correo electrónico
    const sendSignedDoc = async () => {
        const emails = [request.respuestas.solicitanteEmail]
        const userName = `${request.usuario.nombres} ${request.usuario.apellidos}`
        const attachments = {
            filename: signedDoc?.nombre,
            path: `${API_URL}/${signedDoc?.ruta}`
        }
        try {
            await updateRequestStatus(request.id, "finalizada")
            await sendEmail(emails, "Solicitud de permiso transitorio: APROBADA", renderTemplatePT(userName, modalInput, 'Solicitud aprobada', 'aprobado'), attachments)
            alert("Se ha enviado el decreto")
        } catch (error) {
            console.log(error)
            throw new Error(`Ha ocurrido un error: ${error.message}`);
        }
        setStatus("finalizada")
        setConfirmApproveModal(false)
    }

    // Confirmar rechazo de solicitud
    const confirmReject = async () => {
        if (modalInput.trim().length > 3) {
            const emails = [request.respuestas.solicitanteEmail]
            const userName = `${request.usuario.nombres} ${request.usuario.apellidos}`
            try {
                await updateRequestStatus(request.id, "rechazada")
                await sendEmail(emails, "Solicitud de permiso transitorio: RECHAZADA", renderTemplatePT(userName, modalInput, 'Solicitud rechazada', 'rechazado'))
                alert("Se ha rechazado la solicitud")
            } catch (error) {
                console.log(error)
                throw new Error(`Ha ocurrido un error: ${error.message}`);
            }
            setStatus("rechazada")
            setConfirmRejectModal(false)
        } else {
            alert("Debe ingresar un motivo para rechazar la solicitud")
        }
    }

    if (loading) {
        return
    }

    return (
        <div>
            <ModalesSolicitudPT
                confirmApproveModal={confirmApproveModal}
                setConfirmApproveModal={setConfirmApproveModal}
                sendSignedDoc={sendSignedDoc}
                confirmRejectModal={confirmRejectModal}
                confirmReject={confirmReject}
                rejectModal={rejectModal}
                setRejectModal={setRejectModal}
                openConfirmModal={openConfirmModal}
                modalInput={modalInput}
                setModalInput={setModalInput}
            />
            <div className="flex items-center gap-5">
                <h1 className="text-2xl font-bold">Solicitud de permiso transitorio #{request.id}</h1>
                <StatusTag status={status} />
            </div>
            <p className="text-slate-500"><strong>Fecha de solicitud:</strong> {formatDate(request.createdAt, 1)}</p>
            <AccionesSolicitud
                status={status}
                handleRejectRequest={handleRejectRequest}
                approveRequest={approveRequest}
                handlePreviewUnsignedDoc={handlePreviewUnsignedDoc}
                handlePreviewSignedDoc={handlePreviewSignedDoc}
                openApproveModal={openApproveModal}
            />
            <div className="mt-4">
                <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
                <div className=" bg-[#fff] p-4 shadow rounded">
                    <p><strong>Nombre:</strong> {request.usuario.nombres} {request.usuario.apellidos}</p>
                    <p><strong>RUT:</strong> {request.usuario.run}</p>
                    <p><strong>Email:</strong> {request.respuestas.solicitanteEmail}</p>
                    <p><strong>Teléfono:</strong> {request.respuestas.solicitantePhone}</p>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
            </div>
        </div>
    )
}

export default DetallesSolicitud