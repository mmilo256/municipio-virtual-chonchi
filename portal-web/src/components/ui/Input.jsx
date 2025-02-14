// Define estilos comunes para todos los tipos de entrada
const INPUT_STYLES = 'border border-slate-400 rounded disabled:text-slate-600 p-1 w-full focus:outline-blue-400'

const Input = ({
    register,
    disabled,
    label,
    name,
    type = "text",
    options,
    placeholder,
    error,
    validations
}) => {

    // Variable para almacenar el componente de entrada que se renderizará
    let input;

    // Selecciona el tipo de entrada basado en la prop `type`
    switch (type) {
        case "file":
            input = <input
                {...register(name, { ...validations })}
                name={'requestDoc'}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} border-none text-slate-500`}
                type="file"
            />
            break;
        case "textarea":
            // Renderiza un textarea si el tipo es "textarea"
            input = <textarea
                {...register(name, { ...validations })}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} col-span-2`}
            />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select
                {...register(name, { ...validations })}
                name={name}
                disabled={disabled}
                className={`${INPUT_STYLES}`}
            >
                <option value="">Seleccione una opción</option>
                {/* Mapea las opciones para crear elementos <option> */}
                {options.map((op, index) => (
                    <option
                        key={index}
                        value={op.value}
                    >{op.label}</option>
                ))}
            </select>
            break;
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input
                {...register(name, { ...validations })}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES}`}
                type={type}
            />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (
        <label>
            <p className="text-slate-600 font-medium">{label}</p>
            {input}
            {/* type === "textarea" && <span className="text-slate-500 text-xs">{`${value[name].value.length}/${max}`}</span> */}
            {error && <p className="left-0 -bottom-4 text-red-500 text-xs">{error.message}</p>}
        </label >
    )
}
export default Input
