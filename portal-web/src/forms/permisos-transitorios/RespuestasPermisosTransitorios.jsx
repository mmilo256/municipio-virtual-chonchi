import Accordion from "../../components/ui/Accordion"
import { formatDate } from "../../utils/utils"

const RespuestasPermisosTransitorios = ({ data, docs }) => {

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
    } = data

    const itemStyles = "mb-2"

    const openDocument = (id) => {
        window.open(`https://municipiovirtualchonchi.cl/api/portal/documents/${id}/view`)
    }


    return (
        <div className="text-sm">
            {/* Acordeones para mostrar los datos organizados */}
            < Accordion title="1. Datos del solicitante" >
                <div className=" pl-2">
                    <div className={itemStyles}>
                        <p><strong>Nombre del solicitante </strong></p>
                        <p>{name || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>RUT </strong></p>
                        <p>{rut || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Correo electrónico </strong></p>
                        <p>{email || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Teléfono </strong></p>
                        <p>{phone || ""}</p>
                    </div>
                </div>
            </Accordion >
            <Accordion title="2. Datos de la organización">
                <div className=" pl-2">
                    <div className={itemStyles}>
                        <p><strong>Nombre o razón social </strong></p>
                        <p>{orgName || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>RUT de la organización </strong></p>
                        <p>{orgRut || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Domicilio </strong></p>
                        <p>{orgAddress || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Correo electrónico </strong></p>
                        <p>{orgEmail || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Teléfono </strong></p>
                        <p>{orgPhone || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Tipo de organización </strong></p>
                        <p>{orgType || ""}</p>
                    </div>
                </div>
            </Accordion>
            <Accordion title="3. Datos del representante legal">
                <div className=" pl-2">
                    <div className={itemStyles}>
                        <p><strong>Nombre completo </strong></p>
                        <p>{presidentName || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>RUT </strong></p>
                        <p>{presidentRut || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Domicilio </strong></p>
                        <p>{presidentAddress || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Correo electrónico </strong></p>
                        <p>{presidentEmail || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Teléfono </strong></p>
                        <p>{presidentPhone || ""}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Teléfono 2 </strong></p>
                        <p>{presidentPhone2 || "No tiene"}</p>
                    </div>
                </div>
            </Accordion>
            <Accordion title="4. Detalles del permiso">
                <div className=" pl-2">
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
                        <p>{JSON.parse(permissionAlcohol || false) ? "Si" : "No"}</p>
                    </div>
                    <div className={itemStyles}>
                        <p><strong>Consumo y/o venta de alimentos </strong></p>
                        <p>{JSON.parse(permissionFood || false) ? "Si" : "No"}</p>
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
                <ul className="list-disc list-inside pl-2 text-blue-700 underline">
                    {/* {docs.map((doc, index) => (
                        <button onClick={() => { openDocument(doc.id) }} className="block" key={index} >{doc.slug}</button>
                    ))} */}
                    <button onClick={() => { openDocument(docs[0].id) }} className="block">Cédula de identidad del representante legal</button>
                    <button onClick={() => { openDocument(docs[1].id) }} className="block">RUT tributario</button>
                    <button onClick={() => { openDocument(docs[2].id) }} className="block">Certificado de antecedentes para fines especiales</button>
                    <button onClick={() => { openDocument(docs[3].id) }} className="block">Certificado de vigencia de Persona Jurídica</button>
                    <button onClick={() => { openDocument(docs[4].id) }} className="block">Documento que acredita la ocupación legal del recinto</button>
                    <button onClick={() => { openDocument(docs[5].id) }} className="block">Declaración jurada simple Ley 19.925 de alcoholes</button>
                    <button onClick={() => { openDocument(docs[6].id) }} className="block">Firma del representante legal</button>
                </ul>
            </Accordion>
        </div>
    )
}

export default RespuestasPermisosTransitorios