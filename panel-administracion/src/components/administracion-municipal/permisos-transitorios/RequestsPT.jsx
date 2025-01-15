import { useEffect, useState } from "react"
import RequestsTablePT from "./RequestsTablePT"
import { fetchRequestsByProcedure } from "../../../services/requestsServices"
import { PROCEDURES_ID } from "../../../constants/constants"

const RequestsPT = () => {

    const [requests, setRequests] = useState([])

    useEffect(() => {
        (async () => {
            const requests = await fetchRequestsByProcedure(PROCEDURES_ID.permisosTrasitorios)
            setRequests(requests)
        })()
    }, [])


    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Solicitudes de permisos transitorios</h1>
            <RequestsTablePT data={requests} />
        </div>
    )
}

export default RequestsPT