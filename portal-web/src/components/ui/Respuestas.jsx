import RespuestasPermisosTransitorios from '../../formularios/administracion-municipal/permisos-transitorios/RespuestasPermisosTransitorios';

const Respuestas = ({ tramiteId, data, docs }) => {
  let component;
  switch (tramiteId) {
    case 1:
      component = <RespuestasPermisosTransitorios data={data} docs={docs} />;
      break;
    case 3:
      component = <RespuestasPermisosTransitorios data={data} docs={docs} />;
      break;

    default:
      component;
      break;
  }
  return component;
};

export default Respuestas;
