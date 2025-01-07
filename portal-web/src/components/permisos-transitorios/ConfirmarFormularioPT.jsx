import { PROCEDURES_ID } from "../../constants/constants"
import { sendRequest } from "../../services/requestsServices"
import { formatDate } from "../../utils/utils"
import Accordion from "../ui/Accordion"
import Button from "../ui/buttons/Button"
import Container from "../ui/Container"
import Heading from "../ui/Heading"
import { useState } from "react"
import FormCompleted from "../FormCompleted"

const ConfirmarFormularioPT = ({ data, title, stepTitle, userId, onClickPrev }) => {

    const [sendedRequest, setSendedRequest] = useState(false)

    const organizationData = {
        orgName: data.orgName,
        orgRut: data.orgRut,
        orgAddress: data.orgAddress,
        orgEmail: data.orgEmail,
        orgPhone: data.orgPhone,
        orgType: data.orgType
    }
    const presidentData = {
        presidentName: data.presidentName,
        presidentRut: data.presidentRut,
        presidentAddress: data.presidentAddress,
        presidentEmail: data.presidentEmail,
        presidentPhone: data.presidentPhone,
        presidentPhone2: data.presidentPhone2
    }
    const permissionData = {
        permissionAlcohol: data.permissionAlcohol === "true" ? true : false,
        permissionDescription: data.permissionDescription,
        permissionEndDate: data.permissionEndDate,
        permissionEndTime: data.permissionEndTime,
        permissionFood: data.permissionFood === "true" ? true : false,
        permissionName: data.permissionName,
        permissionPlace: data.permissionPlace,
        permissionPurpose: data.permissionPurpose,
        permissionStartDate: data.permissionStartDate,
        permissionStartTime: data.permissionStartTime
    }
    const docsData = {
        ...data.docs
    }

    console.log(permissionData)

    const handleSubmit = async () => {
        const data = {
            respuestas: {
                ...organizationData,
                ...presidentData,
                ...permissionData
            },
            documentos: {
                ...docsData
            },
            tramite_id: PROCEDURES_ID.permisosTransitorios,
            usuario_id: userId
        }
        try {
            await sendRequest(data)
            setSendedRequest(true)
        } catch (error) {
            alert("No se pudo enviar la solicitud")
            console.log(error.message)
        }
    }

    if (sendedRequest) {
        return <FormCompleted text="Tu solicitud de permiso ha sido enviada exitosamente a la Municipalidad de Chonchi. Nos pondremos en contacto para informar si la solicitud fue aprobada o rechazada." />
    }

    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{stepTitle}</Heading>
            <div className="mt-4">
                <Accordion title="1. Datos de la organización">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Nombre o razón social:</strong> {organizationData.orgName}</p>
                        <p><strong>RUT de la organización:</strong> {organizationData.orgRut}</p>
                        <p><strong>Domicilio:</strong> {organizationData.orgAddress}</p>
                        <p><strong>Correo electrónico:</strong> {organizationData.orgEmail}</p>
                        <p><strong>Teléfono:</strong> {organizationData.orgPhone}</p>
                        <p><strong>Tipo de organización:</strong> {organizationData.orgType}</p>
                    </div>
                </Accordion>
                <Accordion title="2. Datos del representante legal">
                    <div className="grid grid-cols-2 pl-8">
                        <p><strong>Nombre Completo:</strong> {presidentData.presidentName}</p>
                        <p><strong>RUT:</strong> {presidentData.presidentRut}</p>
                        <p><strong>Domicilio:</strong> {presidentData.presidentAddress}</p>
                        <p><strong>Correo electrónico:</strong> {presidentData.presidentEmail}</p>
                        <p><strong>Teléfono:</strong> {presidentData.presidentPhone}</p>
                        <p><strong>Teléfono 2:</strong> {presidentData.presidentPhone2 || "No indica"}</p>
                    </div>
                </Accordion>
                <Accordion title="3. Detalles del permiso">
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
                <Accordion title="4. Antecedentes">
                    <ul className="list-disc list-inside pl-8 text-blue-700 underline">
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
                <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                {<Button onClick={handleSubmit} type="button" variant="secondary">Enviar solicitud</Button>}
            </div>
        </Container>
    )
}

export default ConfirmarFormularioPT