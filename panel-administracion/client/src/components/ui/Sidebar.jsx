import { Link } from "react-router-dom"

const Sidebar = () => {
    return (
        <aside className="p-4 min-h-[calc(100vh-80px)] bg-primary text-white">
            <Link to="/" className="font-bold text-2xl">Municipio Virtual Chonchi</Link>
            <ul className="pt-10 flex flex-col gap-2">
                <li><Link to="/" className="hover:underline">Inicio</Link></li>
                <li><Link to="permisos-transitorios" className="hover:underline">Permisos Transitorios</Link></li>
            </ul>
        </aside>
    )
}

export default Sidebar