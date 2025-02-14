import Input from "../../components/ui/Input"
import { validationRules } from "../validations"

const Paso2 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="presidentName"
                label="Nombre del representante legal"
                error={errors["presidentName"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentRut"
                label="RUT del representante legal"
                error={errors["presidentRut"]}
                type="rut"
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentAddress"
                label="Dirección"
                error={errors["presidentAddress"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentEmail"
                label="Correo electrónico"
                type="email"
                error={errors["presidentEmail"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentPhone"
                label="Teléfono"
                type="phone"
                error={errors["presidentPhone"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentPhone2"
                label="Teléfono alternativo"
                type="phone"
                error={errors["presidentPhone2"]}
                register={register} />
        </>
    )
}

export default Paso2