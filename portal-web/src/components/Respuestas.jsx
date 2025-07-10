import RespuestasPermisosTransitorios from "../forms/permisos-transitorios/RespuestasPermisosTransitorios"

const Respuestas = ({ tramiteId, data, docs }) => {
    let component
    switch (tramiteId) {
        case 1:
            component = <RespuestasPermisosTransitorios data={data} docs={docs} />
            break;
        default:
            <p>No hay respuestas</p>
            break
    }
    return component
}

export default Respuestas