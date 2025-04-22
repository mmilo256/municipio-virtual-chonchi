import { logout } from "../../services/authServices"
import Button from "./Button"
import Container from "./Container"

const Navbar = () => {


    const handleLogout = async () => {
        try {
            await logout()
            window.location.href = "/login"
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <nav className="bg-primary h-20 flex items-center border-b border-b-slate-600">
            <Container>
                <div className="flex justify-end">
                    <Button onClick={handleLogout} text="Cerrar sesión" variant="secondary" />
                </div>
            </Container>
        </nav>
    )
}

export default Navbar