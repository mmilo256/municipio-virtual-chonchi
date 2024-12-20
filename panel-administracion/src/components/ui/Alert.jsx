const Alert = ({ type = "info", text }) => {

    let alertBgColor = ""
    let alertTextColor = ""
    let alertSpanColor = ""
    switch (type) {
        case "info":
            alertBgColor = "bg-blue-100"
            alertTextColor = "text-blue-800"
            alertSpanColor = "bg-blue-400"
            break
        case "warning":
            alertBgColor = "bg-amber-100"
            alertTextColor = "text-amber-800"
            alertSpanColor = "bg-amber-400"
            break;
        default:
            break;
    }

    return (
        <div className={`w-full ${alertBgColor} flex rounded overflow-hidden shadow`}>
            <span className={`${alertSpanColor} w-1`}></span>
            <span className={`p-2 ${alertTextColor}`}>{text}</span>
        </div>
    )
}

export default Alert