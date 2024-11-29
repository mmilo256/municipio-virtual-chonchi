import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useFormsStore from "../../stores/useFormsStore"
import Form from "../ui/Form"

const FIRST_STEP = 1
const LAST_STEP = 5

const FormularioPermisosTransitorios = () => {
    // ESTADOS
    // Inputs
    const inputs = useFormsStore(state => state.inputs)

    // Pasos del formulario
    const [step, setStep] = useState(1)

    // Inputs que se renderizan en el paso actual
    const [currentInputs, setCurrentInputs] = useState([])

    // Título del paso actual
    const [currentFormTitle, setCurrentFormTitle] = useState("")

    // Hook para navegación
    const navigate = useNavigate()

    useEffect(() => {
        let filteredInputs
        let formTitle
        switch (step) {
            case 1:
                filteredInputs = inputs.slice(0, 6)
                formTitle = "Datos de la organización"
                break;
            case 2:
                filteredInputs = inputs.slice(6, 12)
                formTitle = "Datos del representante legal"
                break;
            case 3:
                filteredInputs = inputs.slice(12, 22)
                formTitle = "Detalles del permiso"
                break;
            case 4:
                filteredInputs = inputs.slice(22, 29)
                formTitle = "Antecedentes"
                break;
            case 5:
                filteredInputs = []
                formTitle = "Confirmar envío del formulario"
                break;
            default:
                break;
        }
        setCurrentInputs(filteredInputs)
        setCurrentFormTitle(formTitle)
    }, [inputs, step])

    // FUNCIONES
    // Función para navegar a la página anterior
    const onClickPrev = () => {
        if (step > FIRST_STEP) {
            setStep(prev => prev - 1)
        } else {
            navigate("/permisos-transitorios")
        }
    }

    // Función para navegar a la página siguiente
    const onClickNext = () => {
        if (step < LAST_STEP) {
            setStep(prev => prev + 1)
        } else {
            alert("Formulario enviado!")
        }
    }

    return (
        <Form
            title="SOLICITUD DE AUTORIZACIÓN ESPECIAL TRANSITORIA"
            step={step}
            currentInputs={currentInputs}
            currentFormTitle={currentFormTitle}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            lastStep={LAST_STEP}
        />
    )
}

export default FormularioPermisosTransitorios
