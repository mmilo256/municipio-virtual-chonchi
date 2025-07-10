import { formatDate } from "../../../utils/format"
import Accordion from "../../ui/Accordion"

const RespuestasPermisosTransitorios = ({ respuestas = [] }) => {

    return (
        <>
            {/* Sección 1: Datos de la organización */}
            <Accordion title="1. Datos de la organización">
                <div className="grid grid-cols-2 gap-y-1">
                    <p><strong>Nombre o razón social:</strong> {respuestas?.orgName}</p>
                    <p><strong>RUT de la organización:</strong> {respuestas?.orgRut}</p>
                    <p><strong>Domicilio:</strong> {respuestas?.orgAddress}</p>
                    <p><strong>Correo electrónico:</strong> {respuestas?.orgEmail}</p>
                    <p><strong>Teléfono:</strong> {respuestas?.orgPhone}</p>
                    <p><strong>Tipo de organización:</strong> {respuestas?.orgType}</p>
                </div>
            </Accordion>

            {/* Sección 2: Datos del representante legal */}
            <Accordion title="2. Datos del representante legal">
                <div className="grid grid-cols-2 gap-y-1">
                    <p><strong>Nombre Completo:</strong> {respuestas?.presidentName}</p>
                    <p><strong>RUT:</strong> {respuestas?.presidentRut}</p>
                    <p><strong>Domicilio:</strong> {respuestas?.presidentAddress}</p>
                    <p><strong>Correo electrónico:</strong> {respuestas?.presidentEmail}</p>
                    <p><strong>Teléfono:</strong> {respuestas?.presidentPhone}</p>
                    {/* Si el segundo teléfono no está disponible, muestra "No indica". */}
                    <p><strong>Teléfono 2:</strong> {respuestas?.presidentPhone2 === "" ? "No indica" : respuestas?.presidentPhone2}</p>
                </div>
            </Accordion>

            {/* Sección 3: Detalles del permiso */}
            <Accordion title="3. Detalles del permiso">
                <div className="grid grid-cols-2 gap-y-1">
                    <p><strong>Nombre de la actividad:</strong> {respuestas?.permissionName}</p>
                    <p><strong>Lugar de realización:</strong> {respuestas?.permissionPlace}</p>
                    <p><strong>Fecha de inicio:</strong> {formatDate(respuestas?.permissionStartDate)}, {respuestas?.permissionStartTime}</p>
                    <p><strong>Fecha de término:</strong> {formatDate(respuestas?.permissionEndDate)}, {respuestas?.permissionEndTime}</p>
                    <p><strong>Consumo y/o venta de bebidas alcohólicas:</strong> {respuestas?.permissionAlcohol === "true" ? "Si" : "No"}</p>
                    <p><strong>Consumo y/o venta de alimentos:</strong> {respuestas?.permissionFood === "true" ? "Si" : "No"}</p>
                    <p><strong>Descripción de la actividad:</strong> {respuestas?.permissionDescription}</p>
                    <p><strong>Destino de los fondos:</strong> {respuestas?.permissionPurpose}</p>
                </div>
            </Accordion>
        </>
    )
}

export default RespuestasPermisosTransitorios