import { useForm } from "react-hook-form"
import Button from "../buttons/Button"
import Container from "../Container"
import Heading from "../Heading"
import Input from "../Input"
import { useEffect, useState } from "react"

const DatosSolicitante = ({ onClickNext, onClickPrev, title }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const [nombre, setNombre] = useState('')
    const [rut, setRut] = useState('')

    const session = JSON.parse(sessionStorage.getItem('session'))

    useEffect(() => {
        const getUserName = () => {
            let nombres = ""
            let apellidos = ""
            // Mapea los nombres del usuario y los concatena
            session.name.nombres.map((nombre) => {
                nombres += nombre + " "
            })
            session.name.apellidos.map((apellido) => {
                apellidos += apellido + " "
            })
            const nombreCompleto = nombres + apellidos
            return nombreCompleto
        }
        setNombre(getUserName())
        setRut(`${session.run.numero}-${session.run.DV}`)
    }, [session.run, session.name])

    const onSubmit = handleSubmit((data) => {
        onClickNext(data)
    })

    return (
        <div><Container className="max-w-[30rem]">
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>1. Datos del solicitante</Heading>
            <p className="text-slate-600 bg-slate-200 p-2 rounded mb-4">Estos datos se usarán para notificar el estado de su solicitud. En caso de rechazo o aprobación, será notificado al correo electrónico ingresado</p>
            <form onSubmit={onSubmit} name="permisos-transitorios-form">
                <div className={`grid grid-cols-1 gap-6`}>
                    <div>
                        <span className="text-slate-600 font-medium">Nombre completo</span>
                        <input disabled value={nombre} className="cursor-not-allowed border border-slate-400 rounded disabled:text-slate-600 p-1 w-full focus:outline-blue-400" type="text" />
                    </div>
                    <div>
                        <span className="text-slate-600 font-medium">RUT solicitante</span>
                        <input disabled value={rut} className="cursor-not-allowed border border-slate-400 rounded disabled:text-slate-600 p-1 w-full focus:outline-blue-400" type="text" />
                    </div>
                    <Input
                        register={register}
                        error={errors['emailSolicitante']}
                        setValue={setValue}
                        name='emailSolicitante'
                        min={3}
                        max={50}
                        label={'Correo electrónico'}
                        required
                        placeholder="correo@ejemplo.com"
                        type="email"
                    />
                    <Input
                        register={register}
                        error={errors['telefonoSolicitante']}
                        setValue={setValue}
                        name='telefonoSolicitante'
                        min={8}
                        max={9}
                        label={'Teléfono'}
                        required
                        placeholder="945353899"
                        type="text"
                    />
                </div>
                <div className="flex justify-end py-5 gap-4">
                    <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                    {<Button type="submit" variant="secondary">Siguiente</Button>}
                </div>
            </form>

        </Container></div>
    )
}

export default DatosSolicitante