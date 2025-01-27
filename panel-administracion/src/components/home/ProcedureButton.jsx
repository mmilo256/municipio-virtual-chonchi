import { TiDocumentText } from "react-icons/ti";
import { useNavigate } from 'react-router-dom'

const ProcedureButton = ({ text = "Trámite", description = "", to }) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(to, { state: { title: text } })
    }

    return (
        <button onClick={handleNavigate} className={`bg-secondary hover:bg-secondaryHover flex flex-col items-center text-white w-full p-4`}>
            <TiDocumentText size={40} />
            <p className="font-light text-2xl mb-2">{text}</p>
            <p className="text-red-200 text-center">{description}</p>
        </button>
    )
}

export default ProcedureButton