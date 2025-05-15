import { useForm } from "react-hook-form"
import Button from "../../components/ui/buttons/Button"
import { useState } from "react"
import Paso0 from "../Paso0"
import Paso1 from "./Paso1"
import Paso2 from "./Paso2"
import Paso3 from "./Paso3"
import Paso4 from "./Paso4"
import Heading from "../../components/ui/Heading"
import useFormsStore from "../../stores/useFormsStore"
import ConfirmarFormularioPT from "./ConfirmarFormularioPT"
import { sendRequest } from "../../services/requests.service"
import { PROCEDURES_ID } from "../../constants/constants"
import useAuthStore from "../../stores/useAuthStore"
import { useNavigate } from "react-router-dom"
import Container from "../../components/ui/Container"
import FormCompleted from "../FormCompleted"

const FormPermisosTransitorios = () => {

    const navigate = useNavigate()

    const { sessionData } = useAuthStore()

    const { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const [docs, setDocs] = useState({
        docCI: null,
        docRutTributario: null,
        docVigenciaPersonaJuridica: null,
        docOcupacionRecinto: null,
        docDeclaracionJurada: null,
        docCertificadoAntecedentes: null,
        docFirmaPresidente: null
    })
    const { setInputsValues, setDocsValues, inputsValues, docsValues } = useFormsStore()

    const [step, setStep] = useState(0)
    const lastStep = 5
    const stepTitles = [
        "1. Contacto del solicitante",
        "2. Datos de la organización",
        "3. Datos del representante legal",
        "4. Detalle del permiso",
        "5. Antecedentes",
        "Confirmar formulario",
        "Formulario enviado"
    ]

    const prevStep = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        } else {
            navigate("..")
        }
    }

    const onSubmit = async (data) => {
        setInputsValues(data)
        setDocsValues(docs)
        if (step < lastStep) {
            setStep(prev => prev + 1)
        } else {
            const formData = {
                respuestas: inputsValues,
                documentos: docsValues,
                tramite_id: PROCEDURES_ID.permisosTransitorios,
                usuarioId: sessionData.id
            }
            try {
                await sendRequest(formData)
                alert("Se ha enviado la solicitud")
                // setStep(prev => prev + 1)
            } catch (error) {
                console.log(error)
                alert("Hubo un error")
            }
        }
    }

    if (step === 6) {
        return <FormCompleted text="Tu solicitud se ha enviado exitosamente a la Ilustre Municipalidad de Chonchi" />
    }

    return (
        <Container className="max-w-[50rem] p-4 mt-4 mx-auto bg-white shadow rounded">
            <h2 className="mt-2 text-lg text-slate-700 text-nowrap">Solicitud de Autorización Especial Transitoria</h2>
            <Heading level={3}>{stepTitles[step]}</Heading>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && <Paso0 register={register} errors={errors} setValue={setValue} />}
                {step === 1 && <Paso1 register={register} errors={errors} />}
                {step === 2 && <Paso2 register={register} errors={errors} />}
                {step === 3 && <Paso3 register={register} errors={errors} />}
                {step === 4 && <Paso4 register={register} docs={docs} setDocs={setDocs} />}
                {step === 5 && <ConfirmarFormularioPT />}
                <div className="mt-4 flex gap-2 justify-end">
                    <Button onClick={prevStep} type="button">Anterior</Button>
                    <Button variant="secondary" type="submit">{step < lastStep ? "Siguiente" : "Finalizar"}</Button>
                </div>
            </form>
        </Container>
    )
}

export default FormPermisosTransitorios