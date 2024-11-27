import { useEffect, useState } from "react"
import Container from "../ui/Container"
import Heading from "../ui/Heading"
import { fetchAllProcedures } from "../../services/proceduresServices"
import CardsGrid from "./CardsGrid"

const Home = () => {

    const [procedures, setProcedures] = useState([])

    useEffect(() => {
        const loadProcedures = async () => {
            const data = await fetchAllProcedures()
            setProcedures(data)
        }
        loadProcedures()
    }, [])

    const formattedData = procedures.map(procedure => ({
        ...procedure,
        href: `/${procedure.nombre}`
    }))

    return (
        <>
            <div style={{ backgroundPosition: 'center 70%' }} className="relative bg-[url('/chonchi-aereo.jpg')] bg-cover bg-center py-32 mb-2">
                <div className="absolute inset-0 bg-primary bg-opacity-80 flex flex-col justify-center items-center">
                    <Container>
                        <Heading className="text-center" darkMode>MUNICIPIO VIRTUAL</Heading>
                        <p className="text-center text-slate-300">Accede a nuestros servicios en línea de manera fácil y rápida.</p>
                    </Container>
                </div>
            </div>
            <Heading className="text-center" level={3}>Servicios disponibles</Heading>

            <CardsGrid data={formattedData} />
        </>
    )
}

export default Home