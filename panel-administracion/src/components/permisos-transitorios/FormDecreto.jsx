import { useLocation } from "react-router-dom"
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useState } from "react"
import { approveRequestPT } from "../../services/permisosTransitoriosServices"

const FormDecreto = () => {

    const location = useLocation()
    const { id, activity, orgName, orgRut, presidentName, presidentRut, startDate, startTime, endTime, place } = location.state

    const [decreto, setDecreto] = useState("")
    const [actividad, setActividad] = useState(activity || "")
    const [organizacion, setOrganizacion] = useState(orgName || "")
    const [rutOrganizacion, setRutOrganizacion] = useState(orgRut || "")
    const [presidente, setPresidente] = useState(presidentName || "")
    const [rutPresidente, setRutPresidente] = useState(presidentRut || "")
    const [fechaInicio, setFechaInicio] = useState(startDate || "")
    const [horaInicio, setHoraInicio] = useState(startTime || "")
    const [horaTermino, setHoraTermino] = useState(endTime || "")
    const [ubicacion, setUbicacion] = useState(place || "")

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
            await approveRequestPT(data)
            alert("Decreto generado con éxito")
        } catch (error) {
            console.log(error)
            throw new Error(`Ha ocurrido un error: ${error.message}`);

        }

    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Generar decreto para la solicitud #{id}</h1>
            <form className="bg-[#fff] p-4 shadow rounded mb-4" action="">
                <div className="max-w-36">
                    <Input value={decreto} onChange={setDecreto} label="N° decreto" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <Input value={actividad} onChange={setActividad} label="Nombre de la actividad" />
                    <Input value={organizacion} onChange={setOrganizacion} label="Nombre de la organización" />
                    <Input value={rutOrganizacion} onChange={setRutOrganizacion} label="RUT de la organización" />
                    <Input value={presidente} onChange={setPresidente} label="Nombre del presidente" />
                    <Input value={rutPresidente} onChange={setRutPresidente} label="RUT del presidente" />
                    <Input type="date" value={fechaInicio} onChange={setFechaInicio} label="Fecha de inicio" />
                    <Input type="time" value={horaInicio} onChange={setHoraInicio} label="Hora de inicio" />
                    <Input type="time" value={horaTermino} onChange={setHoraTermino} label="Hora de término" />
                    <Input value={ubicacion} onChange={setUbicacion} label="Ubicación" />
                </div>
                <div className="my-4 flex justify-end">
                    <Button onClick={generarDecreto} variant="secondary" text="Generar decreto" />
                </div>
            </form>

        </div>
    )
}

export default FormDecreto