import Layout from "../layouts/Layout"
import Container from "./Container"
import Heading from "./Heading"
import Skeleton from "./Skeleton"
import Button from "./buttons/Button"

const GuideLayoutSkeleton = () => {

    return (
        <Layout>
            <Container>
                <div className="mb-4">
                    <Heading className="text-center md:text-left"><Skeleton /></Heading>
                </div>
                <div className="grid md:grid-cols-9 gap-5 text-slate-700">
                    <main className="md:col-span-6 pr-10">
                        <article className="mb-4">
                            <Heading align="left" level={3}>Descripción</Heading>
                            <p className="text-justify"><Skeleton /></p>
                        </article>
                        <article className="mb-4">
                            <Heading align="left" level={3}>Información adicional</Heading>
                            <ul className="list-disc list-inside">
                                <Skeleton />
                            </ul>
                        </article>
                        <article className="mb-4">
                            <Heading align="left" level={3}>Requisitos</Heading>
                            <ul className="list-disc list-inside">
                                <Skeleton />
                            </ul>
                        </article>
                        <article className="mb-4">
                            <Heading align="left" level={3}>Costo</Heading>
                            <p><Skeleton /></p>
                        </article>
                        <article className="mb-4">
                            <Heading align="left" level={3}>Modalidad de pago</Heading>
                            <p><Skeleton /></p>
                        </article>
                    </main>
                    <div className="md:col-span-3 max-h-min shadow-lg rounded p-5 shadow-slate-400">
                        <Heading align="center" level={3}>Contacto y atención</Heading>
                        <Heading align="left" level={4}>Dirección</Heading>
                        <p className="break-words"><Skeleton /></p>
                        <Heading align="left" level={4}>Horario de atención</Heading>
                        <p className="break-words"><Skeleton /></p>
                        <Heading align="left" level={4}>Correo electrónico</Heading>
                        <p className="break-words"><Skeleton /></p>
                        <Heading align="left" level={4}>Teléfono(s)</Heading>
                        <p className="break-words"><Skeleton /></p>
                        <div className="mt-4">
                            <Button variant="secondary" fullWidth>Iniciar trámite</Button>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default GuideLayoutSkeleton