import { FaHistory } from "react-icons/fa";

const RecentActivity = ({ employee, action, requestId, procedure, time }) => {
    return (
        <div className="flex items-start gap-4">
            <span className="relative top-1"><FaHistory /></span>
            <div>
                <p><strong>{employee}</strong> {action} <strong>#{requestId}</strong> ({procedure})</p>
                <span className="text-sm text-slate-500">{time}</span>
            </div>
        </div>
    )
}

export default RecentActivity