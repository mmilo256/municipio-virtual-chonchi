import Container from "./Container"
import Heading from "./Heading"
import Input from "./Input"
import Button from "./buttons/Button"
import { useForm } from 'react-hook-form'

const Form = ({
    inputs,
    title,
    stepTitle,
    onClickPrev,
    onClickNext,
}) => {

    // ESTADOS
    // Formulario
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    // FUNCIONES
    const onSubmit = handleSubmit((data) => {
        onClickNext(data)
    })

    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{stepTitle}</Heading>
            <form onSubmit={onSubmit} name="permisos-transitorios-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-6">
                    {inputs.map(input => {
                        return (
                            <Input
                                key={input.id}
                                register={register}
                                error={errors[input.nombre]}
                                setValue={setValue}
                                name={input.nombre}
                                min={input.min}
                                max={input.max}
                                label={input.etiqueta}
                                options={input.opciones}
                                required={input.es_requerido}
                                placeholder={input.placeholder}
                                type={input.tipo} />
                        )
                    })}

                </div>
                <div className="flex justify-end py-5 gap-4">
                    <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                    {<Button type="submit" variant="secondary">Siguiente</Button>}
                </div>
            </form>

        </Container>
    )
}

export default Form
