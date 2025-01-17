import { useEffect, useState } from "react";
import { fetchRequestById } from "../services/requestsServices";
import { fetchFinalDocument } from "../services/permisosTransitoriosServices";

const useRequestDetails = (id) => {
    const [request, setRequest] = useState({});
    const [status, setStatus] = useState("");
    const [unsignedDoc, setUnsignedDoc] = useState(null);
    const [signedDoc, setSignedDoc] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await fetchRequestById(id);
                const unsignedDoc = await fetchFinalDocument(id, "sin firmar");
                const signedDoc = await fetchFinalDocument(id, "firmado");

                setRequest(request);
                setStatus(request.estado);
                setUnsignedDoc(unsignedDoc);
                setSignedDoc(signedDoc);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    return { request, status, unsignedDoc, signedDoc, loading, setStatus };

}

export default useRequestDetails;