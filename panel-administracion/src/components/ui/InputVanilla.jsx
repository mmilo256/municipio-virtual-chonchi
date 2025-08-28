const Input = ({ type = "text", label, value, onChange, name, className }) => {

    let input
    const inputStyles = "block rounded p-1 text-black outline-none border-2 focus:border-blue-300"

    switch (type) {
        case "textarea":
            input = <textarea name={name} value={value} onChange={(e) => { onChange(e.target.value) }} className={inputStyles} />
            break;

        default:
            input = <input name={name} value={value} onChange={(e) => { onChange(e.target.value) }} className={inputStyles} type={type} />
            break;
    }

    return (
        <label className={`flex flex-col mb-3 ${className}`}>
            <span className="mb-1">{label}</span>
            {input}
        </label>
    )
}

export default Input