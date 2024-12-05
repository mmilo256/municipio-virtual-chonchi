const Input = ({ type = "text", label }) => {

    return (
        <label className="flex flex-col mb-6">
            <span className="mb-1">{label}</span>
            <input className="block rounded p-1 text-black outline-none border-2 border-transparent focus:border-blue-300" type={type} />
        </label>
    )
}

export default Input