const StatusTracker = ({ data }) => {

    return (
        <div>
            {data.map((log, index) => (
                <div className="flex gap-2 mb-4" key={index}>
                    <span className={`relative top-2.5 h-3 w-3 ${log.active ? "bg-green-600" : "border-2 border-green-600"} flex items-center justify-center rounded-full`}></span>
                    <div>
                        <p className={`text-xl ${log.active ? "text-green-600 font-bold" : "text-slate-400"}`}>{log.status}</p>
                        <p className="text-sm text-slate-500">{log.updated_at}</p>
                        <p className="text-slate-700">{log.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StatusTracker