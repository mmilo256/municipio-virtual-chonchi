import Layout from "../Layout"
import Button from "../ui/Button"
import Container from "../ui/Container"
import Heading from "../ui/Heading"

const FormCompleted = () => {
    return (
        <Layout>
            <Container>
                <div className="py-24">
                    <Heading className="text-center" level={1}>¡Solicitud enviada!</Heading>
                    <p className="text-center mb-3">Tu solicitud de permiso ha sido enviada exitosamente a la Municipalidad de Chonchi. Nos pondremos en contacto para informar si la solicitud fue aprobada o rechazada.</p>
                    <div className="max-w-fit mx-auto">
                        <Button type="link" href="/inicio" variant="primary">Volver al inicio</Button>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default FormCompleted