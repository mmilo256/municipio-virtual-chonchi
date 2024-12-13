import { useState } from "react"
import Container from "../ui/Container"
import FileInput from "../ui/FileInput"
import Heading from "../ui/Heading"
import Button from "../ui/buttons/Button"

const AntecedentesPermisosTransitorios = ({ title, stepTitle, onClickNext, onClickPrev }) => {

    // Estados para cada documento
    const [docCI, setDocCI] = useState("")
    const [docRutTributario, setDocRutTributario] = useState("")
    const [docVigenciaPersonaJuridica, setDocVigenciaPersonaJuridica] = useState("")
    const [docOcupacionRecinto, setDocOcupacionRecinto] = useState("")
    const [docDeclaracionJurada, setDocDeclaracionJurada] = useState("")
    const [docCertificadoAntecedentes, setDocCertificadoAntecedentes] = useState("")
    const [docFirmaPresidente, setDocFirmaPresidente] = useState("")

    const handleNext = () => {
        if (
            docCI &&
            docRutTributario &&
            docVigenciaPersonaJuridica &&
            docOcupacionRecinto &&
            docDeclaracionJurada &&
            docCertificadoAntecedentes &&
            docFirmaPresidente
        ) {
            const files = {
                docs: {
                    docCI,
                    docRutTributario,
                    docVigenciaPersonaJuridica,
                    docOcupacionRecinto,
                    docDeclaracionJurada,
                    docCertificadoAntecedentes,
                    docFirmaPresidente
                }
            }
            onClickNext(files)
        } else {
            alert("Debe adjuntar todos los documentos antes de enviar la solicitud")
        }

    }

    return (
        <Container>
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{stepTitle}</Heading>
            <form name="permisos-transitorios-form">
                <div>
                    <FileInput name="requestDoc" file={docCI} setFile={setDocCI} label="Cédula de identidad del presidente" />
                    <FileInput name="requestDoc" file={docRutTributario} setFile={setDocRutTributario} label="RUT Tributario" />
                    <FileInput name="requestDoc" file={docVigenciaPersonaJuridica} setFile={setDocVigenciaPersonaJuridica} label="Certificado de vigencia persona jurídica" />
                    <FileInput name="requestDoc" file={docOcupacionRecinto} setFile={setDocOcupacionRecinto} label="Documento de ocupación legal del recinto" />
                    <FileInput name="requestDoc" file={docDeclaracionJurada} setFile={setDocDeclaracionJurada} label="Declaración jurada simple ley 19.925 art. N°4" />
                    <FileInput name="requestDoc" file={docCertificadoAntecedentes} setFile={setDocCertificadoAntecedentes} label="Certificado de antecedentes para fines especiales" />
                    <FileInput name="requestDoc" file={docFirmaPresidente} setFile={setDocFirmaPresidente} label="Documento con firma del presidente" />
                </div>
                <div className="flex justify-end py-5 gap-4">
                    <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                    {<Button onClick={handleNext} variant="secondary">Siguiente</Button>}
                </div>
            </form>
        </Container>
    )
}

export default AntecedentesPermisosTransitorios