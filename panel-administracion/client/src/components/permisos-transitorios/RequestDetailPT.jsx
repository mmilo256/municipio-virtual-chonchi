import Accordion from "../ui/Accordion";

const RequestDetailPT = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Solicitud de permiso transitorio #1234</h1>
            <p className="text-slate-500"><strong>Fecha de solicitud:</strong> 03 de diciembre de 2024, 13:45</p>

            <div className="mt-4">
                <h2 className="text-xl mb-2 font-semibold">Información del solicitante</h2>
                <div className=" bg-[#fff] p-4 shadow rounded">
                    <p>Nombre: Juan Pérez López</p>
                    <p>RUT: 19722280-8</p>
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Datos de la solicitud</h2>
                <Accordion title="1. Datos de la organización">
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre o razón social:</strong> Junta de vecinos 55</p>
                        <p><strong>RUT de la organización:</strong> 77428493-K</p>
                        <p><strong>Domicilio:</strong> Calle 123</p>
                        <p><strong>Correo electrónico:</strong> juntav55@gmail.com</p>
                        <p><strong>Teléfono:</strong> +569 5869 8878</p>
                        <p><strong>Tipo de organización:</strong> Junta de vecinos</p>
                    </div>
                </Accordion>
                <Accordion title="2. Datos del representante legal">
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre Completo:</strong> Juan Pérez</p>
                        <p><strong>RUT:</strong> 19722280-8</p>
                        <p><strong>Domicilio:</strong> Calle 123</p>
                        <p><strong>Correo electrónico:</strong> juntav55@gmail.com</p>
                        <p><strong>Teléfono:</strong> +569 5869 8878</p>
                        <p><strong>Teléfono 2:</strong> No tiene</p>
                    </div>
                </Accordion>
                <Accordion title="3. Detalles del permiso">
                    {/* Seguir con las plantillas */}
                </Accordion>
            </div>
        </div>
    )
}

export default RequestDetailPT