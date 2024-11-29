import Container from "./Container"
import Heading from "./Heading"
import Input from "./Input"
import Button from "./buttons/Button"
import { useForm } from 'react-hook-form'

const Form = ({
    title,
    step,
    currentInputs,
    currentFormTitle,
    onClickPrev,
    onClickNext,
    lastStep
}) => {

    // ESTADOS
    // Formulario
    const { register, handleSubmit, formState: { errors } } = useForm()
    // FUNCIONES
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (step !== lastStep) {
            onClickNext()
        }
    })

    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{step}. {currentFormTitle}</Heading>
            <form onSubmit={onSubmit} name="permisos-transitorios-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-6">
                    {currentInputs.map(input => {
                        return (
                            <Input
                                key={input.id}
                                register={register}
                                name={input.nombre}
                                min={input.min}
                                error={errors[input.nombre]}
                                max={input.max}
                                label={input.etiqueta}
                                options={input.opciones}
                                // required={input.es_requerido}
                                required={true}
                                placeholder={input.placeholder}
                                type={input.tipo} />
                        )
                    })}

                </div>
                <div className="flex justify-end py-5 gap-4">
                    <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                    {<Button type="submit" variant="secondary">{step === lastStep ? "Enviar solicitud" : "Siguiente"}</Button>}
                </div>
            </form>


        </Container>
    )
}

export default Form
