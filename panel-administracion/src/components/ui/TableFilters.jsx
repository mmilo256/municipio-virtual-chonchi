import { useState } from "react"

const TableFilters = ({ currentFilters, setCurrentFilters, setCurrentPage }) => {

    const [btnPendiente, setBtnPendiente] = useState(false)
    const [btnEnRevision, setBtnEnRevision] = useState(false)
    const [btnPorFirmar, setBtnPorFirmar] = useState(false)
    const [btnAprobada, setBtnAprobada] = useState(false)
    const [btnRechazada, setBtnRechazada] = useState(false)
    const [btnFinalizada, setBtnFinalizada] = useState(false)

    const onFilter = async (status) => {
        setCurrentPage(1)
        switch (status) {
            case "pendiente":
                setBtnPendiente(!btnPendiente)
                break;
            case "en revision":
                setBtnEnRevision(!btnEnRevision)
                break;
            case "por firmar":
                setBtnPorFirmar(!btnPorFirmar)
                break;
            case "aprobada":
                setBtnAprobada(!btnAprobada)
                break;
            case "rechazada":
                setBtnRechazada(!btnRechazada)
                break;
            case "finalizada":
                setBtnFinalizada(!btnFinalizada)
                break;
            default:
                break;
        }
        if (currentFilters.includes(status)) {
            const newArray = currentFilters.filter(item => item !== status)
            setCurrentFilters(newArray)
        } else {
            setCurrentFilters(prev => ([
                ...prev,
                status
            ]))
        }
    }

    const activeButtonStyles = "block rounded-full py-1 px-4 bg-slate-500 border hover:bg-slate-700 border-slate-500 hover:border-slate-700 text-white"
    const inactiveButtonStyles = "block rounded-full py-1 px-4 hover:text-slate-700 hover:border-slate-500 text-slate-600 border border-slate-300"

    return (
        <>
            <p className="mb-1 text-sm text-slate-400">Filtrar por estado de la solicitud</p>
            <div className="flex gap-2 mb-2">
                <button onClick={() => { onFilter("pendiente") }} className={`block rounded-full py-1 px-4 ${btnPendiente ? activeButtonStyles : inactiveButtonStyles}`}>Pendientes</button>
                <button onClick={() => { onFilter("en revision") }} className={`block rounded-full py-1 px-4 ${btnEnRevision ? activeButtonStyles : inactiveButtonStyles}`}>En revisión</button>
                <button onClick={() => { onFilter("por firmar") }} className={`block rounded-full py-1 px-4 ${btnPorFirmar ? activeButtonStyles : inactiveButtonStyles}`}>Por firmar</button>
                <button onClick={() => { onFilter("aprobada") }} className={`block rounded-full py-1 px-4 ${btnAprobada ? activeButtonStyles : inactiveButtonStyles}`}>Aprobadas</button>
                <button onClick={() => { onFilter("rechazada") }} className={`block rounded-full py-1 px-4 ${btnRechazada ? activeButtonStyles : inactiveButtonStyles}`}>Rechazadas</button>
                <button onClick={() => { onFilter("finalizada") }} className={`block rounded-full py-1 px-4 ${btnFinalizada ? activeButtonStyles : inactiveButtonStyles}`}>Finalizadas</button>
            </div>
        </>
    )
}

export default TableFilters