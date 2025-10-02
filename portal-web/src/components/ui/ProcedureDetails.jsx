import { useEffect, useState } from "react"
import Container from "./Container"
import Heading from "./Heading"
import Button from "./buttons/Button"
import { fetchProcedureById } from "../../services/procedures.service"
import Breadcrumbs from "./Breadcrumbs"


const ProcedureDetails = ({ id }) => {

    const [procedure, setProcedure] = useState({})
    const [loading, setLoading] = useState(false)

    const breadcrumbs = [
        { label: procedure.titulo, href: `/${procedure.nombre}` }
    ]

    // Obtener toda la información del trámite, incluyendo campos
    useEffect(() => {
        (async () => {
            setLoading(true)
            const data = await fetchProcedureById(id)
            setProcedure(data)
            setLoading(false)
        })()
    }, [id])

    return (
        <Container className="text-sm">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <div className="mb-4">
                {!loading
                    ? <Heading className="text-center md:text-left text-2xl md:text-2xl">{procedure?.titulo}</Heading>
                    : <p className="bg-gray-200 rounded-full w-[40rem] animate-pulse h-10 my-4">
                        {""}
                    </p>}
            </div>
            <div className="block md:hidden mb-2">
                <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
            </div>
            <div className="grid md:grid-cols-9 gap-5 text-slate-700">
                <main className="md:col-span-6 pr-10">
                    <article className="mb-4">
                        <Heading align="left" level={4}>Descripción</Heading>
                        {!loading
                            ? <p className="text-justify">{procedure?.descripcion}</p>
                            : <p className="bg-gray-200 rounded-full w-[40rem] animate-pulse h-14"></p>}
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={4}>Requisitos</Heading>
                        {!loading
                            ? <p className="text-justify h-8">{procedure?.requisitos}</p>
                            : <p className="bg-gray-200 rounded-full w-[40rem] animate-pulse h-8"></p>}
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={4}>Costo</Heading>
                        {!loading
                            ? <p>{procedure?.costo || "No tiene costo"}</p>
                            : <p className="bg-gray-200 rounded-full w-[40rem] animate-pulse h-8"></p>}
                    </article>
                    {procedure?.costo !== 0 && <article className="mb-4">
                        <Heading align="left" level={4}>Modalidad de pago</Heading>
                        {!loading
                            ? <p>{procedure?.modaldad_pago}</p>
                            : <p className="bg-gray-200 rounded-full w-[40rem] animate-pulse h-8"></p>}
                    </article>}
                </main>
                <div className="md:col-span-3 max-h-min shadow-lg rounded p-5 shadow-slate-400">
                    <Heading align="center" level={3}>Contacto y atención</Heading>
                    <Heading align="left" level={4}>Dirección</Heading>
                    {!loading
                        ? <p className="break-words">{procedure?.direccion}</p>
                        : <p className="bg-gray-200 rounded-full w-[90%] animate-pulse h-5"></p>}
                    <Heading align="left" level={4}>Horario de atención</Heading>
                    {!loading
                        ? <p className="break-words">{procedure?.horario_atencion}</p>
                        : <p className="bg-gray-200 rounded-full w-[90%] animate-pulse h-5"></p>}
                    <Heading align="left" level={4}>Correo electrónico</Heading>
                    {!loading
                        ? <p className="break-words">{procedure?.email}</p>
                        : <p className="bg-gray-200 rounded-full w-[90%] animate-pulse h-5"></p>}
                    <Heading align="left" level={4}>Teléfono(s)</Heading>
                    {!loading
                        ? <p className="break-words">{procedure?.telefono}</p>
                        : <p className="bg-gray-200 rounded-full w-[90%] animate-pulse h-5"></p>}
                    <div className="mt-4 hidden md:block">
                        <Button href="formulario" type="link" variant="secondary" fullWidth>Iniciar trámite</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProcedureDetails