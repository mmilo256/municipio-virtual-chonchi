// Importaciones necesarias para el componente
import { updateRequestStatus } from "../../../services/requestsServices"; // Servicio para actualizar el estado de la solicitud
import { useNavigate, useParams } from "react-router-dom"; // Hooks de React Router para navegación y parámetros de URL
import { formatDate } from "../../../utils/format"; // Función para formatear fechas
import { API_URL } from "../../../constants/constants"; // URL base de la API
import StatusTag from "../../ui/StatusTag"; // Componente para mostrar el estado de la solicitud
import { sendEmail } from "../../../services/emailServices"; // Servicio para enviar correos electrónicos
import { renderTemplatePT } from "../../../email-templates/permisosTransitorios"; // Plantilla para correos de permisos transitorios
import ModalesSolicitudPT from "../../administracion-municipal/permisos-transitorios/ModalesSolicitudPT"; // Componentes modales específicos de la solicitud
import useRequestDetails from "../../../hooks/useRequestDetails"; // Hook para obtener detalles de la solicitud
import useModals from "../../../hooks/useModals"; // Hook para gestionar estados de los modales
import AccionesSolicitud from "../../administracion-municipal/permisos-transitorios/AccionesSolicitud"; // Componente con las acciones disponibles para la solicitud
import DatosSolicitudPT from "../../administracion-municipal/permisos-transitorios/DatosSolicitudPT"; // Componente para mostrar los datos de la solicitud
import TablaDocumentos from "../../common/TablaDocumentos";

