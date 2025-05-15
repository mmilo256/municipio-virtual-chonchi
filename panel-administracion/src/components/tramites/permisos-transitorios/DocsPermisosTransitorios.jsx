import { SERVER_URL } from "../../../constants/constants"

const DocsPermisosTransitorios = ({ docs = [] }) => {

    /* const reqDocs = [
        {
            name: "Cédula de identidad",
            href: `${SERVER_URL}/${docs[0]?.ruta}`
        },
        {
            name: "RUT Tributario",
            href: `${SERVER_URL}/${docs[1]?.ruta}`
        },
        {
            name: "Vigencia de Persona Jurídica",
            href: `${SERVER_URL}/${docs[2]?.ruta}`
        },
        {
            name: "Documento de ocupación legal del recinto",
            href: `${SERVER_URL}/${docs[3]?.ruta}`
        },
        {
            name: "Declaración jurada",
            href: `${SERVER_URL}/${docs[4]?.ruta}`
        },
        {
            name: "Certificado de antecedentes",
            href: `${SERVER_URL}/${docs[5]?.ruta}`
        },
        {
            name: "Firma del presidente",
            href: `${SERVER_URL}/${docs[6]?.ruta}`
        },
    ]; */

    return (
        < ul >
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[0]?.ruta}`}>Cédula de identidad</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[1]?.ruta}`}>RUT Tributario</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[2]?.ruta}`}>Vigencia de Persona Jurídica</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[3]?.ruta}`}>Documento de ocupación legal del recinto</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[4]?.ruta}`}>Declaración Jurada</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[5]?.ruta}`}>Certificado de antecedentes</a></li>
            <li><a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[6]?.ruta}`}>Firma del presidente</a></li>
        </ul >
    )
}

export default DocsPermisosTransitorios