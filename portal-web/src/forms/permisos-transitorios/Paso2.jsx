import Input from "../../components/ui/Input"
import { validationRules } from "../validations"

const Paso2 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="presidentName"
                label="Nombre del representante legal"
                error={errors["presidentName"]}
                placeholder="Ej: Juan López Pérez"
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentRut"
                label="RUT del representante legal"
                placeholder="Ej: 15955637-K"
                error={errors["presidentRut"]}
                type="rut"
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentAddress"
                label="Dirección"
                placeholder="Ej: Calle 123"
                error={errors["presidentAddress"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentEmail"
                label="Correo electrónico"
                placeholder="Ej: correo@gmail.com"
                type="email"
                error={errors["presidentEmail"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentPhone"
                label="Teléfono"
                placeholder="Ej: 9684778841"
                type="phone"
                error={errors["presidentPhone"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="presidentPhone2"
                label="Teléfono alternativo"
                placeholder="Ej: 9684778841"
                type="phone"
                error={errors["presidentPhone2"]}
                register={register} />
        </>
    )
}

export default Paso2