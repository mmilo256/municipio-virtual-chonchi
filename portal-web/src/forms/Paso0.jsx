import { useEffect } from "react"
import Input from "../components/ui/Input"
import useAuthStore from "../stores/useAuthStore"
import { getUserData } from "../utils/utils"
import { validationRules } from "./validations"

const Paso0 = ({ register, errors, setValue }) => {

    const { sessionData } = useAuthStore()

    const { fullName, rut } = getUserData(sessionData)

    useEffect(() => {
        setValue("name", fullName)
        setValue("rut", rut)
    }, [fullName, setValue, rut])

    return (
        <>
            <p className="text-slate-600 bg-slate-200 p-2 rounded mb-4">Estos datos se usarán para notificar el estado de su solicitud. En caso de rechazo o aprobación, será notificado al correo electrónico ingresado</p>
            <Input
                name="name"
                label={"Nombre completo"}
                register={register}
                error={errors["name"]}
                disabled
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="rut"
                label={"RUT"}
                register={register}
                error={errors["rut"]}
                disabled
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="email"
                label={"Correo electrónico"}
                placeholder="Ej: ejemplo@gmail.cl"
                type="email"
                register={register}
                error={errors["email"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="phone"
                label={"Número de teléfono"}
                placeholder="Ej: 965783889"
                type="phone"
                register={register}
                error={errors["phone"]}
                validations={{
                    required: validationRules.required
                }} />
        </>
    )
}

export default Paso0