import { Routes, Route, useNavigate } from "react-router-dom"
import Button from "../ui/buttons/Button"
import { useEffect, useState } from "react"
import { fetchFormInputs, fetchProcedureById } from "../../services/proceduresServices"
import useFormsStore from "../../stores/useFormsStore"
import ProcedureDetails from "../ui/ProcedureDetails"
import FormularioPermisosTransitorios from "./FormularioPermisosTransitorios"
import { PROCEDURES_ID } from "../../constants/constants"

const PermisosTransitorios = () => {

    // Estados
    const [procedure, setProcedure] = useState({})
    const setInputs = useFormsStore(state => state.setInputs)

    // Hooks
    const navigate = useNavigate()

    // Obtener toda la información del trámite, incluyendo campos
    useEffect(() => {
        const loadProcedureData = async () => {
            const procedure = await fetchProcedureById(PROCEDURES_ID.permisosTrasitorios)
            const inputs = await fetchFormInputs(PROCEDURES_ID.permisosTrasitorios)
            setProcedure(procedure)
            setInputs(inputs)
        }
        loadProcedureData()
    }, [setInputs])

    const startProcedure = async () => {
        navigate("formulario")
    }

    // Función para descargar documento
    const onDownloadDoc = () => {
        alert("Documento descargado")
    }

    const DownloadDocButton = () => {
        return (
            <Button onClick={onDownloadDoc}>Descargar documento</Button>
        )
    }

    return (
        <div>
            {/* Componente de navegación principal */}
            <Routes>
                <Route path="/" element={<ProcedureDetails data={procedure} onClick={startProcedure} extraReq={<DownloadDocButton />} />} />
                <Route path="formulario" element={<FormularioPermisosTransitorios />} />
            </Routes>
        </div>
    )
}

export default PermisosTransitorios