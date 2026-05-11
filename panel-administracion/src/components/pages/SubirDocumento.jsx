import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../ui/Breadcrumbs';
import {
  obtenerSolicitudPorCodigo,
  subirDocumentoAsociado,
} from '../../services/solicitudes.service';
import { useParams } from 'react-router-dom';
import StatusTag from '../ui/StatusTag';
import OriginTag from '../ui/OriginTag';
import { formatDate } from '../../utils/format';
import Upload from '../ui/Upload';
import Input from '../ui/Input';
import Button from '../ui/Button';

const SubirDocumento = () => {
  const { codigo } = useParams();

  const [solicitud, setSolicitud] = useState({});
  const [nombreDocumento, setNombreDocumento] = useState('');
  const [file, setFile] = useState('');
  const infoSolicitud = solicitud.solicitud;

  useEffect(() => {
    (async () => {
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [codigo]);

  const onSubirDocumento = async () => {
    const data = new FormData();
    data.append(nombreDocumento, file);
    const response = await subirDocumentoAsociado(codigo, data);
    console.log(response);
  };

  return (
    <div className="bg-[#fff] max-w-[60rem] p-10 mx-auto mt-10 rounded shadow shadow-slate-400">
      <Breadcrumbs breadcrumbs={[]} />
      {/* Encabezado con el estado de la solicitud */}
      <div className="flex items-center gap-5 mt-4">
        <h1 className="text-2xl font-bold">
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
        <Input value={nombreDocumento} onChange={setNombreDocumento} label="Nombre del documento" />
        <Upload
          file={file}
          setFile={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <div className="my-4">
          <Button onClick={onSubirDocumento} variant="secondary" text="Agregar documento" />
        </div>
      </div>
    </div>
  );
};

export default SubirDocumento;
