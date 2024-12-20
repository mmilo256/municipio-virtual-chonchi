import { useEffect, useState } from "react";
import Accordion from "../ui/Accordion";
import { fetchRequestById } from "../../services/requestsServices";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/format";
import { API_URL } from "../../constants/constants";
const RequestDetailPT = () => {

    const { id } = useParams()

    const [request, setRequest] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const request = await fetchRequestById(id)
            setRequest(request)
            setLoading(false)
        })()
    }, [id])


    // Obtener un documento por el nombre del campo
    const getDocByFieldname = (fieldname) => {
        if (!loading) {
            const doc = request.documentos.find(doc => doc.fieldname === `documentos[${fieldname}]`)
            return doc
        }
    }

    console.log(request)

    if (loading) {
        return
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">Solicitud de permiso transitorio #{request.id}</h1>
            <p className="text-slate-500"><strong>Fecha de solicitud:</strong> {formatDate(request.createdAt, 1)}</p>

            <div className="flex items-center gap-4 my-4">
                <button className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded">Rechazar solicitud</button>
                <button className="bg-green-300 hover:bg-green-200 text-green-800 py-2 px-5 rounded">Procesar solicitud</button>
            </div>
            <div className="mt-4">
                <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
                <div className=" bg-[#fff] p-4 shadow rounded">
                    <p>Nombre: {request.usuario.nombres} {request.usuario.apellidos}</p>
                    <p>RUT: {request.usuario.run}</p>
                </div>
            </div>
            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
                <Accordion title="1. Datos de la organización">
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre o razón social:</strong> {request.respuestas.orgName}</p>
                        <p><strong>RUT de la organización:</strong> {request.respuestas.orgRut}</p>
                        <p><strong>Domicilio:</strong> {request.respuestas.orgAddress}</p>
                        <p><strong>Correo electrónico:</strong> {request.respuestas.orgEmail}</p>
                        <p><strong>Teléfono:</strong> {request.respuestas.orgPhone}</p>
                        <p><strong>Tipo de organización:</strong> {request.respuestas.orgType}</p>
                    </div>
                </Accordion>
                <Accordion title="2. Datos del representante legal">
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre Completo:</strong> {request.respuestas.presidentName}</p>
                        <p><strong>RUT:</strong> {request.respuestas.presidentRut}</p>
                        <p><strong>Domicilio:</strong> {request.respuestas.presidentAddress}</p>
                        <p><strong>Correo electrónico:</strong> {request.respuestas.presidentEmail}</p>
                        <p><strong>Teléfono:</strong> {request.respuestas.presidentPhone}</p>
                        <p><strong>Teléfono 2:</strong> {request.respuestas.presidentPhone2}</p>
                    </div>
                </Accordion>
                <Accordion title="3. Detalles del permiso">
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre de la actividad:</strong> {request.respuestas.permissionName}</p>
                        <p><strong>Lugar de realización:</strong> {request.respuestas.permissionPlace}</p>
                        <p><strong>Fecha de inicio:</strong> {formatDate(request.respuestas.permissionStartDate, 1)}, {request.respuestas.permissionStartTime}</p>
                        <p><strong>Fecha de término:</strong> {formatDate(request.respuestas.permissionEndDate, 1)}, {request.respuestas.permissionEndTime}</p>
                        <p><strong>Consumo y/o venta de bebidas alcohólicas:</strong> {request.respuestas.permissionAlcohol ? "Si" : "No"}</p>
                        <p><strong>Consumo y/o venta de alimentos:</strong> {request.respuestas.permissionFood ? "Si" : "No"}</p>
                        <p><strong>Descripción de la actividad:</strong> {request.respuestas.permissionDescription}</p>
                        <p><strong>Destino de los fondos:</strong> {request.respuestas.permissionPurpose}</p>
                    </div>
                </Accordion>
                <Accordion title="4. Antecedentes">
                    <ul className="list-disc list-inside text-blue-700 underline">
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docCI").path}`}>Cédula de identidad del representante legal</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docRutTributario").path}`}>RUT tributario</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docCertificadoAntecedentes").path}`}>Certificado de antecedentes para fines especiales</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docVigenciaPersonaJuridica").path}`}>Certificado de vigencia de Persona Jurídica</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docOcupacionRecinto").path}`}>Documento que acredita la ocupación legal del recinto</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docDeclaracionJurada").path}`}>Declaración jurada simple Ley 19.925 de alcoholes</a></li>
                        <li><a target="_blank" href={`${API_URL}/${getDocByFieldname("docFirmaPresidente").path}`}>Documento con firma del presidente</a></li>
                    </ul>
                </Accordion>
            </div>
        </div>
    )
}

export default RequestDetailPT