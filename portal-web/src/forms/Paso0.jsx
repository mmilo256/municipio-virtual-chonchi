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
                type="email"
                register={register}
                error={errors["email"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="phone"
                label={"Número de teléfono"}
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