const TableButton = ({ text, onClick, color }) => {

    let buttonColor
    switch (color) {
        case "red":
            buttonColor = "bg-red-200 hover:bg-red-300"
            break;
        case "blue":
            buttonColor = "bg-blue-200 hover:bg-blue-300"
            break;
        default:
            buttonColor = "bg-slate-200 hover:bg-slate-300"
            break
    }

    return (
        <button className={`${buttonColor} text-xs px-2 py-1 rounded shadow`} onClick={onClick}>{text}</button>
    )
}

export default TableButton