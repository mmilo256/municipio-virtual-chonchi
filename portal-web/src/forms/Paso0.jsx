import Input from "../components/ui/Input"
import { validationRules } from "./validations"

const Paso0 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="name"
                label={"Nombre completo"}
                register={register}
                error={errors["name"]}
                disabled />
            <Input
                name="rut"
                label={"RUT"}
                register={register}
                error={errors["rut"]}
                disabled />
            <Input
                name="email"
                label={"Correo electrónico"}
                type="email"
                register={register}
                error={errors["email"]}
                validations={{
                    required: validationRules.required,
                    pattern: validationRules.email
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