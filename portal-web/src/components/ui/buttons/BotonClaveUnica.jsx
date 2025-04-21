import { useState } from 'react'  // Importación del hook useState de React para manejar el estado
import claveUnica from '../../../assets/claveunica.svg'  // Importación del logo de Clave Única
import { API_URL } from '../../../constants/constants'  // Importación de la URL de la API

// Componente BotonClaveUnica
const BotonClaveUnica = ({ className }) => {

    // Estado para manejar el estado de carga (loading) del botón
    const [loading, setLoading] = useState(false)

    // Función que maneja el evento click del botón
    const onClickHandler = async () => {
        setLoading(true)  // Activa el estado de carga cuando se hace clic
        try {
            // Redirige al usuario al portal de autenticación de Clave Única
            window.location.href = `${API_URL}/auth/login`
        } catch (error) {
            // Si ocurre un error, lo muestra en la consola
            console.log(error.message)
        }
    }

    // Renderiza el botón con las clases proporcionadas por la prop className
    return (
        <button
            onClick={onClickHandler}  // Asocia la función onClick al botón
            disabled={loading}  // Deshabilita el botón si está en estado de carga
            className={`cursor-pointer disabled:bg-blue-400 transition-colors disabled:cursor-wait flex gap-[4px] h-[48px] items-center justify-center bg-[#0F69C4] hover:bg-[#07305A] px-[14px] py-[8px] ${className}`}
        >
            {/* Icono de Clave Única */}
            <img width={24} src={claveUnica} alt="Clave Única" />
            {/* Texto del botón */}
            <span className='text-base font-bold text-white'>Iniciar sesión</span>
        </button>
    )
}

export default BotonClaveUnica
