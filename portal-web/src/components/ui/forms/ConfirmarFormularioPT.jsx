import { PROCEDURES_ID } from "../../../constants/constants"  // Importa el ID del procedimiento desde las constantes
import { sendRequest } from "../../../services/requestsServices"  // Función para enviar la solicitud al backend
import { formatDate } from "../../../utils/utils"  // Función para formatear las fechas
import Accordion from "../Accordion"  // Componente para mostrar secciones desplegables
import Button from "../buttons/Button"  // Componente de botón
import Container from "../Container"  // Componente contenedor para el diseño
import Heading from "../Heading"  // Componente para títulos
import { useState } from "react"  // Importa el hook useState de React para gestionar el estado
import FormCompleted from "./FormCompleted"  // Componente que muestra el mensaje de éxito al enviar la solicitud

const ConfirmarFormularioPT = ({ data, title, stepTitle, userId, onClickPrev }) => {

    const [sendedRequest, setSendedRequest] = useState(false)  // Estado para verificar si la solicitud ha sido enviada

    // Datos del solicitante
    const solicitanteData = {
        solicitanteEmail: data.emailSolicitante,
        solicitantePhone: data.telefonoSolicitante
    }

    // Estructura para almacenar los datos de la organización
    const organizationData = {
        orgName: data.orgName,
        orgRut: data.orgRut,
        orgAddress: data.orgAddress,
        orgEmail: data.orgEmail,
        orgPhone: data.orgPhone,
        orgType: data.orgType
    }

    // Estructura para almacenar los datos del presidente
    const presidentData = {
        presidentName: data.presidentName,
        presidentRut: data.presidentRut,
        presidentAddress: data.presidentAddress,
        presidentEmail: data.presidentEmail,
        presidentPhone: data.presidentPhone,
        presidentPhone2: data.presidentPhone2
    }

    // Estructura para almacenar los detalles del permiso
    const permissionData = {
        permissionAlcohol: data.permissionAlcohol === "true" ? true : false,  // Convierte el valor a booleano
        permissionDescription: data.permissionDescription,
        permissionEndDate: data.permissionEndDate,
        permissionEndTime: data.permissionEndTime,
        permissionFood: data.permissionFood === "true" ? true : false,  // Convierte el valor a booleano
        permissionName: data.permissionName,
        permissionPlace: data.permissionPlace,
        permissionPurpose: data.permissionPurpose,
        permissionStartDate: data.permissionStartDate,
        permissionStartTime: data.permissionStartTime
    }

    // Datos de los documentos cargados por el usuario
    const docsData = {
        ...data.docs
    }

    // Función para manejar el envío de la solicitud
    const handleSubmit = async () => {
        const data = {
            respuestas: {
                ...solicitanteData,
                ...organizationData,
                ...presidentData,
                ...permissionData
            },
            documentos: {
                ...docsData
            },
            tramite_id: PROCEDURES_ID.permisosTransitorios,  // ID del procedimiento
            usuario_id: userId  // ID del usuario que envía la solicitud
        }
        try {
            await sendRequest(data)  // Envía la solicitud al backend
            setSendedRequest(true)  // Actualiza el estado a 'true' cuando la solicitud es enviada exitosamente
        } catch (error) {
            alert("No se pudo enviar la solicitud")  // Muestra un mensaje de error si la solicitud falla
            console.log(error.message)  // Imprime el error en la consola
        }
    }

    // Si la solicitud ha sido enviada, muestra el mensaje de confirmación
    if (sendedRequest) {
        return <FormCompleted text="Tu solicitud de permiso ha sido enviada exitosamente a la Municipalidad de Chonchi. Nos pondremos en contacto para informar si la solicitud fue aprobada o rechazada." />
    }

    // Si la solicitud no ha sido enviada, muestra el formulario de confirmación
    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{stepTitle}</Heading>
            <div className="mt-4">
                {/* Acordeones para mostrar los datos organizados */}
                <Accordion title="1. Datos del solicitante">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Correo electrónico:</strong> {solicitanteData.solicitanteEmail}</p>
                        <p><strong>Teléfono:</strong> {solicitanteData.solicitantePhone}</p>
                    </div>
                </Accordion>
                <Accordion title="2. Datos de la organización">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Nombre o razón social:</strong> {organizationData.orgName}</p>
                        <p><strong>RUT de la organización:</strong> {organizationData.orgRut}</p>
                        <p><strong>Domicilio:</strong> {organizationData.orgAddress}</p>
                        <p><strong>Correo electrónico:</strong> {organizationData.orgEmail}</p>
                        <p><strong>Teléfono:</strong> {organizationData.orgPhone}</p>
                        <p><strong>Tipo de organización:</strong> {organizationData.orgType}</p>
                    </div>
                </Accordion>
                <Accordion title="3. Datos del representante legal">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Nombre Completo:</strong> {presidentData.presidentName}</p>
                        <p><strong>RUT:</strong> {presidentData.presidentRut}</p>
                        <p><strong>Domicilio:</strong> {presidentData.presidentAddress}</p>
                        <p><strong>Correo electrónico:</strong> {presidentData.presidentEmail}</p>
                        <p><strong>Teléfono:</strong> {presidentData.presidentPhone}</p>
                        <p><strong>Teléfono 2:</strong> {presidentData.presidentPhone2 || "No indica"}</p>
                    </div>
                </Accordion>
                <Accordion title="4. Detalles del permiso">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Nombre de la actividad:</strong> {permissionData.permissionName}</p>
                        <p><strong>Lugar de realización:</strong> {permissionData.permissionPlace}</p>
                        <p><strong>Fecha de inicio:</strong> {`${formatDate(permissionData.permissionStartDate, 1)} a las ${permissionData.permissionStartTime}`}</p>
                        <p><strong>Fecha de término:</strong> {`${formatDate(permissionData.permissionEndDate, 1)} a las ${permissionData.permissionEndTime}`}</p>
                        <p><strong>Consumo y/o venta de bebidas alcohólicas:</strong> {permissionData.permissionAlcohol ? "Si" : "No"}</p>
                        <p><strong>Consumo y/o venta de alimentos:</strong> {permissionData.permissionFood ? "Si" : "No"}</p>
                        <p><strong>Descripción de la actividad:</strong> {permissionData.permissionDescription}</p>
                        <p><strong>Destino de los fondos:</strong> {permissionData.permissionPurpose}</p>
                    </div>
                </Accordion>
                <Accordion title="5. Antecedentes">
                    <ul className="list-disc list-inside pl-8 text-blue-700 underline">
                        {/* Lista de documentos cargados por el usuario */}
                        {docsData.docCI && <li><a target="_blank" href={URL.createObjectURL(docsData.docCI)}>Cédula de identidad del representante legal</a></li>}
                        {docsData.docRutTributario && <li><a target="_blank" href={URL.createObjectURL(docsData.docRutTributario)}>RUT tributario</a></li>}
                        {docsData.docCertificadoAntecedentes && <li><a target="_blank" href={URL.createObjectURL(docsData.docCertificadoAntecedentes)}>Certificado de antecedentes para fines especiales</a></li>}
                        {docsData.docVigenciaPersonaJuridica && <li><a target="_blank" href={URL.createObjectURL(docsData.docVigenciaPersonaJuridica)}>Certificado de vigencia de Persona Jurídica</a></li>}
                        {docsData.docOcupacionRecinto && <li><a target="_blank" href={URL.createObjectURL(docsData.docOcupacionRecinto)}>Documento que acredita la ocupación legal del recinto</a></li>}
                        {docsData.docDeclaracionJurada && <li><a target="_blank" href={URL.createObjectURL(docsData.docDeclaracionJurada)}>Declaración jurada simple Ley 19.925 de alcoholes</a></li>}
                        {docsData.docFirmaPresidente && <li><a target="_blank" href={URL.createObjectURL(docsData.docFirmaPresidente)}>Firma del representante legal</a></li>}
                    </ul>
                </Accordion>
            </div>
            <div className="flex justify-end py-5 gap-4">
                {/* Botones para navegación */}
                <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                {/* Botón para enviar la solicitud */}
                <Button onClick={handleSubmit} type="button" variant="secondary">Enviar solicitud</Button>
            </div>
        </Container>
    )
}

export default ConfirmarFormularioPT
