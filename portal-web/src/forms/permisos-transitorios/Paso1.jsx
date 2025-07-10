import Input from "../../components/ui/Input"
import { ORG_TYPES } from "../../constants/constants"
import { validationRules } from "../validations"

const Paso1 = ({ register, errors }) => {

    const orgTypes = ORG_TYPES.map((type) => ({
        value: type,
        label: type
    }))

    return (
        <>
            <Input
                name="orgName"
                label="Nombre de la organización"
                placeholder="Ej: Junta de vecinos 77"
                register={register}
                error={errors["orgName"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgRut"
                label="RUT de la organización"
                placeholder="Ej: 12345678-9"
                register={register}
                type="rut"
                error={errors["orgRut"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgAddress"
                label="Dirección"
                placeholder="Ej: Calle 154"
                error={errors["orgAddress"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgEmail"
                label="Correo electrónico"
                placeholder="Ej: ejemplo@gmail.com"
                error={errors["orgEmail"]}
                register={register}
                type="email"
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgPhone"
                label="Número de teléfono"
                placeholder="Ej: 954883895"
                error={errors["orgPhone"]}
                type="phone"
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgType"
                label="Tipo de organización"
                error={errors["orgType"]}
                type="select"
                options={orgTypes}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
        </>
    )
}

export default Paso1