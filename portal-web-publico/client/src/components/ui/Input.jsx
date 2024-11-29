import { setErrorMessages } from "../../data/inputsErrorMessages";

// Define estilos comunes para todos los tipos de entrada
const INPUT_STYLES = 'border border-slate-400 p-1 w-full focus:outline-blue-400'

const Input = ({ register, label, name, type, options, placeholder, disabled, min, max, required, className, error }) => {

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
                {...register(name, setErrorMessages(required, min))}
                name={name}
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
                {...register(name, setErrorMessages(required, min))}
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
                {...register(name, setErrorMessages(required, min))}
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
                {...register(name, setErrorMessages(required, min))}
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
                {...register(name, setErrorMessages(required, min))}
                name={name}
                disabled={disabled}
                className={`${INPUT_STYLES} ${className}`}
                type="date"
                min={today}
            />
            break;
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input
                {...register(name, setErrorMessages(required, min))}
                name={name}
                minLength={min}
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

        <label>
            <span>{label} {!required && <span className="text-slate-400 ml-1">(opcional)</span>} </span>
            {input}
            {/* type === "textarea" && <span className="text-slate-500 text-xs">{`${value[name].value.length}/${max}`}</span> */}
            {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </label >

    )
}
export default Input
