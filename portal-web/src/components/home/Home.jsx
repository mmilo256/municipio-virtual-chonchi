import { useEffect, useState } from "react"
import Container from "../ui/Container"  // Componente para el contenedor que envuelve el contenido.
import Heading from "../ui/Heading"  // Componente para los encabezados.
import { fetchAllProcedures } from "../../services/procedures.service"  // Función para obtener todos los procedimientos del backend.
import Card from "../ui/Card"

const Home = () => {
    // Declaración del estado para almacenar los procedimientos.
    const [procedures, setProcedures] = useState([])

    console.log(procedures)

    // useEffect para cargar los procedimientos cuando el componente se monta.
    useEffect(() => {
        (async () => {
            const data = await fetchAllProcedures()
            setProcedures(data)
        })()
    }, []) // Dependencia vacía, lo que significa que solo se ejecutará una vez cuando el componente se monte.

    return (
        <>
            {/* Sección de encabezado con una imagen de fondo */}
            <div style={{ backgroundPosition: 'center 70%' }} className="relative bg-[url('/chonchi-aereo.jpg')] bg-cover bg-center py-32 mb-2">
                <div className="absolute inset-0 bg-primary bg-opacity-80 flex flex-col justify-center items-center">
                    {/* Contenedor de texto centralizado */}
                    <Container>
                        {/* Título del portal */}
                        <Heading className="text-center" darkMode>MUNICIPIO VIRTUAL</Heading>
                        {/* Descripción corta debajo del título */}
                        <p className="text-center text-slate-300">Accede a nuestros servicios en línea de manera fácil y rápida.</p>
                    </Container>
                </div>
            </div>
            {/* Subtítulo de la sección de servicios */}
            <Heading className="text-center" level={3}>Servicios disponibles</Heading>

            {/* Componente para mostrar los procedimientos en un grid de tarjetas */}
            <Container className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {procedures?.map((card, index) => (
                    <Card
                        key={index}
                        title={card.titulo}
                        desc={card.descripcion_corta}
                        icon={card.icon}
                        href={`/${card.nombre}`}
                        direccion={card.direcciones_municipale.nombre}
                    />
                ))}
            </Container>
        </>
    )
}

export default Home
