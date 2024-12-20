import Button from "./buttons/Button"

const RequestPreview = ({ onClickPrev }) => {
    return (
        <div><div className="flex justify-end py-5 gap-4">
            <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
            <Button variant="secondary" type="submit">Enviar solicitud</Button>
        </div></div>
    )
}

export default RequestPreview