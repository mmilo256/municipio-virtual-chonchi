import { useNavigate, useParams } from "react-router-dom"
import Breadcrumbs from "../../ui/Breadcrumbs"
import { IoIosAddCircleOutline } from "react-icons/io";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { emailRegex } from "../../../utils/regex";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegLightbulb } from "react-icons/fa";
import { fetchRequestById, updateRequestStatus } from "../../../services/requestsServices";
import { sendEmail } from "../../../services/emailServices";
import { obtenerDecretos } from "../../../services/permisosTransitoriosServices";
import { SERVER_URL } from "../../../constants/constants";
import { approveTemplate } from "../../../email-templates/permisos-transitorios/approveTemplate";
import Modal from "../../ui/Modal";

const EnviarDocumento = () => {

    const { id } = useParams()

    const [selectedEmail, setSelectedEmail] = useState("")
    const [destinatarios, setDestinatarios] = useState([])
    const [isValid, setIsValid] = useState(false)
    const [userFullName, setUserFullName] = useState("")
    const [loading, setLoading] = useState(false)
    const [approveModal, setApproveModal] = useState(false)

    const [decretoPath, setDecretoPath] = useState("")

    const [userEmail, setUserEmail] = useState("")

    const navigate = useNavigate()

    // Cargar los decretos si existen
    useEffect(() => {
        (async () => {
            const decretos = await obtenerDecretos(id)
            setDecretoPath(decretos?.decretoFirmado?.ruta)
        })()
    }, [id])

    useEffect(() => {
        (async () => {
            const response = await fetchRequestById(id)
            const respuestas = JSON.parse(response.respuestas)
            setUserFullName(respuestas.name)
            setUserEmail(respuestas.email)
        })()
    }, [id])

    // Lista de destinatarios
    const destList = [
        { nombre: "Solicitante", email: userEmail },
        { nombre: "Bomberos", email: "bomberos@gmail.com" },
        { nombre: "Carabineros", email: "carabineros@gmail.com" },
    ]

    // Validación de los campos
    useEffect(() => {
        if (destinatarios.length === 0) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [destinatarios])


    // Agregar un correo a la lista de destinatarios
    const agregarDestinatario = (e) => {
        e.preventDefault()
        if (selectedEmail === "") {
            toast.warning("Ingrese un correo electrónico")
        } else if (!emailRegex.test(selectedEmail)) {
            toast.warning("Ingrese un correo electrónico válido")
        } else {
            setDestinatarios(prev => [
                ...prev,
                selectedEmail
            ])
            setSelectedEmail("")
        }
    }

    // Quitar un destinatario de la lista de destinatarios
    const quitarDestinatario = (dest) => {
        const newArray = destinatarios.filter(item => item !== dest)
        setDestinatarios(newArray)
    }

    // Modal de confirmación de correo electrónico
    const abrirModalAprobacion = () => {
        setApproveModal(true)
    }

    // Enviar correo
    const enviarCorreo = async () => {
        setLoading(true)
        try {
            await sendEmail(destinatarios, "SOLICITUD DE PERMISO TRANSITORIO: APROBADA", approveTemplate(userFullName), { path: decretoPath, filename: "decreto.pdf" })
            await updateRequestStatus(id, "finalizada")
            navigate(`../${id}`, {
                state: {
                    showToast: true,
                    toastMessage: "¡Correo electrónico enviado satisfactoriamente!"
                }
            })
        } catch (error) {
            alert("No se pudo enviar el correo electrónico")
            console.log(error)
            setLoading(false)
        }

    }

    const breadcrumbs = [
        { label: "Autorización Especial Transitoria", href: "/permisos-transitorios" },
        { label: `Solicitud #${id}`, href: `/permisos-transitorios/${id}` },
        { label: `Enviar decreto` }
    ]

    return (
        <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
            <Modal
                loading={loading}
                modal={approveModal}
                toggleModal={() => { setApproveModal(!approveModal) }}
                btnText="Enviar decreto"
                onClick={enviarCorreo}
                title="Enviar decreto">
                <p className="text-center">
                    ¿Está seguro que desea enviar el decreto al usuario solicitante?
                </p>
                <p className="text-center my-4 p-2 bg-amber-200 rounded font-bold text-amber-800">
                    Esta acción dará por finalizada la solicitud y no se puede deshacer.
                </p>
                <p className="text-center">
                    El decreto será enviado a los siguientes correos:
                </p>
                {destinatarios.map((dest, index) => (
                    <p className="text-center font-bold" key={index}>{dest}</p>
                ))}
            </Modal>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h1 className="text-2xl font-bold my-4">Enviar decreto</h1>
            <p className="bg-amber-100 p-2 rounded text-amber-600 mb-4 flex items-center gap-2"> <FaRegLightbulb className="text-amber-600" /> Este paso da por finalizado el trámite</p>
            <label className="block mb-1" htmlFor="destinatario">Agregar destinatario</label>
            <form className="flex gap-2">
                <select id="destinatario" value={selectedEmail}
                    onChange={(e) => {
                        setSelectedEmail(e.target.value);
                    }} className="block w-full border-2 rounded p-1">
                    <option value="">-- Selecciona un destinatario --</option>
                    {destList.map(dest => (
                        <option key={dest.email} value={dest.email}>
                            {`${dest.email} [${dest.nombre}]`}
                        </option>
                    ))}
                </select>
                <button onClick={agregarDestinatario} className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryHover rounded py-2 w-40"> <IoIosAddCircleOutline size={25} /> Agregar</button>
            </form>
            <div className="mt-4">
                {destinatarios.map((dest, index) => (
                    <span key={index} className="inline-block py-1 px-2 mr-2 mb-2 bg-green-200 hover:bg-green-300 rounded">
                        <span className="mr-2 font-medium text-green-700">{dest}</span>
                        <button onClick={() => { quitarDestinatario(dest) }} className="font-bold text-xl text-green-700">&times;</button>
                    </span>

                ))}
            </div>
            <hr className="my-4" />

            <a className="block py-1 px-4 text-blue-500 border underline font-bold" target="_blank" href={`${SERVER_URL}/${decretoPath}`}>DECRETO.PDF</a>

            <div className="mt-10 flex justify-end gap-2">
                <Button variant="primary" text="Volver" />
                <Button isValid={isValid} onClick={abrirModalAprobacion} variant="secondary" text="Enviar documento" />
            </div>
            <ToastContainer />
        </div>
    )
}

export default EnviarDocumento