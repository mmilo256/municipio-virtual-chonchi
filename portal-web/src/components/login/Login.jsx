import BotonClaveUnica from "../ui/buttons/BotonClaveUnica"  // Componente de botón para iniciar sesión con ClaveÚnica.
import useAuthStore from "../../stores/useAuthStore"
import { Navigate } from 'react-router-dom'

const Login = () => {

    const { isAuthenticated } = useAuthStore()

    if (isAuthenticated) {
        return <Navigate to="/inicio" />
    }

    // Retorno del componente de login con la interfaz.
    return (
        <div className="grid lg:grid-cols-7 min-h-svh bg-slate-50">
            {/* Sección de la imagen de fondo con texto sobre él */}
            <div className="relative h-72 lg:h-auto col-span-4 bg-[url('/chonchi-aereo.jpg')]">
                <div className="absolute inset-0 bg-primary bg-opacity-85 flex flex-col justify-center text-center items-center text-white">
                    {/* Título y subtítulo de la página */}
                    <h2 className="text-xl md:text-4xl opacity-50">Ilustre Municipalidad de Chonchi</h2>
                    <h1 className="text-4xl md:text-7xl font-bold">Municipio <span className="text-secondary">Virtual</span></h1>
                    <div className="mt-10 w-full px-8 md:hidden">
                        {/* Botón de ClaveÚnica en dispositivos pequeños */}
                        <BotonClaveUnica className="w-full md:w-auto" />
                    </div>
                </div>
            </div>
            {/* Contenido principal del formulario de login */}
            <div className="p-8 lg:p-16 col-span-3">
                {/* Título principal del portal */}
                <h2 className="text-primary text-center lg:text-left font-bold text-4xl mb-4">Municipio Virtual de Chonchi</h2>
                <div className="text-slate-600 text-xl">
                    {/* Descripción general de cómo funciona el portal */}
                    <p className="leading-6 text-justify">A través de este portal, podrá acceder a una amplia variedad de trámites y servicios ofrecidos por la <strong>Municipalidad de Chonchi.</strong></p>
                    <p className="my-5 text-center lg:text-left">¿Cómo funciona?</p>
                    <ol className="list-disc list-inside">
                        <li className="mb-2">Ingrese al portal utilizando su <strong>ClaveÚnica.</strong></li>
                        <li className="mb-2">Seleccione el servicio o trámite que desea realizar.</li>
                        <li className="mb-2">Complete los campos solicitados con la información requerida.</li>
                        <li className="mb-2">Recibirá notificaciones sobre el estado y resultado de su solicitud a través de correo electrónico u otros medios de contacto disponibles.</li>
                    </ol>
                </div>
                {/* Botón de ClaveÚnica para inicio de sesión en dispositivos más grandes */}
                <div className="hidden md:block my-5">
                    <BotonClaveUnica type="link" className="w-full md:w-auto lg:w-full ml-auto" />
                </div>
            </div>
        </div >
    )
}

export default Login
