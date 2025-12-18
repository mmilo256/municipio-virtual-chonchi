import Modal from '../../ui/Modal.jsx';
import { useState } from 'react';
import Input from '../../ui/Input.jsx';
import { sendEmail } from '../../../services/emailServices.js';
import { updateRequestStatus } from '../../../services/requestsServices.js';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/format.js';
import { rejectTemplate } from '../../../email-templates/acta-directorio/rejectTemplate.js';
import { approveTemplate } from '../../../email-templates/acta-directorio/approveTemplate.js';

const AccionesActaDirectorio = ({ requestId, status = 'pendiente', setStatus, request }) => {
  const { elecDate } = request.respuestas || {};

  const requestEmail = request?.respuestas?.email;
  const userFullName = request?.respuestas?.name;

  // RECHAZAR SOLICITUD ---------------------------------------
  const [rejectModal, setRejectModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [rejectInput, setRejectInput] = useState('');
  const rejectTitle = 'DEPÓSITO DE ACTA DE ELECCIÓN: RECHAZADA';
  const approveTitle = 'DEPÓSITO DE ACTA DE ELECCIÓN: APROBADA';

  const [loading, setLoading] = useState(false);

  const openRejectModal = () => {
    setRejectModal(true);
  };

  const openApproveModal = () => {
    setApproveModal(true);
  };

  // Función para rechazar solicitud
  const onRejectRequest = async () => {
    if (!rejectInput) {
      return toast.error('Debe indicar un motivo para rechazar la solicitud');
    }
    setLoading(true);
    const emailTemplate = rejectTemplate(userFullName, rejectInput);
    try {
      await sendEmail(requestEmail, rejectTitle, emailTemplate);
      await updateRequestStatus(requestId, 'rechazada');
      setStatus('rechazada');
      toast.success('Se ha notificado al usuario el rechazo de su solicitud');
    } catch (error) {
      console.log(error);
      toast.error('Ha ocurrido un error y no se pudo rechazar la solicitud');
    }
  };

  // Función para aprobar solicitud
  const onApproveRequest = async () => {
    setLoading(true);
    const emailTemplate = approveTemplate(
      userFullName,
      formatDate(elecDate, 'dddd DD [de] MMMM [de] YYYY'),
    );
    try {
      await sendEmail(requestEmail, approveTitle, emailTemplate);
      await updateRequestStatus(requestId, 'finalizada');
      setStatus('finalizada');
      toast.success('Se ha notificado al usuario la aprobación de su solicitud');
    } catch (error) {
      console.log(error);
      toast.error(
        'Ha ocurrido un error y no se pudo aprobar la solicitud. Intente más tarde o contáctese con el administrador del sistema',
      );
    }
  };

  const rechazarSolicitudButton = (
    <>
      <button
        onClick={openRejectModal}
        className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded"
      >
        Rechazar solicitud
      </button>
      <Modal
        loading={loading}
        onClick={onRejectRequest}
        title="Rechazar solicitud"
        btnText="Rechazar solicitud"
        modal={rejectModal}
        toggleModal={() => {
          setRejectModal((prev) => !prev);
        }}
      >
        <Input
          className="mb-0"
          value={rejectInput}
          onChange={setRejectInput}
          type="textarea"
          label="Indique el motivo por el cual rechaza la solicitud:"
        />
      </Modal>
    </>
  );

  // Aprobar solicitud botón
  const aprobarSolicitudButton = (
    <>
      <button
        onClick={openApproveModal}
        className="bg-green-300 hover:bg-green-200 text-green-800 py-2 px-5 rounded"
      >
        Aprobar solicitud
      </button>
      <Modal
        loading={loading}
        onClick={onApproveRequest}
        title="Aprobar solicitud"
        btnText="Aprobar solicitud"
        modal={approveModal}
        toggleModal={() => {
          setApproveModal((prev) => !prev);
        }}
      >
        <p>
          ¿Está seguro que desea marcar esta solicitud como <strong>aprobada</strong>?
        </p>
        <p>Esto dará fin a la solicitud y se comunicará al usuario solicitante</p>
      </Modal>
    </>
  );

  // SUBIR DECRETO FIRMADO ------------------------------

  // Renderiza diferentes botones según el estado de la solicitud.
  switch (status) {
    // Estados: "pendiente" o "en revisión".
    // Acciones disponibles: rechazar la solicitud o generar un decreto.
    case 'pendiente':
    case 'en revision':
      return (
        <div className="flex items-center gap-4 my-4">
          {rechazarSolicitudButton}
          {aprobarSolicitudButton}
        </div>
      );

    // Estado: "finalizada".
    // Acciones disponibles: descargar el decreto sin firmar o firmado.
    default:
      return null;
  }
};

export default AccionesActaDirectorio;
