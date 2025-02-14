import Input from "../../components/ui/Input"

const Paso2 = ({ register, errors }) => {
    return (
        <>
            <Input
                name="msg"
                label={"Mensaje"}
                type="textarea"
                register={register}
                error={errors["msg"]} />
            <Input
                name="date"
                label={"Fecha de la actividad"}
                type="date"
                register={register}
                error={errors["date"]} />
            <Input
                name="startTime"
                label={"Hora de inicio"}
                type="time"
                register={register}
                error={errors["startTime"]} />
        </>
    )
}

export default Paso2