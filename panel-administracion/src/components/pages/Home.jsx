//import Alert from "../ui/Alert"
import { useEffect, useState } from "react"
import useAuthStore from "../../stores/useAuthStore"
import HomeSection from "../home/HomeSection"
import ProcedureButton from "../home/ProcedureButton"
import RecentActivity from "../home/RecentActivity"
import { obtenerTramites } from "../../services/proceduresServices"

const Home = () => {

    const [procedures, setProcedures] = useState([])
    const { sessionData } = useAuthStore(state => state)

    // Obtener los trámites según los permisos del usuario
    useEffect(() => {
        (async () => {
            const data = await obtenerTramites()
            setProcedures(data)
        })()
    }, [])

    return (
        <div>
            {/* <Alert type="warning" text="Hay cosas pendientes" /> */}
            <main className="grid grid-cols-1 gap-4 mt-6">
                <p className="text-4xl">Bienvenido(a), {sessionData.names}</p>
                <HomeSection title="Solicitudes por trámite">
                    <div className="grid grid-cols-2 gap-2">
                        {procedures.map((procedure, index) => (
                            <ProcedureButton
                                key={index}
                                to={procedure.nombre}
                                text={procedure.titulo}
                                description={procedure.descripcion_corta}
                            />
                        ))}
                    </div>
                </HomeSection>
                <HomeSection title="Actividad reciente">
                    <div className="flex flex-col gap-2">
                        <RecentActivity employee="Juan Pérez" action="Aprobó la solicitud" requestId={2778} procedure="Permiso transitorio" time="Hace 2 horas" />
                        <RecentActivity employee="María López" action="Rechazó la solicitud" requestId={1945} procedure="Permiso de construcción" time="Hace 5 horas" />
                    </div>
                </HomeSection>
            </main>
        </div>

    )
}

export default Home