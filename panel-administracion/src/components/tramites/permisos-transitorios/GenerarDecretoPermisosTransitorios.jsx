import { useParams } from "react-router-dom"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import { useEffect, useState } from "react"
import { generarDecreto } from "../../../services/permisosTransitoriosServices"

const GenerarDecretoPermisosTransitorios = () => {

    const { id } = useParams()

    // Estados
    const [numDecreto, setNumDecreto] = useState("")
    const [actividad, setActividad] = useState("")
    const [ubicacion, setUbicacion] = useState("")
    const [organizacion, setOrganizacion] = useState("")
    const [rutOrganizacion, setRutOrganizacion] = useState("")
    const [presidente, setPresidente] = useState("")
    const [rutPresidente, setRutPresidente] = useState("")
    const [fechaInicio, setFechaInicio] = useState("")
    const [horaInicio, setHoraInicio] = useState("")
    const [fechaTermino, setFechaTermino] = useState("")
    const [horaTermino, setHoraTermino] = useState("")
    const [esValido, setEsValido] = useState(false)

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
            const response = await generarDecreto(id, data)
            console.log(response)
            alert("Todo bien")
        } catch (error) {
            console.log(error)
            alert("Todo mal")

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
                    <Button text="Generar decreto" type="submit" variant="secondary" isValid={esValido} />
                </div>
            </form>
        </div>
    )
}

export default GenerarDecretoPermisosTransitorios