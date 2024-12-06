import Accordion from "../ui/Accordion";
const RequestDetailPT = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Solicitud de permiso transitorio #1234</h1>
            <p className="text-slate-500"><strong>Fecha de solicitud:</strong> 03 de diciembre de 2024, 13:45</p>

            <div className="flex items-center gap-4 my-4">
                <button className="bg-red-300 hover:bg-red-200 text-red-800 py-2 px-5 rounded">Rechazar solicitud</button>
                <button className="bg-green-300 hover:bg-green-200 text-green-800 py-2 px-5 rounded">Procesar solicitud</button>
            </div>
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
                    <div className="grid grid-cols-2">
                        <p><strong>Nombre de la actividad:</strong> Bingo Bailable</p>
                        <p><strong>Lugar de realización:</strong> Club de Huasos Notuco</p>
                        <p><strong>Fecha de inicio:</strong> 30/12/2024</p>
                        <p><strong>Hora de inicio:</strong> 17:30</p>
                        <p><strong>Fecha de término:</strong> 30/12/2024</p>
                        <p><strong>Hora de término:</strong> 22:45</p>
                        <p><strong>Consumo y/o venta de bebidas alcohólicas:</strong> Si</p>
                        <p><strong>Consumo y/o venta de alimentos:</strong> Si</p>
                        <p><strong>Descripción de la actividad:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto vel quaerat iusto iste illo asperiores ipsa illum perspiciatis nemo tenetur obcaecati magni provident doloribus eligendi inventore dignissimos, sit distinctio facere?</p>
                        <p><strong>Destino de los fondos:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus magni nobis aliquid adipisci eligendi culpa voluptas quae itaque maxime neque, nesciunt id impedit dolores delectus eius quasi pariatur blanditiis ad!</p>
                    </div>
                </Accordion>
                <Accordion title="4. Antecedentes">
                    <ul className="list-disc list-inside text-blue-700 underline">
                        <li><a href="#">Cédula de identidad del representante legal</a></li>
                        <li><a href="#">RUT tributario</a></li>
                        <li><a href="#">Certificado de antecedentes para fines especiales</a></li>
                        <li><a href="#">Certificado de vigencia de Persona Jurídica</a></li>
                        <li><a href="#">Documento que acredita la ocupación legal del recinto</a></li>
                        <li><a href="#">Declaración jurada simple Ley 19.925 de alcoholes</a></li>
                    </ul>
                </Accordion>
            </div>
        </div>
    )
}

export default RequestDetailPT