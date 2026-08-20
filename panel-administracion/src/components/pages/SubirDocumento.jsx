import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../ui/Breadcrumbs';
import {
  obtenerSolicitudPorCodigo,
  subirDocumentoAsociado,
} from '../../services/solicitudes.service';
import { useNavigate, useParams } from 'react-router-dom';
import StatusTag from '../ui/StatusTag';
import OriginTag from '../ui/OriginTag';
import { formatDate } from '../../utils/format';
import Upload from '../ui/Upload';
import Input from '../ui/Input';
import Button from '../ui/Button';
import LoadingOverlay from '../ui/LoadingOverlay';

const SubirDocumento = () => {
  const { codigo, slug } = useParams();

  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState({});
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [file, setFile] = useState('');
  const infoSolicitud = solicitud.solicitud;

  useEffect(() => {
    (async () => {
      setLoadingText('Cargando solicitud...');
      setLoading(true);
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [codigo]);

  const onSubirDocumento = async () => {
    setLoadingText('Subiendo documento...');
    setLoading(true);
    try {
      const data = new FormData();
      data.append(nombreDocumento, file);
      await subirDocumentoAsociado(codigo, data);
      navigate(`../${slug}/${codigo}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: solicitud?.solicitud?.tramite?.titulo, href: `/${slug}` },
    { label: codigo, href: `/${slug}/${codigo}` },
    { label: 'Subir documento', href: `/${slug}/${codigo}/subir-documento` },
  ];

  return (
    <>
      <LoadingOverlay show={loading} text={loadingText} />
      <div className="bg-[#fff] max-w-[60rem] p-10 mx-auto mt-10 rounded shadow shadow-slate-400">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        {/* Encabezado con el estado de la solicitud */}
        <div className="flex items-center gap-5 mt-4">
          <h1 className="text-xl font-bold">
            {infoSolicitud?.tramite.titulo}: {infoSolicitud?.codigo}
          </h1>
          <StatusTag status={infoSolicitud?.estado} />
          <OriginTag status={infoSolicitud?.origen} />
        </div>

        {/* Fecha de la solicitud */}
        <p className="text-slate-500">
          <strong>Fecha de ingreso: </strong>
          {formatDate(infoSolicitud?.createdAt, 'DD [de] MMMM [de] YYYY [a las] HH:mm')}
        </p>
        <div className="mt-4">
          <h2 className="text-xl mb-2 font-semibold">Subir documento asociado</h2>
          <Input
            value={nombreDocumento}
            onChange={setNombreDocumento}
            label="Nombre del documento"
          />
          <Upload
            file={file}
            setFile={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <div className="my-4">
            <Button
              isLoading={loading}
              onClick={onSubirDocumento}
              variant="secondary"
              text="Agregar documento"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubirDocumento;
