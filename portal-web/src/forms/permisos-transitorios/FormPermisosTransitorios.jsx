import { useForm } from "react-hook-form"
import Button from "../../components/ui/buttons/Button"
import { useState } from "react"
import Paso1 from "./Paso1"
import Paso2 from "./Paso2"
import Paso0 from "../Paso0"

const FormPermisosTransitorios = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()

    const [step, setStep] = useState(0)
    const lastStep = 2

    const prevStep = () => {
        if (step > 0) {
            setStep(prev => prev - 1)
        }
    }

    const onSubmit = (data) => {
        if (step < lastStep) {
            setStep(prev => prev + 1)
        } else {
            console.log(data)
        }
    }

    return (
        <form className="max-w-[30rem] w-[94%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
            {step === 0 && <Paso0 register={register} errors={errors} />}
            {step === 1 && <Paso1 register={register} errors={errors} />}
            {step === 2 && <Paso2 register={register} errors={errors} />}
            <div className="mt-4 flex gap-2 justify-end">
                <Button onClick={prevStep} type="button">Anterior</Button>
                <Button variant="secondary" type="submit">{step < lastStep ? "Siguiente" : "Finalizar"}</Button>
            </div>
        </form>
    )
}

export default FormPermisosTransitorios