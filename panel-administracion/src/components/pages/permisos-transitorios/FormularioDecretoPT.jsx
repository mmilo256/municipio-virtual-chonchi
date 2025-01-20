import { useLocation, useNavigate } from "react-router-dom"
import { approveRequestPT } from "../../../services/permisosTransitoriosServices"
import FormLayout from "../../common/FormLayout"
import useInputsGenerarDecreto from "../../../hooks/permisos-transitorios/useInputsGenerarDecreto"

// Componente FormDecreto: Permite generar un decreto para una solicitud de permiso transitorio
const FormDecreto = () => {

    // Obtenemos el estado de la ubicación (location) que contiene la información de la solicitud
    const location = useLocation()
    const { id, activity, orgName, orgRut, presidentName, presidentRut, startDate, startTime, endTime, place } = location.state

    const {
        inputs,
        decreto,
        actividad,
        organizacion,
        rutOrganizacion,
        presidente,
        rutPresidente,
        fechaInicio,
        horaInicio,
        horaTermino,
        ubicacion
    } = useInputsGenerarDecreto(activity, orgName, orgRut, presidentName, presidentRut, startDate, startTime, endTime, place)
    // Usamos useNavigate para redirigir después de generar el decreto
    const navigate = useNavigate()

    // Función para generar el decreto con los datos del formulario y enviarlo al backend
    const generarDecreto = async () => {
        const data = {
            n_dec: decreto,
            activity_name: actividad,
            org_name: organizacion,
            org_rut: rutOrganizacion,
            owner_name: presidente,
            owner_rut: rutPresidente,
            start_date: fechaInicio,
            start_time: horaInicio,
            end_time: horaTermino,
            place: ubicacion
        }
        try {
            // Llamamos al servicio que genera el decreto
            await approveRequestPT(id, data)
            // Mostramos un mensaje de éxito y redirigimos a la vista de la solicitud
            alert("Decreto generado con éxito")
            navigate(`../${id}`)
        } catch (error) {
            // Si ocurre un error, mostramos un mensaje de error en la interfaz
            alert("No se pudo generar el decreto")
            console.log(error)
            throw new Error(`Ha ocurrido un error: ${error.message}`);
        }
    }

    return (
        <div>
            <FormLayout cols="2" submitText="Generar decreto" onSubmit={generarDecreto} title="Generar decreto para la solicitud" inputs={inputs} />
        </div>
    )
}

export default FormDecreto
