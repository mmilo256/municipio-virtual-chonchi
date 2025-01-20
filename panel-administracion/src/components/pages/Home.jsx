//import Alert from "../ui/Alert"
import HomeSection from "../home/HomeSection"
import ProcedureButton from "../home/ProcedureButton"
// import RecentActivity from "./RecentActivity"

const Home = () => {

    return (
        <div>
            {/* <Alert type="warning" text="Hay cosas pendientes" /> */}
            <main className="grid grid-cols-1 gap-4 mt-6">
                <HomeSection title="Solicitudes por trámite">
                    <div className="grid grid-cols-2 gap-2">
                        <ProcedureButton to="permisos-transitorios" text="Permisos Transitorios" color="bg-blue-500 hover:bg-blue-600" />
                        <ProcedureButton text="Trámite 2" color="bg-orange-500 hover:bg-orange-600" />
                        <ProcedureButton text="Trámite 3" color="bg-cyan-500 hover:bg-cyan-600" />
                        <ProcedureButton text="Trámite 4" color="bg-amber-500 hover:bg-amber-600" />
                    </div>
                </HomeSection>
                {/* <HomeSection title="Actividad reciente">
                    <div className="flex flex-col gap-2">
                        <RecentActivity employee="Juan Pérez" action="Aprobó la solicitud" requestId={2778} procedure="Permiso transitorio" time="Hace 2 horas" />
                        <RecentActivity employee="María López" action="Rechazó la solicitud" requestId={1945} procedure="Permiso de construcción" time="Hace 5 horas" />
                    </div>
                </HomeSection> */}
            </main>
        </div>

    )
}

export default Home