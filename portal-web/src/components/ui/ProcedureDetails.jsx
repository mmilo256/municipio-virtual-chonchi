import { useEffect, useState } from "react"
import Container from "./Container"
import Heading from "./Heading"
import Button from "./buttons/Button"
import { fetchProcedureById } from "../../services/procedures.service"


const ProcedureDetails = ({ id }) => {

    const [procedure, setProcedure] = useState({})

    // Obtener toda la información del trámite, incluyendo campos
    useEffect(() => {
        (async () => {
            const data = await fetchProcedureById(id)
            setProcedure(data)
        })()
    }, [id])

    return (
        <Container>
            <div className="mb-4">
                <Heading className="text-center md:text-left">{procedure?.titulo}</Heading>
            </div>
            <div className="block md:hidden mb-2">
                <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
            </div>
            <div className="grid md:grid-cols-9 gap-5 text-slate-700">
                <main className="md:col-span-6 pr-10">
                    <article className="mb-4">
                        <Heading align="left" level={3}>Descripción</Heading>
                        <p className="text-justify">{procedure?.descripcion}</p>
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Requisitos</Heading>
                        <p className="text-justify">{procedure?.requisitos}</p>
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Costo</Heading>
                        <p>{procedure?.costo || "No tiene costo"}</p>
                    </article>
                    {procedure?.costo !== 0 && <article className="mb-4">
                        <Heading align="left" level={3}>Modalidad de pago</Heading>
                        <p>{procedure?.modaldad_pago}</p>
                    </article>}
                </main>
                <div className="md:col-span-3 max-h-min shadow-lg rounded p-5 shadow-slate-400">
                    <Heading align="center" level={3}>Contacto y atención</Heading>
                    <Heading align="left" level={4}>Dirección</Heading>
                    <p className="break-words">{procedure?.direccion}</p>
                    <Heading align="left" level={4}>Horario de atención</Heading>
                    <p className="break-words">{procedure?.horario_atencion}</p>
                    <Heading align="left" level={4}>Correo electrónico</Heading>
                    <p className="break-words">{procedure?.email}</p>
                    <Heading align="left" level={4}>Teléfono(s)</Heading>
                    <p className="break-words">{procedure?.telefono}</p>
                    <div className="mt-4 hidden md:block">
                        <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProcedureDetails