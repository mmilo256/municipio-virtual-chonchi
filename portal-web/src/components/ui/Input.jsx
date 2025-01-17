import { setInputOptions } from "../../data/inputOptions";

// Define estilos comunes para todos los tipos de entrada
const INPUT_STYLES = 'border border-slate-400 rounded disabled:text-slate-600 p-1 w-full focus:outline-blue-400'

const Input = ({
    register,
    label,
    name,
    type,
    options,
    placeholder,
    disabled,
    min,
    max,
    required,
    className,
    error,
    setValue,
    defaultValue,
    value
}) => {

    // Obtener fecha actual para establecerla como atributo min a los inputs date
    let today
    if (type === "date") {
        today = new Date().toISOString().split("T")[0]
    }

    // Variable para almacenar el componente de entrada que se renderizará
    let input;

    // Selecciona el tipo de entrada basado en la prop `type`
    switch (type) {
        case "file":
            input = <input
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                name={'requestDoc'}
                minLength={min}
                maxLength={max}
                max={max}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} border-none text-slate-500`}
                type="file"
            />
            break;
        case "phone":
            input = <input
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                name={name}
                minLength={min}
                maxLength={max}
                max={max}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} ${className}`}
                type="text"
            />
            break;
        case "textarea":
            // Renderiza un textarea si el tipo es "textarea"
            input = <textarea
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                minLength={min}
                name={name}
                maxLength={max}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} col-span-2`}
            />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                disabled={disabled}
                name={name}
                className={`${INPUT_STYLES} ${className}`}
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
        case "date":
            input = <input
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                name={name}
                disabled={disabled}
                value={value}
                className={`${INPUT_STYLES} ${className}`}
                type="date"
                min={today}
            />
            break;
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input
                {...register(name, setInputOptions(required, min, type, setValue, name))}
                name={name}
                minLength={min}
                defaultValue={defaultValue}
                maxLength={max}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} ${className}`}
                type={type}
            />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (

        <label className="relative">
            <span className="text-slate-600 font-medium">{label} {!required && <span className="text-slate-400 ml-1">(opcional)</span>} </span>
            {input}
            {/* type === "textarea" && <span className="text-slate-500 text-xs">{`${value[name].value.length}/${max}`}</span> */}
            {error && <span className="absolute left-0 -bottom-4 text-red-500 text-xs">{error.message}</span>}
        </label >

    )
}
export default Input
