import FileInput from "../../components/ui/FileInput"

const Paso4 = ({ docs, setDocs }) => {

    return (
        <>
            <FileInput name="docCI" file={docs.docCI} setFile={setDocs} label="Cédula de identidad del presidente" />
            <FileInput name="docRutTributario" file={docs.docRutTributario} setFile={setDocs} label="RUT Tributario" />
            <FileInput name="docVigenciaPersonaJuridica" file={docs.docVigenciaPersonaJuridica} setFile={setDocs} label="Certificado de vigencia persona jurídica" />
            <FileInput name="docOcupacionRecinto" file={docs.docOcupacionRecinto} setFile={setDocs} label="Documento de ocupación legal del recinto" />
            <FileInput name="docDeclaracionJurada" file={docs.docDeclaracionJurada} setFile={setDocs} label="Declaración jurada simple ley 19.925 art. N°4" />
            <FileInput name="docCertificadoAntecedentes" file={docs.docCertificadoAntecedentes} setFile={setDocs} label="Certificado de antecedentes para fines especiales" />
            <FileInput name="docFirmaPresidente" file={docs.docFirmaPresidente} setFile={setDocs} label="Documento con firma del presidente" />
        </>
    )
}

export default Paso4