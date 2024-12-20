import Footer from "../ui/Footer"
import Navbar from "../ui/Navbar"

const Layout = ({ children }) => {
    return (
        <div className="min-h-dvh flex flex-col">
            <div className="flex-grow">
                <Navbar />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout