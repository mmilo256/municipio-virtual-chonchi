import Button from "./Button"
import Container from "./Container"

const Navbar = () => {
    return (
        <nav className="bg-primary h-20 flex items-center border-b border-b-slate-600">
            <Container>
                <div className="flex justify-end">
                    <Button text="Cerrar sesión" variant="secondary" />
                </div>
            </Container>
        </nav>
    )
}

export default Navbar