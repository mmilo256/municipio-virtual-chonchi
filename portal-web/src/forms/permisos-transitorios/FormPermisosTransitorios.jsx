import { useForm } from "react-hook-form"
import Button from "../../components/ui/buttons/Button"
import { useEffect, useState } from "react"
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
import FormCompleted from "../FormCompleted"
import FormLayout from "../FormLayout"

const FormPermisosTransitorios = () => {

    const navigate = useNavigate()

    const { sessionData } = useAuthStore()

    const { register, handleSubmit, setValue, watch, formState: { errors }, getValues } = useForm()
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

    const [isLoading, setIsLoading] = useState(false)

    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (docs.docCI &&
            docs.docCertificadoAntecedentes &&
            docs.docDeclaracionJurada &&
            docs.docFirmaPresidente &&
            docs.docOcupacionRecinto &&
            docs.docRutTributario &&
            docs.docVigenciaPersonaJuridica) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [docs])

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
            navigate("../permisos-transitorios")
        }
    }

    const onSubmit = async (data) => {
        setIsLoading(true)
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
                setStep(prev => prev + 1)
            } catch (error) {
                console.log(error)
                alert("Hubo un error")
            }
        }
        setIsLoading(false)
    }

    if (step === 6) {
        return <FormCompleted text="Tu solicitud se ha enviado exitosamente a la Ilustre Municipalidad de Chonchi" />
    }

    return (

        <FormLayout titulo="Autorización Especial Transitoria" nombre="permisos-transitorios">
            <Heading level={3}>{stepTitles[step]}</Heading>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && <Paso0 register={register} errors={errors} setValue={setValue} />}
                {step === 1 && <Paso1 register={register} errors={errors} />}
                {step === 2 && <Paso2 register={register} errors={errors} />}
                {step === 3 && <Paso3 register={register} errors={errors} getValues={getValues} watch={watch} />}
                {step === 4 && <Paso4 register={register} docs={docs} setDocs={setDocs} />}
                {step === 5 && <ConfirmarFormularioPT />}
                <div className="mt-4 flex gap-2 justify-end">
                    {!isLoading && <Button onClick={prevStep} type="button">Anterior</Button>}
                    <Button isLoading={isLoading} disabled={step === 4 && !isValid} variant="secondary" type="submit">{step < lastStep ? "Siguiente" : "Finalizar"}</Button>
                </div>
            </form>
        </FormLayout>

    )
}

export default FormPermisosTransitorios