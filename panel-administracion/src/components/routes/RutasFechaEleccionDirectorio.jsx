import { Route, Routes } from 'react-router-dom';
import FormularioDocumentoAsociado from '../pages/common/FormularioDocumentoAsociado';
import Solicitudes from '../pages/common/Solicitudes';
import { PROCEDURES_ID } from '../../../config';
import IndexFechaEleccionDirectorio from '../tramites/fecha-eleccion-directorio/IndexFechaEleccionDirectorio';

const RutasFechaEleccionDirectorio = () => {
  const tramite = 'Comunicación fecha de elección de directorio';
  const tramiteHref = '/fecha-eleccion-directorio';

  const data = {
    tramite,
    tramiteHref,
  };

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <Solicitudes
              tramiteId={PROCEDURES_ID.fechaEleccionDirectorio}
              title={`Solicitudes de ${tramite}`}
              breadcrumbsData={data}
            />
          }
        />
        <Route path="/:id" element={<IndexFechaEleccionDirectorio />} />
        <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
      </Routes>
    </div>
  );
};

export default RutasFechaEleccionDirectorio;
