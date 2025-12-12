import { useParams } from 'react-router-dom';
import RespuestasPermisosTransitorios from '../../formularios/administracion-municipal/permisos-transitorios/RespuestasPermisosTransitorios';
import RespuestasFechaEleccionDirectorio from '../../formularios/secretaria-municipal/fecha-eleccion-directorio/RespuestasFechaEleccionDirectorio';
import RespuestasActaDirectorio from '../../formularios/secretaria-municipal/acta-directorio/RespuestasActaDirectorio';

const Respuestas = ({ data, docs }) => {
  const { slug } = useParams();

  let component;
  switch (slug) {
    case 'permisos-transitorios':
      component = <RespuestasPermisosTransitorios data={data} docs={docs} />;
      break;
    case 'fecha-eleccion-directorio':
      component = <RespuestasFechaEleccionDirectorio data={data} docs={docs} />;
      break;
    case 'acta-directorio':
      component = <RespuestasActaDirectorio data={data} docs={docs} />;
      break;

    default:
      component;
      break;
  }
  return component;
};

export default Respuestas;
