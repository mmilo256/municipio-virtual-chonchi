import Input from "../../components/ui/Input"
import { getTodayDate } from "../../utils/utils"
import { validationRules } from "../validations"

const Paso3 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="permissionName"
                label="Nombre de la actividad"
                placeholder="Ej: Bingo bailable"
                error={errors["permissionName"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="permissionPlace"
                label="Lugar de realización"
                placeholder="Ej: Gimnasio Municipal"
                error={errors["permissionPlace"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="permissionStartDate"
                    label="Fecha de inicio"
                    error={errors["PermissionStartDate"]}
                    register={register}
                    min={getTodayDate()}
                    type="date"
                    validations={{
                        required: validationRules.required
                    }} />
                <Input
                    name="permissionStartTime"
                    label="Hora de inicio"
                    error={errors["PermissionStartTime"]}
                    register={register}
                    type="time"
                    validations={{
                        required: validationRules.required
                    }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="permissionEndDate"
                    label="Fecha de término"
                    error={errors["PermissionEndDate"]}
                    register={register}
                    min={getTodayDate()}
                    type="date"
                    validations={{
                        required: validationRules.required
                    }} />
                <Input
                    name="permissionEndTime"
                    label="Hora de término"
                    error={errors["PermissionEndTime"]}
                    register={register}
                    type="time"
                    validations={{
                        required: validationRules.required
                    }} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input
                    name="permissionAlcohol"
                    label="¿Con venta y/o consumo de alcohol?"
                    type="select"
                    options={[{ label: "Si", value: true }, { label: "No", value: false }]}
                    error={errors["permissionAlcohol"]}
                    register={register}
                    validations={{
                        required: validationRules.required
                    }} />
                <Input
                    name="permissionFood"
                    label="¿Con venta y/o consumo de alimentos?"
                    type="select"
                    options={[{ label: "Si", value: true }, { label: "No", value: false }]}
                    error={errors["permissionFood"]}
                    register={register}
                    validations={{
                        required: validationRules.required
                    }} />
            </div>
            <Input
                name="permissionDescription"
                label="Descripción de la actividad"
                placeholder="La actividad consiste en..."
                type="textarea"
                error={errors["permissionDescription"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
            <Input
                name="permissionPurpose"
                label="Destino de los fondos"
                placeholder="Los fondos recaudados serán destinados a..."
                type="textarea"
                error={errors["permissionPurpose"]}
                register={register}
                validations={{
                    required: validationRules.required
                }} />
        </>
    )
}

export default Paso3