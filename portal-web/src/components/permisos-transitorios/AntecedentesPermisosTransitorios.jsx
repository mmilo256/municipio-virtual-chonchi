import { useState } from "react"  // Importa hook useState para manejar el estado de los documentos cargados
import Container from "../ui/Container"  // Contenedor general para el diseño del formulario
import FileInput from "../ui/FileInput"  // Componente de entrada de archivos
import Heading from "../ui/Heading"  // Componente para títulos
import Button from "../ui/buttons/Button"  // Componente de botón para la navegación

const AntecedentesPermisosTransitorios = ({ title, stepTitle, onClickNext, onClickPrev }) => {

    // Estados para almacenar cada documento cargado por el usuario
    const [docCI, setDocCI] = useState("")  // Cédula de identidad del presidente
    const [docRutTributario, setDocRutTributario] = useState("")  // RUT Tributario
    const [docVigenciaPersonaJuridica, setDocVigenciaPersonaJuridica] = useState("")  // Certificado de vigencia de persona jurídica
    const [docOcupacionRecinto, setDocOcupacionRecinto] = useState("")  // Documento de ocupación legal del recinto
    const [docDeclaracionJurada, setDocDeclaracionJurada] = useState("")  // Declaración jurada simple ley 19.925
    const [docCertificadoAntecedentes, setDocCertificadoAntecedentes] = useState("")  // Certificado de antecedentes para fines especiales
    const [docFirmaPresidente, setDocFirmaPresidente] = useState("")  // Documento con firma del presidente

    // Función para manejar la acción al hacer clic en "Siguiente"
    const handleNext = () => {
        // Verificar que todos los documentos han sido cargados
        if (
            docCI &&
            docRutTributario &&
            docVigenciaPersonaJuridica &&
            docOcupacionRecinto &&
            docDeclaracionJurada &&
            docCertificadoAntecedentes &&
            docFirmaPresidente
        ) {
            // Crear objeto con los archivos cargados
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
            // Llamar la función onClickNext pasando los archivos cargados como argumento
            onClickNext(files)
        } else {
            // Si no todos los documentos están cargados, mostrar alerta
            alert("Debe adjuntar todos los documentos antes de enviar la solicitud")
        }
    }

    return (
        <Container>
            {/* Títulos para la sección */}
            <Heading level={2} align="left">{title}</Heading>
            <Heading align="left" level={3}>{stepTitle}</Heading>

            {/* Formulario para cargar los documentos */}
            <form name="permisos-transitorios-form">
                <div>
                    {/* Campos para cargar los documentos */}
                    <FileInput name="requestDoc" file={docCI} setFile={setDocCI} label="Cédula de identidad del presidente" />
                    <FileInput name="requestDoc" file={docRutTributario} setFile={setDocRutTributario} label="RUT Tributario" />
                    <FileInput name="requestDoc" file={docVigenciaPersonaJuridica} setFile={setDocVigenciaPersonaJuridica} label="Certificado de vigencia persona jurídica" />
                    <FileInput name="requestDoc" file={docOcupacionRecinto} setFile={setDocOcupacionRecinto} label="Documento de ocupación legal del recinto" />
                    <FileInput name="requestDoc" file={docDeclaracionJurada} setFile={setDocDeclaracionJurada} label="Declaración jurada simple ley 19.925 art. N°4" />
                    <FileInput name="requestDoc" file={docCertificadoAntecedentes} setFile={setDocCertificadoAntecedentes} label="Certificado de antecedentes para fines especiales" />
                    <FileInput name="requestDoc" file={docFirmaPresidente} setFile={setDocFirmaPresidente} label="Documento con firma del presidente" />
                </div>

                {/* Botones para navegación entre las etapas del formulario */}
                <div className="flex justify-end py-5 gap-4">
                    {/* Botón para regresar al paso anterior */}
                    <Button onClick={onClickPrev} variant="tertiary">Anterior</Button>
                    {/* Botón para continuar al siguiente paso */}
                    <Button onClick={handleNext} variant="secondary">Siguiente</Button>
                </div>
            </form>
        </Container>
    )
}

export default AntecedentesPermisosTransitorios
