import Container from "./Container"
import Heading from "./Heading"
import Input from "./Input"
import Button from "./buttons/Button"

const Form = ({ title, formData, handleOnChange, step, currentInputs, currentFormTitle, onClickPrev, onClickNext, lastStep }) => {

    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{step}. {currentFormTitle}</Heading>
            <form name="permisos-transitorios-form" className="grid grid-cols-2 gap-4">
                {currentInputs.map(input => {
                    return (
                        <Input
                            key={input.id}
                            min={input.min}
                            max={input.max}
                            value={formData[input.name]}
                            onChange={(e) => { handleOnChange(input.nombre, e.target.value) }}
                            label={input.etiqueta}
                            options={input.opciones}
                            required={input.es_requerido}
                            placeholder={input.placeholder}
                            type={input.tipo} />
                    )
                })}
            </form>
            <div className="flex justify-end py-5 gap-4">
                <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                <Button variant="secondary" onClick={onClickNext}>{step !== lastStep ? "Siguiente" : "Enviar solicitud"}</Button>
            </div>

        </Container>
    )
}

export default Form
