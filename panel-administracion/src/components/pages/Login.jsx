import { useState } from 'react'
import bg from '../../assets/chonchi-aereo.jpg'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { login } from '../../services/authServices'
import { ToastContainer, toast } from 'react-toastify';
import useAuthStore from '../../stores/useAuthStore'
import { Navigate } from 'react-router-dom'

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const { isAuthenticated } = useAuthStore()

    const handleLogin = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        // Verificar que los campos no estén vacíos
        if (!username || !password) {
            toast.error("Debes completar todos los campos")
            return setIsLoading(false)
        }
        try {
            await login(username, password)
            window.location.href = "/"
            toast.success("¡Has iniciado sesión!")
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <div className='min-h-dvh' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "top" }}>
            <div className='bg-slate-900 min-h-dvh bg-opacity-85 flex items-center justify-center'>
                <form onSubmit={handleLogin} name='login-form' className='bg-cyan-200 bg-opacity-20 text-white p-8 rounded-xl'>
                    <h1 className='text-2xl text-center font-bold mb-1'>Municipio Virtual Chonchi</h1>
                    <p className='font-light text-center'>Panel de administración</p>
                    <hr className='my-4 opacity-60' />
                    <div className="mb-10">
                        <Input value={username} onChange={setUsername} label="Nombre de usuario" />
                        <Input value={password} onChange={setPassword} label="Contraseña" type='password' />
                    </div>
                    <Button isLoading={isLoading} type='submit' wFull text="Iniciar sesión" variant="secondary" />
                    <p className='mt-4 text-center text-sm text-slate-300' >¿Problemas para acceder? <br /> Contacte al administrador del sistema</p>
                </form>
            </div >
            <ToastContainer />
        </div >
    )
}

export default Login