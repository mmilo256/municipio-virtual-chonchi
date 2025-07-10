const StatusTracker = ({ data }) => {

    return (
        <div className="text-xs md:text-sm">
            {data.map((log, index) => (
                <div className="flex gap-2 mb-4" key={index}>
                    <span className={`relative top-2.5 h-2 w-2 ${log.status === "rechazada" ? "bg-red-500" : (log.active ? "bg-green-500" : "border-2 border-green-500")} flex items-center justify-center rounded-full`}></span>
                    <div>
                        <p className={`text-base ${log.status === "rechazada" ? "text-red-500 font-bold" : (log.active ? "text-green-500 font-bold" : "text-slate-400")}`}>{log.status}</p>
                        <p className="text-slate-500">{log.updated_at}</p>
                        <p className="text-slate-700">{log.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatusTracker