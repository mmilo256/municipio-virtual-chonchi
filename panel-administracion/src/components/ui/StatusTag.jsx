const StatusTag = ({ status }) => {


    let statusBgColor = ""
    let statusTextColor = ""
    switch (status) {
        case "pendiente":
            statusBgColor = "bg-amber-200"
            statusTextColor = "text-amber-800"
            break;
        case "en revision":
            statusBgColor = "bg-blue-200"
            statusTextColor = "text-blue-800"
            break;
        case "rechazada":
            statusBgColor = "bg-red-200"
            statusTextColor = "text-red-800"
            break;
        case "aprobada":
            statusBgColor = "bg-green-200"
            statusTextColor = "text-green-800"
            break;
        case "firmada":
            statusBgColor = "bg-violet-200"
            statusTextColor = "text-violet-800"
            break;
        case "finalizada":
            statusBgColor = "bg-slate-200"
            statusTextColor = "text-slate-800"
            break;

        default:
            break;
    }

    return (
        <span className={`${statusBgColor} ${statusTextColor} whitespace-nowrap capitalize text-sm px-3 py-1 rounded-full`}>{status}</span>
    )
}

export default StatusTag