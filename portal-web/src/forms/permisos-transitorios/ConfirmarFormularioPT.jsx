import Accordion from "../../components/ui/Accordion"
import Container from "../../components/ui/Container"
import useFormsStore from "../../stores/useFormsStore"
import { formatDate } from "../../utils/utils"

const ConfirmarFormularioPT = () => {

    const { inputsValues, docsValues } = useFormsStore()
    const {
        name,
        rut,
        email,
        phone,
        orgName,
        orgRut,
        orgAddress,
        orgEmail,
        orgPhone,
        orgType,
        presidentName,
        presidentRut,
        presidentAddress,
        presidentEmail,
        presidentPhone,
        presidentPhone2,
        permissionName,
        permissionPlace,
        permissionStartDate,
        permissionStartTime,
        permissionEndDate,
        permissionEndTime,
        permissionAlcohol,
        permissionFood,
        permissionDescription,
        permissionPurpose
    } = inputsValues

    const itemStyles = "mb-2"

    return (
        <Container>
            <div className="mt-4 text-sm">
                {/* Acordeones para mostrar los datos organizados */}
                < Accordion title="1. Datos del solicitante" >
                    <div className="grid grid-cols-2 pl-8">
                        <div className={itemStyles}>
                            <p><strong>Nombre del solicitante </strong></p>
                            <p>{name}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>RUT </strong></p>
                            <p>{rut}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Correo electrónico </strong></p>
                            <p>{email}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Teléfono </strong></p>
                            <p>{phone}</p>
                        </div>
                    </div>
                </Accordion >
                <Accordion title="2. Datos de la organización">
                    <div className="grid grid-cols-2 pl-8">
                        <div className={itemStyles}>
                            <p><strong>Nombre o razón social </strong></p>
                            <p>{orgName}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>RUT de la organización </strong></p>
                            <p>{orgRut}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Domicilio </strong></p>
                            <p>{orgAddress}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Correo electrónico </strong></p>
                            <p>{orgEmail}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Teléfono </strong></p>
                            <p>{orgPhone}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Tipo de organización </strong></p>
                            <p>{orgType}</p>
                        </div>
                    </div>
                </Accordion>
                <Accordion title="3. Datos del representante legal">
                    <div className="grid grid-cols-2 pl-8">
                        <div className={itemStyles}>
                            <p><strong>Nombre completo </strong></p>
                            <p>{presidentName}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>RUT </strong></p>
                            <p>{presidentRut}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Domicilio </strong></p>
                            <p>{presidentAddress}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Correo electrónico </strong></p>
                            <p>{presidentEmail}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Teléfono </strong></p>
                            <p>{presidentPhone}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Teléfono 2 </strong></p>
                            <p>{presidentPhone2 || "No tiene"}</p>
                        </div>
                    </div>
                </Accordion>
                <Accordion title="4. Detalles del permiso">
                    <div className="grid grid-cols-2 pl-8">
                        <div className={itemStyles}>
                            <p><strong>Nombre de la actividad </strong></p>
                            <p>{permissionName}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Lugar de realización </strong></p>
                            <p>{permissionPlace}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Fecha de inicio </strong></p>
                            <p>{formatDate(permissionStartDate)} a las {permissionStartTime}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Fecha de término </strong></p>
                            <p>{formatDate(permissionEndDate)} a las {permissionEndTime}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Consumo y/o venta de bebidas alcohólicas </strong></p>
                            <p>{JSON.parse(permissionAlcohol) ? "Si" : "No"}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Consumo y/o venta de alimentos </strong></p>
                            <p>{JSON.parse(permissionFood) ? "Si" : "No"}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Descripción de la actividad </strong></p>
                            <p>{permissionDescription}</p>
                        </div>
                        <div className={itemStyles}>
                            <p><strong>Destino de los fondos </strong></p>
                            <p>{permissionPurpose}</p>
                        </div>
                    </div>
                </Accordion>
                <Accordion title="5. Antecedentes">
                    <ul className="list-disc list-inside pl-8 text-blue-700 underline">
                        {/* Lista de documentos cargados por el usuario */}
                        {<li><a href={URL.createObjectURL(docsValues?.docCI)} target="_blank">Cédula de identidad del representante legal</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docRutTributario)} target="_blank" >RUT tributario</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docCertificadoAntecedentes)} target="_blank" >Certificado de antecedentes para fines especiales</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docVigenciaPersonaJuridica)} target="_blank" >Certificado de vigencia de Persona Jurídica</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docOcupacionRecinto)} target="_blank" >Documento que acredita la ocupación legal del recinto</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docDeclaracionJurada)} target="_blank" >Declaración jurada simple Ley 19.925 de alcoholes</a></li>}
                        {<li><a href={URL.createObjectURL(docsValues?.docFirmaPresidente)} target="_blank" >Firma del representante legal</a></li>}
                    </ul>
                </Accordion>
            </div >
        </Container >
    )
}

export default ConfirmarFormularioPT