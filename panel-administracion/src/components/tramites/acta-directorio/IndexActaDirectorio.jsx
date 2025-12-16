import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchDocumentosAdjuntos,
  fetchDocumentosAsociados,
  fetchRequestById,
  updateRequestStatus,
} from '../../../services/requestsServices';
import AccionesPermisosTransitorios from './AccionesPermisosTransitorios';
import DetalleSolicitud from '../DetalleSolicitud';
import RespuestasPermisosTransitorios from './RespuestasPermisosTransitorios';
import DocsPermisosTransitorios from './DocsPermisosTransitorios';
import DocumentosSubidos from '../DocumentosSubidos';

const IndexActaDirectorio = () => {
  const { id } = useParams();
  const [requestData, setRequestData] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [docsAdjuntos, setDocsAdjuntos] = useState([]);
  const [requestStatus, setRequestStatus] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [loading, setLoading] = useState(false);

  console.log(requestData);

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

  // Cargar documentos asociados
  useEffect(() => {
    (async () => {
      const data = await fetchDocumentosAsociados(id);
      setUploadedDocs(data);
    })();
  }, [id, refresh]);

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
      respuestas={<RespuestasPermisosTransitorios respuestas={requestData.respuestas} />}
      documentosForm={<DocsPermisosTransitorios docs={docsAdjuntos} />}
      documentosSubidos={
        <DocumentosSubidos status={requestStatus} setRefresh={setRefresh} docs={uploadedDocs} />
      }
    />
  );
};

export default IndexActaDirectorio;
