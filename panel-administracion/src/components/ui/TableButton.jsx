const TableButton = ({ text, onClick, color }) => {

    let buttonColor
    switch (color) {
        case "red":
            buttonColor = "bg-red-300 hover:bg-red-400"
            break;
        case "blue":
            buttonColor = "bg-blue-300 hover:bg-blue-400"
            break;
        default:
            buttonColor = "bg-slate-300 hover:bg-slate-400"
            break
    }

    return (
        <button className={`${buttonColor} text-xs px-2 py-1 rounded`} onClick={onClick}>{text}</button>
    )
}

export default TableButton