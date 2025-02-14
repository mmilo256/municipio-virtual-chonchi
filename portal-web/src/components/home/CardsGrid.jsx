import Card from "../ui/Card"
import Container from "../ui/Container";

const CardsGrid = ({ data }) => {

    return (

        <Container className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {data.map((card, index) => (
                <Card
                    soon={!card.activo}
                    key={index}
                    title={card.titulo}
                    desc={card.descripcion_corta}
                    icon={card.icon}
                    href={`/${card.nombre}`}
                />
            ))}
        </Container>

    )
}

export default CardsGrid