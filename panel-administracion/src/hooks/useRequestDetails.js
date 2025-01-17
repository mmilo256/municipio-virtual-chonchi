import { useEffect, useState } from "react";
// Importa `useEffect` para manejar efectos secundarios y `useState` para manejar estados en componentes funcionales.

import { fetchRequestById } from "../services/requestsServices";
// Importa el servicio que obtiene los detalles de una solicitud específica por su ID.

import { fetchFinalDocument } from "../services/permisosTransitoriosServices";
// Importa el servicio que obtiene documentos finales relacionados con permisos transitorios.

const useRequestDetails = (id) => {
    // Estado que almacena los detalles completos de la solicitud.
    const [request, setRequest] = useState({});

    // Estado que almacena el estado actual de la solicitud (ej. pendiente, aprobada, finalizada, etc.).
    const [status, setStatus] = useState("");

    // Estado que almacena el documento generado sin firmar.
    const [unsignedDoc, setUnsignedDoc] = useState(null);

    // Estado que almacena el documento firmado.
    const [signedDoc, setSignedDoc] = useState(null);

    // Estado que controla si los datos están siendo cargados.
    const [loading, setLoading] = useState(true);

    // Efecto secundario que se ejecuta al montar el componente o cuando el `id` cambia.
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Llama al servicio para obtener los detalles de la solicitud por su ID.
                const request = await fetchRequestById(id);

                // Llama al servicio para obtener el documento sin firmar relacionado con la solicitud.
                const unsignedDoc = await fetchFinalDocument(id, "sin firmar");

                // Llama al servicio para obtener el documento firmado relacionado con la solicitud.
                const signedDoc = await fetchFinalDocument(id, "firmado");

                // Actualiza el estado con los datos obtenidos.
                setRequest(request);
                setStatus(request.estado); // Almacena el estado de la solicitud.
                setUnsignedDoc(unsignedDoc); // Almacena el documento sin firmar.
                setSignedDoc(signedDoc); // Almacena el documento firmado.

                setLoading(false); // Cambia el estado de `loading` a `false` una vez que los datos han sido cargados.
            } catch (error) {
                // Manejo de errores si algo falla durante la obtención de datos.
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Ejecuta la función que obtiene los datos.
    }, [id]);
    // Dependencia: Este efecto se ejecutará nuevamente solo si el valor de `id` cambia.

    // Devuelve los datos y funciones necesarias para ser utilizados en el componente.
    return { request, status, unsignedDoc, signedDoc, loading, setStatus };
};

export default useRequestDetails;
// Exporta el hook para que pueda ser utilizado en otros componentes.
