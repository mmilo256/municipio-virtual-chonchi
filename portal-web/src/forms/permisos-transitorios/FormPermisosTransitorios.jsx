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

const FormPermisosTransitorios = () => {

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
    const { setInputsValues } = useFormsStore()

    const [step, setStep] = useState(4)
    const lastStep = 4
    const stepTitles = [
        "1. Contacto del solicitante",
        "2. Datos de la organización",
        "3. Datos del representante legal",
        "4. Detalle del permiso",
        "5. Antecedentes"
    ]

    const prevStep = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }

    const onSubmit = (data) => {
        setInputsValues(data)
        if (step < lastStep) {
            setStep(prev => prev + 1)
        } else {
            console.log(data)
        }
    }

    const showState = () => {
        console.log(docs)
    }

    return (
        <div className="max-w-[32rem] w-[94%] mx-auto">
            <Heading level={2}>Solicitud de Autorización Especial Transitoria</Heading>
            <button className="text-white bg-red-600 py-1 px-4" onClick={showState}>CLICK</button>
            <h2 className="mb-2 text-lg text-slate-700 text-nowrap">{stepTitles[step]}</h2>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {step === 0 && <Paso0 register={register} errors={errors} setValue={setValue} />}
                {step === 1 && <Paso1 register={register} errors={errors} />}
                {step === 2 && <Paso2 register={register} errors={errors} />}
                {step === 3 && <Paso3 register={register} errors={errors} />}
                {step === 4 && <Paso4 register={register} docs={docs} setDocs={setDocs} />}
                <div className="mt-4 flex gap-2 justify-end">
                    <Button onClick={prevStep} type="button">Anterior</Button>
                    <Button variant="secondary" type="submit">{step < lastStep ? "Siguiente" : "Finalizar"}</Button>
                </div>
            </form>
        </div>
    )
}

export default FormPermisosTransitorios