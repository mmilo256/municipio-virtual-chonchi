import { Outlet } from "react-router-dom"
import Container from "../ui/Container"
import Navbar from "../ui/Navbar"
import Sidebar from "../ui/Sidebar"

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className='grid grid-cols-6'>
                <Sidebar />
                <div className='col-span-5'>
                    <Container>
                        <Outlet />
                    </Container>
                </div>
            </div>
            <footer className="bg-primary py-10"></footer>
        </>
    )
}

export default Layout