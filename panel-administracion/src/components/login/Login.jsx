import bg from '../../assets/chonchi-aereo.jpg'
import Button from '../ui/Button'
import Input from '../ui/Input'

const Login = () => {
    return (
        <div className='min-h-dvh' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "top" }}>
            <div className='bg-slate-900 min-h-dvh bg-opacity-85 flex items-center justify-center'>
                <form name='login-form' className='bg-cyan-200 bg-opacity-20 text-white p-8 rounded-xl'>
                    <h1 className='text-2xl text-center font-bold mb-1'>Municipio Virtual Chonchi</h1>
                    <p className='font-light text-center'>Panel de administración</p>
                    <hr className='my-4 opacity-60' />
                    <div className="mb-10">
                        <Input label="Nombre de usuario" />
                        <Input label="Contraseña" type='password' />
                    </div>
                    <Button wFull type='submit' text="Iniciar sesión" variant="secondary" />
                    <p className='mt-4 text-center text-sm text-slate-300' >¿Problemas para acceder? <br /> Contacte al administrador del sistema</p>
                </form>
            </div >
        </div >
    )
}

export default Login