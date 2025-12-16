import { useNavigate } from 'react-router-dom';
import Modal from '../../ui/Modal.jsx';
import { useState } from 'react';
import Input from '../../ui/Input.jsx';
import { rejectTemplate } from '../../../email-templates/permisos-transitorios/rejectTemplate.js';
import { sendEmail } from '../../../services/emailServices.js';
import { updateRequestStatus } from '../../../services/requestsServices.js';
import { toast } from 'react-toastify';

const AccionesFechaEleccionDirectorio = ({
  requestId,
  status = 'pendiente',
  setStatus,
  request,
  decretos,
}) => {
  const navigate = useNavigate();

  const requestEmail = request?.respuestas?.email;
  const userFullName = request?.respuestas?.name;

  // RECHAZAR SOLICITUD ---------------------------------------
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectInput, setRejectInput] = useState('');
  const rejectTitle = 'SOLICITUD DE PERMISO TRANSITORIO: RECHAZADA';

  const [loading, setLoading] = useState(false);

  const openRejectModal = () => {
    setRejectModal(true);
  };

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

  // SUBIR DECRETO FIRMADO ------------------------------

  // Renderiza diferentes botones según el estado de la solicitud.
  switch (status) {
    // Estados: "pendiente" o "en revisión".
    // Acciones disponibles: rechazar la solicitud o generar un decreto.
    case 'pendiente':
    case 'en revision':
      return <div className="flex items-center gap-4 my-4">{rechazarSolicitudButton}</div>;

    // Estado: "finalizada".
    // Acciones disponibles: descargar el decreto sin firmar o firmado.
    default:
      return null;
  }
};

export default AccionesFechaEleccionDirectorio;
