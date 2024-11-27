import { useNavigate } from "react-router-dom"
import Upload from "../ui/Upload"
import usePermisosTransitoriosStore from "../../stores/usePermisosTransitoriosStore"
import { useEffect, useState } from "react"
import Alert from "../ui/Alert"
import { createApplication } from "../../services/webFormServices"
import Container from "../ui/Container"
import Heading from "../ui/Heading"
import Button from "../ui/Button"
import { sendEmail } from "../../services/emailServices"
import Layout from "../Layout"

const EMAIL_PARTES = "emiliosotoandrade256@gmail.com"

const Form04 = () => {

    // Función para actualizar los datos de documentos en el estado global
    const formData = usePermisosTransitoriosStore(state => state.formData)
    const setDocsData = usePermisosTransitoriosStore(state => state.setDocsData)

    const [errorMessage, setErrorMessage] = useState("")

    const [showAlert, setShowAlert] = useState(false)

    // Estado local para manejar los archivos subidos
    const [files, setFiles] = useState(formData.docsData)

    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    // Hook para la navegación programática
    const navigate = useNavigate()

    // Función para navegar a la página anterior
    const onClickPrev = () => {
        navigate("/permisos-transitorios/detalles-permiso")
    }

    useEffect(() => {
        let valid = true
        let errorMsg = ""

        // Verifica que todos los campos obligatorios estén llenos
        if (
            !formData.orgData.name ||
            !formData.orgData.rut ||
            !formData.orgData.address ||
            !formData.orgData.email ||
            !formData.orgData.phone ||
            !formData.orgData.orgType ||
            !formData.personData.name ||
            !formData.personData.rut ||
            !formData.personData.address ||
            !formData.personData.email ||
            !formData.personData.phone ||
            !formData.permissionData.name ||
            !formData.permissionData.place ||
            !formData.permissionData.startDate ||
            !formData.permissionData.startTime ||
            !formData.permissionData.endDate ||
            !formData.permissionData.endTime ||
            !formData.permissionData.alcohol ||
            !formData.permissionData.food ||
            !formData.permissionData.description ||
            !formData.permissionData.purpose
        ) {
            valid = false;
            errorMsg = "Debe rellenar todos los campos obligatorios";
        } else {
            // Validación de fechas
            const { startDate, endDate, startTime, endTime } = formData.permissionData;

            const startDateTime = new Date(`${startDate}T${startTime}`);
            const endDateTime = new Date(`${endDate}T${endTime}`);

            if (startDateTime >= endDateTime) {
                valid = false;
                errorMsg = "La fecha de inicio no puede ser posterior a la fecha de término";
            }
            if (files.length > 10) {
                valid = false
                errorMsg = "No se puede subir más de 10 archivos."
            }
        }

        setIsValid(valid);
        setErrorMessage(errorMsg);
    }, [formData, files.length]);


    // Función para manejar la acción del botón "Enviar solicitud"
    const onClickNext = async () => {
        setLoading(true)
        // Actualiza el estado global con los archivos subidos
        await setDocsData(files)
        // Muestra un mensaje de éxito
        const data = new FormData()
        data.append('org_name', formData.orgData.name)
        data.append('org_rut', formData.orgData.rut)
        data.append('org_address', formData.orgData.address)
        data.append('org_email', formData.orgData.email)
        data.append('org_phone', formData.orgData.phone)
        data.append('org_type', formData.orgData.orgType)
        data.append('owner_name', formData.personData.name)
        data.append('owner_rut', formData.personData.rut)
        data.append('owner_address', formData.personData.address)
        data.append('owner_email', formData.personData.email)
        data.append('owner_phone', formData.personData.phone)
        data.append('owner_phone2', formData.personData.phone2)
        data.append('activity_name', formData.permissionData.name)
        data.append('place', formData.permissionData.place)
        data.append('start_date', formData.permissionData.startDate)
        data.append('start_time', formData.permissionData.startTime)
        data.append('end_date', formData.permissionData.endDate)
        data.append('end_time', formData.permissionData.endTime)
        data.append('is_alcohol', formData.permissionData.alcohol)
        data.append('is_food', formData.permissionData.food)
        data.append('description', formData.permissionData.description)
        data.append('purpose', formData.permissionData.purpose)
        files.forEach(file => {
            data.append('files', file)
        })

        const config = { headers: { 'Content-Type': 'multipart/form-data' } }

        if (isValid) {
            try {
                await createApplication(data, config)
                const emailTemplate = `
                <div style="max-width: 28rem; margin: 0 auto; padding: 1.5rem; font-family: sans-serif; background-color: #f9fafb; border-radius: 0.5rem; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #2563eb; color: white; padding: 1rem; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem; text-align: center;">
                        <h1 style="font-size: 1.125rem; font-weight: 600; margin: 0;">Notificación de Nueva Solicitud de Permiso</h1>
                    </div>
                    <div style="padding: 1.5rem; background-color: white; border-bottom-left-radius: 0.5rem; border-bottom-right-radius: 0.5rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;">Estimado/a Funcionario/a:</h2>
                        <p style="margin-bottom: 1rem;">Ha llegado una nueva solicitud de permiso que requiere ser ingresada en el Sistema de Gestión Documental.</p>
                        <p style="font-weight: bold; margin-bottom: 0.5rem;">Detalles de la solicitud:</p>
                        <div style="padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem; margin-bottom: 1rem;">
                            <p>Actividad: <strong>${formData.permissionData.name}</strong></p>
                            <p>Ubicación: <strong>${formData.permissionData.place}</strong></p>
                            <p>¿Consumo y/o venta de alcohol?: <strong>${formData.permissionData.alcohol ? "Sí" : "No"}</strong></p>
                            <p>¿Consumo y/o venta de alimentos?: <strong>${formData.permissionData.food ? "Sí" : "No"}</strong></p>
                            <p>Fecha y hora de inicio: <strong>${formData.permissionData.startDate}, ${formData.permissionData.startTime}</strong></p>
                            <p>Fecha y hora de término: <strong>${formData.permissionData.endDate}, ${formData.permissionData.endTime}</strong></p>
                            <p>Descripción: <strong>${formData.permissionData.description}</strong></p>
                            <p>Destino de los fondos: <strong>${formData.permissionData.purpose}</strong></p>
                        </div>
                        <hr style="margin: 1rem 0;">
                        <p style="margin-bottom: 1rem;">Por favor, ingrese esta solicitud en el sistema y reenvíe este correo a Administración Municipal indicando el número de folio asignado.</p>
                        <p style="margin-bottom: 1rem;">
                            Atentamente,<br>
                            Ilustre Municipalidad de Chonchi
                        </p>
                    </div>
                    <div style="text-align: center; font-size: 0.75rem; color: #6b7280; margin-top: 1rem;">
                        <p>Este es un correo automático, por favor no responda.</p>
                    </div>
                </div>
                `
                await sendEmail(EMAIL_PARTES, "SOLICITUD DE PERMISO: INGRESAR EN SISTEMA DE GESTIÓN DOCUMENTAL", emailTemplate)
                navigate("/permisos-transitorios/solicitud-enviada")
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        } else {
            setShowAlert(true)
        }
    }

    return (
        // Renderiza el layout del formulario con título, botones de navegación y texto del botón "Enviar solicitud"
        <>
            <Alert variant="warning" text={errorMessage} visible={showAlert} setVisible={setShowAlert} />

            <Layout>
                <Container>
                    {/* Título principal del formulario */}
                    <Heading>Formulario de Solicitud de Autorización Especial Transitoria</Heading>
                    {/* Título específico para la sección del formulario */}
                    <Heading align="left" level={3}>4. Antecedentes</Heading>
                    {/* Renderiza los campos y componentes hijos del formulario */}
                    <form>
                        <Upload files={files} setFiles={setFiles} label="Subir antecedentes y firma del representante legal" />

                        {/* Contenedor para los botones de navegación */}
                        <div className="flex gap-2 justify-end border-t border-t-slate-300 mt-6 pt-6">
                            {/* Botón para retroceder a la página anterior, si se proporciona la función onClickPrev */}
                            {onClickPrev && <Button variant="tertiary" type="button" onClick={onClickPrev}>Anterior</Button>}
                            {/* Botón para avanzar al siguiente paso, si se proporciona la función onClickNext */}
                            {onClickNext && <Button disabled={loading} variant="secondary" type="button" onClick={onClickNext}>Enviar solicitud</Button>}
                        </div>
                    </form>
                </Container>
            </Layout>
        </>
    )
}

export default Form04
