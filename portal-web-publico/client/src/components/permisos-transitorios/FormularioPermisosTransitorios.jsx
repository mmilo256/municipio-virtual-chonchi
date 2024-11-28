import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import useFormsStore from "../../stores/useFormsStore"
import Form from "../ui/Form"

const FIRST_STEP = 1
const LAST_STEP = 3

const FormularioPermisosTransitorios = () => {
    // ESTADOS
    // Pasos del formulario
    const [step, setStep] = useState(1)
    const [currentInputs, setCurrentInputs] = useState([])
    const [currentFormTitle, setCurrentFormTitle] = useState("")

    // Estado local del formulario
    const [formData, setFormData] = useState({
        orgName: "",
        orgRut: "",
        orgAddress: "",
        orgEmail: "",
        orgPhone: "",
        orgType: "",
        presidentName: "",
        presidentRut: "",
        presidentAddress: "",
        presidentEmail: "",
        presidentPhone: "",
        presidentPhone2: "",
        permissionName: "",
        permissionPlace: "",
        permissionStartDate: "",
        permissionStartTime: "",
        permissionEndDate: "",
        permissionEndTime: "",
        permissionAlcohol: "",
        permissionFood: "",
        permissionDescription: "",
        permissionPurpose: ""
    })

    // Inputs
    const inputs = useFormsStore(state => state.inputs)

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
            default:
                break;
        }
        setCurrentInputs(filteredInputs)
        setCurrentFormTitle(formTitle)
    }, [inputs, step])

    // Hook para navegación
    const navigate = useNavigate()

    // Función para navegar a la página anterior
    const onClickPrev = () => {
        if (step > FIRST_STEP) {
            setStep(prev => prev - 1)
        } else {
            navigate("/permisos-transitorios")
        }
    }
    const onClickNext = () => {
        console.log(formData)
        if (step < LAST_STEP) {
            setStep(prev => prev + 1)
        } else {
            alert("Formulario enviado!")
        }
    }



    return (
        <Form
            title="SOLICITUD DE AUTORIZACIÓN ESPECIAL TRANSITORIA"
            formData={formData}
            onChange={setFormData}
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
