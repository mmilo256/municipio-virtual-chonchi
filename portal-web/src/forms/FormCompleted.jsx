import { useEffect } from "react";
import Button from "../components/ui/buttons/Button"
import Container from "../components/ui/Container"
import Heading from "../components/ui/Heading"
import { ToastContainer, toast } from 'react-toastify';

const FormCompleted = ({ text }) => {

    useEffect(() => {
        toast.success("Se ha enviado la solicitud exitosamente")
    }, [])

    return (
        <Container>
            <ToastContainer />
            <div className="py-24">
                <Heading className="text-center" level={1}>¡Solicitud enviada!</Heading>
                <p className="text-center mb-3">{text}</p>
                <div className="max-w-fit mx-auto">
                    <Button type="link" href="/inicio" variant="primary">Volver al inicio</Button>
                </div>
            </div>
        </Container>

    )
}

export default FormCompleted