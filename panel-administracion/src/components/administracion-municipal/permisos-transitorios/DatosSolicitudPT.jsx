import { API_URL } from "../../../constants/constants";
// Importa la URL base de la API desde un archivo de constantes para construir enlaces a documentos.

import { formatDate } from "../../../utils/format";
// Importa una función utilitaria para formatear fechas.

import Accordion from "../../ui/Accordion";
// Importa un componente Accordion para crear secciones desplegables en la interfaz.

const DatosSolicitudPT = ({ request, loading }) => {
    // Componente que muestra los detalles de una solicitud de permiso temporal (PT).
    // Recibe como props:
    // - `request`: objeto que contiene los datos de la solicitud.
    // - `loading`: booleano que indica si los datos aún se están cargando.

    // Función para obtener un documento relacionado con la solicitud según el nombre de su campo.
    const getDocByFieldname = (fieldname) => {
        if (!loading) {
            // Busca el documento dentro del array `documentos` de la solicitud por su `fieldname`.
            const doc = request.documentos.find(doc => doc.fieldname === `documentos[${fieldname}]`);
            return doc; // Devuelve el documento encontrado.
        }
    };

    return (
        <>
            {/* Sección 1: Datos de la organización */}
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

            {/* Sección 2: Datos del representante legal */}
            <Accordion title="2. Datos del representante legal">
                <div className="grid grid-cols-2">
                    <p><strong>Nombre Completo:</strong> {request.respuestas.presidentName}</p>
                    <p><strong>RUT:</strong> {request.respuestas.presidentRut}</p>
                    <p><strong>Domicilio:</strong> {request.respuestas.presidentAddress}</p>
                    <p><strong>Correo electrónico:</strong> {request.respuestas.presidentEmail}</p>
                    <p><strong>Teléfono:</strong> {request.respuestas.presidentPhone}</p>
                    {/* Si el segundo teléfono no está disponible, muestra "No indica". */}
                    <p><strong>Teléfono 2:</strong> {request.respuestas.presidentPhone2 === "NaN" ? "No indica" : request.respuestas.presidentPhone2}</p>
                </div>
            </Accordion>

            {/* Sección 3: Detalles del permiso */}
            <Accordion title="3. Detalles del permiso">
                <div className="grid grid-cols-2">
                    <p><strong>Nombre de la actividad:</strong> {request.respuestas.permissionName}</p>
                    <p><strong>Lugar de realización:</strong> {request.respuestas.permissionPlace}</p>
                    <p><strong>Fecha de inicio:</strong> {formatDate(request.respuestas.permissionStartDate, 1)}, {request.respuestas.permissionStartTime}</p>
                    <p><strong>Fecha de término:</strong> {formatDate(request.respuestas.permissionEndDate, 1)}, {request.respuestas.permissionEndTime}</p>
                    <p><strong>Consumo y/o venta de bebidas alcohólicas:</strong> {request.respuestas.permissionAlcohol === "true" ? "Si" : "No"}</p>
                    <p><strong>Consumo y/o venta de alimentos:</strong> {request.respuestas.permissionFood === "true" ? "Si" : "No"}</p>
                    <p><strong>Descripción de la actividad:</strong> {request.respuestas.permissionDescription}</p>
                    <p><strong>Destino de los fondos:</strong> {request.respuestas.permissionPurpose}</p>
                </div>
            </Accordion>

            {/* Sección 4: Antecedentes */}
            <Accordion title="4. Antecedentes">
                {/* Lista de documentos obligatorios con enlaces para descargarlos */}
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
        </>
    );
};

export default DatosSolicitudPT;
// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
