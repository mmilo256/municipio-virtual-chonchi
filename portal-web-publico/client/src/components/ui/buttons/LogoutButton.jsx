import { useState } from 'react';
import LogoutIcon from '../../../assets/logout.svg?react';
import { API_URL } from '../../../constants/constants';

// CONSTANTES
const LOGOUT_URL = "https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout?redirect=logout_uri"


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
    const logout = async () => {
        setLoading(true)
        try {
            window.location.href = LOGOUT_URL
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: 'include'
            })
            sessionStorage.removeItem('session')
            setTimeout(() => {
                window.location.href = "https://municipalidadchonchi.cl/web/"
            }, 1000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button disabled={loading} onClick={logout} className='cursor-pointer group disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-200 transition-colors p-2 rounded'>
            <span className={`font-light group-disabled:text-slate-400 ${darkMode ? "text-white" : "text-primary"}`}>{getUserName()}</span>
            <LogoutIcon className={`group-disabled:stroke-slate-400 ${darkMode ? "stroke-white" : "stroke-primary"}`} />
        </button>
    )
}

export default LogoutButton