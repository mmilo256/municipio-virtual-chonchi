import Input from "../../components/ui/Input"
import { validationRules } from "../validations"

const Paso1 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="orgName"
                label="Nombre de la organización"
                register={register}
                error={errors["orgName"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgRut"
                label="RUT de la organización"
                register={register}
                type="rut"
                error={errors["orgRut"]}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgAddress"
                label="Dirección"
                error={errors["orgAddress"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgEmail"
                label="Correo electrónico"
                error={errors["orgEmail"]}
                register={register}
                type="email"
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="orgPhone"
                label="Número de teléfono"
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
                options={[{ label: "hola", value: "hola" }]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
        </>
    )
}

export default Paso1