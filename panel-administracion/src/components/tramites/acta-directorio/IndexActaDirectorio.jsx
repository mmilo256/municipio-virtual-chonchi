import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchDocumentosAdjuntos,
  fetchRequestById,
  updateRequestStatus,
} from '../../../services/requestsServices';
import AccionesPermisosTransitorios from './AccionesPermisosTransitorios';
import DetalleSolicitud from '../DetalleSolicitud';
import RespuestasActaDirectorio from './RespuestasActaDirectorio';

const IndexActaDirectorio = () => {
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [docsAdjuntos, setDocsAdjuntos] = useState([]);
  const [requestStatus, setRequestStatus] = useState('');

  const [loading, setLoading] = useState(false);

  // Cambiar el estado a "en revision" en caso de que se abra la solicitud por primera vez
  useEffect(() => {
    (async () => {
      if (requestStatus === 'pendiente') {
        try {
          await updateRequestStatus(id, 'en revision');
          setRequestStatus('en revision');
        } catch (error) {
          console.log(error);
          alert('No se pudo actualizar el estado de la solicitud');
        }
      }
    })();
  }, [id, requestStatus]);

  // Cargar documentos adjuntos
  useEffect(() => {
    (async () => {
      const response = await fetchDocumentosAdjuntos(id);
      setDocsAdjuntos(response);
    })();
  }, [id]);

  // Cargar respuestas del formulario
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetchRequestById(id);
        const formattedFormData = JSON.parse(response.respuestas);
        const data = {
          id: response.id,
          respuestas: formattedFormData,
          createdAt: response.createdAt,
          estado: response.estado,
          tramite: response.tramite.titulo,
          tramite_id: response.tramite_id,
          usuario_id: response.usuario_id,
        };
        setRequestStatus(data.estado);
        setRequestData(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [id]);

  const detailBreadcrumbs = [
    { label: requestData.tramite, href: '/acta-directorio' },
    { label: `Solicitud #${id}`, href: `/acta-directorio/${id}` },
  ];

  return (
    <DetalleSolicitud
      status={requestStatus}
      breadcrumbs={detailBreadcrumbs}
      loading={loading}
      actions={
        <AccionesPermisosTransitorios
          status={requestStatus}
          setStatus={setRequestStatus}
          request={requestData}
          requestId={id}
        />
      }
      requestData={requestData}
      respuestas={
        <RespuestasActaDirectorio respuestas={requestData.respuestas} documentos={docsAdjuntos} />
      }
      /* documentosForm={<DocsPermisosTransitorios docs={docsAdjuntos} />} */
      /* documentosSubidos={
        <DocumentosSubidos status={requestStatus} setRefresh={setRefresh} docs={uploadedDocs} />
      } */
    />
  );
};

export default IndexActaDirectorio;
