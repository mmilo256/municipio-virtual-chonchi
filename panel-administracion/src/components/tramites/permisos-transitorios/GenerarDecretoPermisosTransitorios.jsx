import { useLocation, useNavigate, useParams } from "react-router-dom"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { useEffect, useState } from "react"
import { generarDecreto } from "../../../services/permisosTransitoriosServices"
import { updateRequestStatus } from "../../../services/requestsServices"

const GenerarDecretoPermisosTransitorios = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { request } = location.state
    const respuestas = request?.respuestas

    // Estados
    const [numDecreto, setNumDecreto] = useState("")
    const [actividad, setActividad] = useState(respuestas?.permissionName || "")
    const [ubicacion, setUbicacion] = useState(respuestas?.permissionPlace || "")
    const [organizacion, setOrganizacion] = useState(respuestas?.orgName || "")
    const [rutOrganizacion, setRutOrganizacion] = useState(respuestas?.orgRut || "")
    const [presidente, setPresidente] = useState(respuestas?.presidentName || "")
    const [rutPresidente, setRutPresidente] = useState(respuestas?.presidentRut || "")
    const [fechaInicio, setFechaInicio] = useState(respuestas?.permissionStartDate || "")
    const [horaInicio, setHoraInicio] = useState(respuestas?.permissionStartTime || "")
    const [fechaTermino, setFechaTermino] = useState(respuestas?.permissionEndDate || "")
    const [horaTermino, setHoraTermino] = useState(respuestas?.permissionEndTime || "")
    const [esValido, setEsValido] = useState(false)

    const [loading, setLoading] = useState(false)

    // Validación de campos
    useEffect(() => {
        if (numDecreto &&
            actividad &&
            ubicacion &&
            organizacion &&
            rutOrganizacion &&
            presidente &&
            rutPresidente &&
            fechaInicio &&
            horaInicio &&
            fechaTermino &&
            horaTermino) {
            setEsValido(true)
        } else {
            setEsValido(false)
        }
    }, [numDecreto,
        actividad,
        ubicacion,
        organizacion,
        rutOrganizacion,
        presidente,
        rutPresidente,
        fechaInicio,
        horaInicio,
        fechaTermino,
        horaTermino]
    )

    // Enviar formulario
    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        const data = {
            numDecreto,
            actividad,
            ubicacion,
            organizacion,
            rutOrganizacion,
            presidente,
            rutPresidente,
            fechaInicio,
            horaInicio,
            fechaTermino,
            horaTermino
        }
        try {
            await generarDecreto(id, data)
            await updateRequestStatus(id, "por firmar")
            alert("Decreto generado exitosamente")
            navigate(`../${id}`)
        } catch (error) {
            console.log(error)
            alert("No se pudo generar el decreto")

        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Generar decreto</h1>
            <form onSubmit={onSubmit} >
                <div className="max-w-52">
                    <Input value={numDecreto} onChange={setNumDecreto} type="number" label="N° decreto" />
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <Input value={actividad} onChange={setActividad} label="Nombre de la actividad" />
                    <Input value={ubicacion} onChange={setUbicacion} label="Ubicación" />
                    <Input value={organizacion} onChange={setOrganizacion} label="Nombre de la organización" />
                    <Input value={rutOrganizacion} onChange={setRutOrganizacion} label="RUT de la organización" />
                    <Input value={presidente} onChange={setPresidente} label="Nombre del presidente" />
                    <Input value={rutPresidente} onChange={setRutPresidente} label="RUT del presidente" />
                    <Input value={fechaInicio} onChange={setFechaInicio} label="Fecha de inicio" type="date" />
                    <Input value={horaInicio} onChange={setHoraInicio} label="Hora de inicio" type="time" />
                    <Input value={fechaTermino} onChange={setFechaTermino} label="Fecha de término" type="date" />
                    <Input value={horaTermino} onChange={setHoraTermino} label="Hora de término" type="time" />
                </div>
                <div className="flex justify-end">
                    <Button isLoading={loading} text="Generar decreto" type="submit" variant="secondary" isValid={esValido} />
                </div>
            </form>
        </div>
    )
}

export default GenerarDecretoPermisosTransitorios