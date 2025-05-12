import { SERVER_URL } from "../../../constants/constants"

const DocsPermisosTransitorios = ({ docs = [] }) => {

    const reqDocs = [
        {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[0]?.path}`} className="text-blue-600 underline">Cédula de identidad</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[1]?.path}`} className="text-blue-600 underline">RUT Tributario</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[2]?.path}`} className="text-blue-600 underline">Vigencia de Persona Jurídica</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[3]?.path}`} className="text-blue-600 underline">Documento de ocupación legal del recinto</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[4]?.path}`} className="text-blue-600 underline">Declaración jurada</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[5]?.path}`} className="text-blue-600 underline">Certificado de antecedentes</a>
        }, {
            name: <a target="__blank" href={`${SERVER_URL}/${docs[6]?.path}`} className="text-blue-600 underline">Firma del presidente</a>
        },
    ]

    return (
        <>
            < ul >
                {reqDocs.map((doc, index) => (
                    <li key={index}>{doc.name}</li>
                ))}
            </ul >
        </>
    )
}

export default DocsPermisosTransitorios