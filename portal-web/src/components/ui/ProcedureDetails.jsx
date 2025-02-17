import { useEffect, useState } from "react"
import Container from "./Container"
import Heading from "./Heading"
import Button from "./buttons/Button"
import { PROCEDURES_ID } from "../../constants/constants"
import { fetchProcedureById } from "../../services/proceduresServices"


const ProcedureDetails = () => {

    const [procedure, setProcedure] = useState({})

    console.log(procedure)

    // Obtener toda la información del trámite, incluyendo campos
    useEffect(() => {
        const loadProcedureData = async () => {
            // Obtiene los detalles del trámite y los campos del formulario
            const data = await fetchProcedureById(PROCEDURES_ID.permisosTransitorios)
            setProcedure(data)  // Guarda los detalles del procedimiento en el estado
        }
        loadProcedureData()  // Llama a la función para cargar los datos
    }, [])  // Solo se ejecuta cuando cambia `setInputs`




    return (
        <Container>
            <div className="mb-4">
                <Heading className="text-center md:text-left"></Heading>
            </div>
            <div className="block md:hidden mb-2">
                <Button variant="secondary" fullWidth>Iniciar trámite</Button>
            </div>
            <div className="grid md:grid-cols-9 gap-5 text-slate-700">
                <main className="md:col-span-6 pr-10">
                    <article className="mb-4">
                        <Heading align="left" level={3}>Descripción</Heading>
                        <p className="text-justify">{procedure.descripcion}</p>
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Información adicional</Heading>
                        {/* <ul className="list-disc list-inside">
                            {data.info_adicional.map((info, index) => (
                                <li key={index} className="mb-2">{info}</li>
                            ))}
                        </ul> */}
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Requisitos</Heading>
                        {/* <ul className="list-disc list-inside">
                            {data.requisitos.map((info, index) => (
                                <li key={index} className="mb-2">{info}</li>
                            ))}
                        </ul> */}
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Costo</Heading>
                        <p></p>
                    </article>
                    <article className="mb-4">
                        <Heading align="left" level={3}>Modalidad de pago</Heading>
                        <p></p>
                    </article>
                </main>
                <div className="md:col-span-3 max-h-min shadow-lg rounded p-5 shadow-slate-400">
                    <Heading align="center" level={3}>Contacto y atención</Heading>
                    <Heading align="left" level={4}>Dirección</Heading>
                    <p className="break-words"></p>
                    <Heading align="left" level={4}>Horario de atención</Heading>
                    <p className="break-words"></p>
                    <Heading align="left" level={4}>Correo electrónico</Heading>
                    <p className="break-words"></p>
                    <Heading align="left" level={4}>Teléfono(s)</Heading>
                    <p className="break-words"></p>
                    <div className="mt-4 hidden md:block">
                        <Button variant="secondary" fullWidth>Iniciar trámite</Button>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ProcedureDetails