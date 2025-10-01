import { useState } from 'react';  // Importación de useState para gestionar el estado 
import { RiLogoutBoxFill } from "react-icons/ri";
import { logout } from '../../services/authServices';

// COMPONENTE: Botón de Cerrar Sesión
const LogoutButton = ({ btnText }) => {

    const [loading, setLoading] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            window.location.href = "/login"
        } catch (error) {
            console.log(error)
        }
    }

    // Renderiza el botón con el nombre del usuario y el icono de cierre de sesión
    return (
        <button
            disabled={loading}  // Deshabilita el botón cuando está en proceso de cierre de sesión
            onClick={handleLogout}  // Asocia la función de cierre de sesión al evento onClick
            className="border border-slate-400 w-full py-2 bg-slate-700 hover:bg-slate-500 flex items-center justify-center gap-2"
        >
            <RiLogoutBoxFill size={22} />
            {btnText && <span>
                {btnText}
            </span>}
        </button>
    )
}

export default LogoutButton
