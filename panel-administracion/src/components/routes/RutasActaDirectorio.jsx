import { Route, Routes } from 'react-router-dom';
import FormularioDocumentoAsociado from '../pages/common/FormularioDocumentoAsociado';
import Solicitudes from '../pages/common/Solicitudes';
import { PROCEDURES_ID } from '../../../config';
import IndexActaDirectorio from '../tramites/acta-directorio/IndexActaDirectorio';

const RutasActaDirectorio = () => {
  const tramite = 'Depósito de acta de elección de directorio';
  const tramiteHref = '/acta-directorio';

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
              tramiteId={PROCEDURES_ID.actaDirectorio}
              title={`Solicitudes de ${tramite}`}
              breadcrumbsData={data}
            />
          }
        />
        <Route path="/:id" element={<IndexActaDirectorio />} />
        <Route path="/:id/documentos-asociados" element={<FormularioDocumentoAsociado />} />
      </Routes>
    </div>
  );
};

export default RutasActaDirectorio;
