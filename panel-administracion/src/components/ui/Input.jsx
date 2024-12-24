const Input = ({ type = "text", label, value, onChange }) => {

    return (
        <label className="flex flex-col mb-6">
            <span className="mb-1">{label}</span>
            <input value={value} onChange={(e) => { onChange(e.target.value) }} className="block rounded p-1 text-black outline-none border-2 focus:border-blue-300" type={type} />
        </label>
    )
}

export default Input