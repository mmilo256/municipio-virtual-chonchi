import { useState } from "react"
import { SERVER_URL } from "../../../constants/constants"
import BaseTable from "../../ui/BaseTable"
import TableButton from "../../ui/TableButton"
import { useEffect } from "react"
import { downloadDocumentService } from "../../../services/documents.service"

const DocsPermisosTransitorios = ({ docs = [] }) => {

    const columns = ["Documento", "Acciones"]
    const [data, setData] = useState([])

    // Descargar documento
    const onDownloadDocument = (id) => {
        try {
            downloadDocumentService(id)
        } catch (error) {
            console.log(error)
            alert("No se pudo descargar el documento")
        }
    }

    useEffect(() => {
        const reqDocs = [
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[0]?.ruta}`}>Cédula de identidad</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[0].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[1]?.ruta}`}>RUT Tributario</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[1].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[2]?.ruta}`}>Vigencia de Persona Jurídica</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[2].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[3]?.ruta}`}>Documento de ocupación legal del recinto</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[3].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[4]?.ruta}`}>Declaración Jurada</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[4].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[5]?.ruta}`}>Certificado de antecedentes</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[5].id) }} color="blue" text="Descargar" />
            },
            {
                link: <a target="__blank" className="text-blue-500 underline" href={`${SERVER_URL}/${docs[6]?.ruta}`}>Firma del presidente</a>,
                href: <TableButton onClick={() => { onDownloadDocument(docs[6].id) }} color="blue" text="Descargar" />
            },
        ];
        setData(reqDocs)
    }, [docs])


    return (
        <BaseTable data={data} columns={columns} />
    )
}

export default DocsPermisosTransitorios