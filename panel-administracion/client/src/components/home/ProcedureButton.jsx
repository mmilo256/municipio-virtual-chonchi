import { TiDocumentText } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'

const ProcedureButton = ({ text = "Trámite", color = "bg-slate-600 hover:bg-slate-500", to }) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(to)
    }

    return (
        <button onClick={handleNavigate} className={`${color} text-white py-4 w-full flex items-center justify-center gap-2`}>
            <TiDocumentText size={30} />
            <span>{text}</span>
        </button>
    )
}

export default ProcedureButton