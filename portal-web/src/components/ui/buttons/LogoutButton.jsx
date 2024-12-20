import { useState } from 'react';
import LogoutIcon from '../../../assets/logout.svg?react';
import { logout } from '../../../services/authServices';


// COMPONENTE
const LogoutButton = ({ darkMode = false }) => {

    const user = JSON.parse(sessionStorage.getItem('session'))

    const getUserName = () => {
        let names = ""
        user.name.nombres.map((name) => {
            names += name + " "
        })
        return names
    }

    const [loading, setLoading] = useState(false)

    // Función para cerrar sesión (backend y frontend)
    const handleLogout = async () => {
        setLoading(true)
        await logout()
    }

    return (
        <button disabled={loading} onClick={handleLogout} className='cursor-pointer group disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-200 transition-colors p-2 rounded'>
            <span className={`font-light group-disabled:text-slate-400 ${darkMode ? "text-white" : "text-primary"}`}>{getUserName()}</span>
            <LogoutIcon className={`group-disabled:stroke-slate-400 ${darkMode ? "stroke-white" : "stroke-primary"}`} />
        </button>
    )
}

export default LogoutButton