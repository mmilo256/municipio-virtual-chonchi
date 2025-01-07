import { useState } from 'react'
import claveUnica from '../../../assets/claveunica.svg'
import { API_URL } from '../../../constants/constants'

const BotonClaveUnica = ({ className }) => {

    const [loading, setLoading] = useState(false)

    const onClickHandler = async () => {
        setLoading(true)
        try {
            window.location.href = `${API_URL}/portal/auth/login`
        } catch (error) {
            console.log(error.message)
        }
    }


    return <button onClick={onClickHandler} disabled={loading} className={`cursor-pointer disabled:bg-blue-400 transition-colors  disabled:cursor-wait flex gap-[4px] h-[48px] items-center justify-center bg-[#0F69C4] hover:bg-[#07305A] px-[14px] py-[8px] ${className}`}>
        <img width={24} src={claveUnica} alt="" />
        <span className='text-base font-bold text-white'>Iniciar sesión</span>
    </button>

}

export default BotonClaveUnica