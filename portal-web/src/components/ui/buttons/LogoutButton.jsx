import { useState } from 'react';  // Importación de useState para gestionar el estado local
import LogoutIcon from '../../../assets/logout.svg?react';  // Importación del icono de cerrar sesión
import useAuthStore from '../../../stores/useAuthStore';
import { useEffect } from 'react';
import { getUserData } from '../../../utils/utils';

// COMPONENTE: Botón de Cerrar Sesión
const LogoutButton = ({ darkMode = false }) => {

    // Obtiene la información del usuario desde sessionStorage
    const { sessionData, logoutUser } = useAuthStore(state => state)
    const [name, setName] = useState("")

    useEffect(() => {
        if (Object.values(sessionData).length > 0) {
            const { fullName } = getUserData(sessionData)
            setName(fullName)
        }
    }, [sessionData])

    // Estado para gestionar el estado de carga (loading) al hacer clic
    const [loading, setLoading] = useState(false)

    // Función para manejar el cierre de sesión (backend y frontend)
    const handleLogout = async () => {
        setLoading(true)
        await logoutUser()
        setLoading(false)

    }

    // Renderiza el botón con el nombre del usuario y el icono de cierre de sesión
    return (
        <button
            disabled={loading}  // Deshabilita el botón cuando está en proceso de cierre de sesión
            onClick={handleLogout}  // Asocia la función de cierre de sesión al evento onClick
            className='cursor-pointer group disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center gap-2 hover:bg-slate-200 transition-colors p-2 rounded'
        >
            {/* Nombre del usuario */}
            <span className={`font-light group-disabled:text-slate-400 ${darkMode ? "text-white" : "text-primary"}`}>
                {name}
            </span>
            {/* Icono de Cerrar Sesión */}
            <LogoutIcon className={`group-disabled:stroke-slate-400 ${darkMode ? "stroke-white" : "stroke-primary"}`} />
        </button>
    )
}

export default LogoutButton
