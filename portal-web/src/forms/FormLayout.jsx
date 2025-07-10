import Breadcrumbs from "../components/ui/Breadcrumbs"
import Container from "../components/ui/Container"

const FormLayout = ({ children, titulo, nombre }) => {

    const breadcrumbs = [
        { label: titulo, href: `/${nombre}` },
        { label: "Formulario", href: `/${nombre}/formulario` }
    ]

    return (
        <Container className="max-w-[50rem] p-4 py-1 mt-4 mx-auto bg-white shadow rounded">
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="mt-2 text-lg text-slate-700 text-nowrap">{titulo}</h2>
            {children}
        </Container>
    )
}

export default FormLayout