// Componente principal que muestra los detalles de una solicitud
const DetallesSolicitud = () => {
    // Obtener el ID de la solicitud desde los parámetros de la URL
    const { id } = useParams();
    // Hook para redirigir a otras rutas
    const navigate = useNavigate();

    // Hook personalizado que obtiene los detalles de la solicitud
    const { request, status, unsignedDoc, signedDoc, loading, setStatus } = useRequestDetails(id);

    // Hook para gestionar los estados de los modales
    const {
        rejectModal, // Estado del modal de rechazo
        toggleRejectModal, // Función para alternar el modal de rechazo
        confirmRejectModal, // Estado del modal de confirmación de rechazo
        toggleConfirmRejectModal, // Función para alternar el modal de confirmación de rechazo
        approveModal, // Estado del modal de aprobación
        toggleApproveModal, // Función para alternar el modal de aprobación
        modalInput, // Entrada del modal
        setModalInput, // Función para establecer el valor de la entrada del modal
    } = useModals();

    // Navegar a la página para aprobar la solicitud
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
            place: request.respuestas.permissionPlace,
        };
        navigate("aprobar-solicitud", { state: requestInfo });
    };

    // Visualizar el decreto generado sin firmar
    const handlePreviewUnsignedDoc = () => {
        window.open(`${API_URL}/${unsignedDoc.ruta}`, "_blank"); // Abrir en una nueva pestaña
        console.log(unsignedDoc); // Registrar en la consola para depuración
    };

    // Visualizar el decreto firmado
    const handlePreviewSignedDoc = () => {
        window.open(`${API_URL}/${signedDoc.ruta}`, "_blank"); // Abrir en una nueva pestaña
        console.log(signedDoc); // Registrar en la consola para depuración
    };

    // Enviar el decreto firmado por correo electrónico
    const sendSignedDoc = async () => {
        const emails = [request.respuestas.solicitanteEmail]; // Lista de destinatarios
        const userName = `${request.usuario.nombres} ${request.usuario.apellidos}`; // Nombre completo del usuario
        const attachments = {
            filename: signedDoc?.nombre,
            path: `${API_URL}/${signedDoc?.ruta}`,
        };
        try {
            // Actualizar el estado de la solicitud a "finalizada"
            await updateRequestStatus(request.id, "finalizada");
            // Enviar el correo electrónico
            await sendEmail(
                emails,
                "Solicitud de permiso transitorio: APROBADA",
                renderTemplatePT(userName, modalInput, "Solicitud aprobada", "aprobado"),
                attachments
            );
            alert("Se ha enviado el decreto"); // Mostrar alerta de éxito
        } catch (error) {
            console.log(error); // Registrar el error
            throw new Error(`Ha ocurrido un error: ${error.message}`);
        }
        setStatus("finalizada"); // Actualizar el estado en la interfaz
        toggleApproveModal(); // Cerrar el modal de aprobación
    };

    // Confirmar el rechazo de la solicitud
    const confirmReject = async () => {
        if (modalInput.trim().length > 3) {
            const emails = [request.respuestas.solicitanteEmail]; // Lista de destinatarios
            const userName = `${request.usuario.nombres} ${request.usuario.apellidos}`; // Nombre completo del usuario
            try {
                // Actualizar el estado de la solicitud a "rechazada"
                await updateRequestStatus(request.id, "rechazada");
                // Enviar el correo electrónico
                await sendEmail(
                    emails,
                    "Solicitud de permiso transitorio: RECHAZADA",
                    renderTemplatePT(userName, modalInput, "Solicitud rechazada", "rechazado")
                );
                alert("Se ha rechazado la solicitud"); // Mostrar alerta de éxito
            } catch (error) {
                console.log(error); // Registrar el error
                throw new Error(`Ha ocurrido un error: ${error.message}`);
            }
            setStatus("rechazada"); // Actualizar el estado en la interfaz
            toggleConfirmRejectModal(); // Cerrar el modal de confirmación de rechazo
        } else {
            alert("Debe ingresar un motivo para rechazar la solicitud"); // Validación para el motivo de rechazo
        }
    };

    // Mostrar un loader mientras se cargan los datos
    if (loading) {
        return null;
    }

    return (
        <div>
            {/* Modales para la gestión de la solicitud */}
            <ModalesSolicitudPT
                sendSignedDoc={sendSignedDoc}
                approveModal={approveModal}
                toggleApproveModal={toggleApproveModal}
                rejectModal={rejectModal}
                toggleRejectModal={toggleRejectModal}
                confirmRejectModal={confirmRejectModal}
                toggleConfirmRejectModal={toggleConfirmRejectModal}
                confirmReject={confirmReject}
                modalInput={modalInput}
                setModalInput={setModalInput}
            />
            {/* Encabezado con el estado de la solicitud */}
            <div className="flex items-center gap-5">
                <h1 className="text-2xl font-bold">Solicitud de permiso transitorio #{request.id}</h1>
                <StatusTag status={status} />
            </div>
            {/* Fecha de la solicitud */}
            <p className="text-slate-500">
                <strong>Fecha de solicitud:</strong> {formatDate(request.createdAt, 1)}
            </p>
            {/* Acciones disponibles */}
            <AccionesSolicitud
                status={status}
                toggleRejectModal={toggleRejectModal}
                approveRequest={approveRequest}
                handlePreviewUnsignedDoc={handlePreviewUnsignedDoc}
                handlePreviewSignedDoc={handlePreviewSignedDoc}
                toggleApproveModal={toggleApproveModal}
            />
            {/* Información del solicitante */}
            <div className="mt-4">
                <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
                <div className="bg-[#fff] p-4 shadow rounded">
                    <p>
                        <strong>Nombre:</strong> {request.usuario.nombres} {request.usuario.apellidos}
                    </p>
                    <p>
                        <strong>RUT:</strong> {request.usuario.run}
                    </p>
                    <p>
                        <strong>Email:</strong> {request.respuestas.solicitanteEmail}
                    </p>
                    <p>
                        <strong>Teléfono:</strong> {request.respuestas.solicitantePhone}
                    </p>
                </div>
            </div>
            {/* Datos de la solicitud */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
                <DatosSolicitudPT request={request} loading={loading} />
                <h2 className="text-xl mt-6 mb-2 font-semibold">Documentos asociados</h2>
                <TablaDocumentos id={id} />
            </div>
        </div>
    );
};

export default DetallesSolicitud;
