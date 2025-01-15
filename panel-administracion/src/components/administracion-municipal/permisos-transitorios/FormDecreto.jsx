import { useLocation, useNavigate } from "react-router-dom"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { useState } from "react"
import { approveRequestPT } from "../../../services/permisosTransitoriosServices"

// Componente FormDecreto: Permite generar un decreto para una solicitud de permiso transitorio
const FormDecreto = () => {

    // Obtenemos el estado de la ubicación (location) que contiene la información de la solicitud
    const location = useLocation()
    const { id, activity, orgName, orgRut, presidentName, presidentRut, startDate, startTime, endTime, place } = location.state

    // Declaración de los estados locales para almacenar los valores de los campos del formulario
    const [decreto, setDecreto] = useState("") // Almacena el número del decreto
    const [actividad, setActividad] = useState(activity || "") // Almacena el nombre de la actividad
    const [organizacion, setOrganizacion] = useState(orgName || "") // Almacena el nombre de la organización
    const [rutOrganizacion, setRutOrganizacion] = useState(orgRut || "") // Almacena el RUT de la organización
    const [presidente, setPresidente] = useState(presidentName || "") // Almacena el nombre del presidente
    const [rutPresidente, setRutPresidente] = useState(presidentRut || "") // Almacena el RUT del presidente
    const [fechaInicio, setFechaInicio] = useState(startDate || "") // Almacena la fecha de inicio
    const [horaInicio, setHoraInicio] = useState(startTime || "") // Almacena la hora de inicio
    const [horaTermino, setHoraTermino] = useState(endTime || "") // Almacena la hora de término
    const [ubicacion, setUbicacion] = useState(place || "") // Almacena la ubicación

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
            {/* Título del formulario */}
            <h1 className="text-2xl font-bold mb-4">Generar decreto para la solicitud #{id}</h1>
            {/* Formulario para ingresar los datos del decreto */}
            <form className="bg-[#fff] p-4 shadow rounded mb-4" action="">
                <div className="max-w-36">
                    {/* Campo para ingresar el número del decreto */}
                    <Input value={decreto} onChange={setDecreto} label="N° decreto" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    {/* Campos para ingresar los datos relacionados con la actividad, organización, y presidente */}
                    <Input value={actividad} onChange={setActividad} label="Nombre de la actividad" />
                    <Input value={organizacion} onChange={setOrganizacion} label="Nombre de la organización" />
                    <Input value={rutOrganizacion} onChange={setRutOrganizacion} label="RUT de la organización" />
                    <Input value={presidente} onChange={setPresidente} label="Nombre del presidente" />
                    <Input value={rutPresidente} onChange={setRutPresidente} label="RUT del presidente" />
                    {/* Campos para ingresar la fecha y hora de inicio y término de la actividad */}
                    <Input type="date" value={fechaInicio} onChange={setFechaInicio} label="Fecha de inicio" />
                    <Input type="time" value={horaInicio} onChange={setHoraInicio} label="Hora de inicio" />
                    <Input type="time" value={horaTermino} onChange={setHoraTermino} label="Hora de término" />
                    {/* Campo para ingresar la ubicación de la actividad */}
                    <Input value={ubicacion} onChange={setUbicacion} label="Ubicación" />
                </div>
                <div className="my-4 flex justify-end">
                    {/* Botón para generar el decreto */}
                    <Button onClick={generarDecreto} variant="secondary" text="Generar decreto" />
                </div>
            </form>

        </div>
    )
}

export default FormDecreto
