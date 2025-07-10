import Container from "../../components/ui/Container"
import useFormsStore from "../../stores/useFormsStore"
import RespuestasPermisosTransitorios from "./RespuestasPermisosTransitorios"

const ConfirmarFormularioPT = () => {

    const { inputsValues, docsValues } = useFormsStore()

    const docsFiles = Object.values(docsValues)

    const formattedDocs = docsFiles.map(doc => ({
        ruta: URL.createObjectURL(doc)
    }))

    return (
        <Container>
            <div className="mt-4 text-sm">
                {/* Acordeones para mostrar los datos organizados */}
                <RespuestasPermisosTransitorios data={inputsValues} docs={formattedDocs} />
            </div >
        </Container >
    )
}

export default ConfirmarFormularioPT