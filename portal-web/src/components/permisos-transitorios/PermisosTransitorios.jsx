import { Routes, Route, useNavigate } from "react-router-dom"  // Importa componentes de React Router para manejar rutas
import Button from "../ui/buttons/Button"  // Componente de botón personalizado
import { useEffect, useState } from "react"  // Importa hooks de React
import { fetchProcedureById } from "../../services/proceduresServices"  // Funciones para obtener datos del backend
import ProcedureDetails from "../ui/ProcedureDetails"  // Componente para mostrar los detalles del trámite
import { PROCEDURES_ID } from "../../constants/constants"  // Importa los ID de los procedimientos definidos en las constantes
import FormPermisosTransitorios from "../../forms/permisos-transitorios/FormPermisosTransitorios"

const PermisosTransitorios = () => {

    // Estados
    const [procedure, setProcedure] = useState({})  // Estado para almacenar los detalles del procedimiento

    // Hooks
    const navigate = useNavigate()  // Hook de navegación para redirigir a otras rutas

    // Obtener toda la información del trámite, incluyendo campos
    useEffect(() => {
        const loadProcedureData = async () => {
            // Obtiene los detalles del trámite y los campos del formulario
            const procedure = await fetchProcedureById(PROCEDURES_ID.permisosTransitorios)
            setProcedure(procedure)  // Guarda los detalles del procedimiento en el estado
        }
        loadProcedureData()  // Llama a la función para cargar los datos
    }, [])  // Solo se ejecuta cuando cambia `setInputs`

    // Función para iniciar el procedimiento y redirigir al formulario
    const startProcedure = async () => {
        navigate("formulario")  // Redirige al componente `FormularioPermisosTransitorios`
    }

    // Función que simula la descarga de un documento
    const onDownloadDoc = () => {
        alert("Documento descargado")  // Muestra un mensaje de alerta cuando se simula la descarga
    }

    return (
        <div>
            {/* Definición de rutas y sus componentes correspondientes */}
            <Routes>
                {/* Ruta principal para mostrar los detalles del procedimiento */}
                <Route path="/" element={<ProcedureDetails data={procedure} onClick={startProcedure} extraReq={<Button onClick={onDownloadDoc}>Descargar documento</Button>} />} />
                {/* Ruta para mostrar el formulario cuando se inicia el procedimiento */}
                <Route path="formulario" element={<FormPermisosTransitorios />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios
