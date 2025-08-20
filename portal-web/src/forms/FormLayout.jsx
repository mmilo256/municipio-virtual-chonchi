import Breadcrumbs from "../components/ui/Breadcrumbs"
import Container from "../components/ui/Container"
import Heading from "../components/ui/Heading"

const FormLayout = ({ children, titulo, nombre }) => {

    const breadcrumbs = [
        { label: titulo, href: `/${nombre}` },
        { label: "Formulario", href: `/${nombre}/formulario` }
    ]

    return (
        <Container className="py-4 px-10 mt-4 mx-auto shadow rounded bg-white">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <Heading className="text-slate-700" level={3}>{titulo}</Heading>
            {children}
        </Container>
    )
}

export default FormLayout