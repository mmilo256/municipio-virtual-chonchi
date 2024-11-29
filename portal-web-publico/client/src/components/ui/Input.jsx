import { validateEmailInput, validatePhoneInput, validateRutInput, validateTextInput } from "../../utils/validations"

// Define estilos comunes para todos los tipos de entrada
const INPUT_STYLES = 'border border-slate-400 p-1 w-full focus:outline-blue-400'

const Input = ({ label, name, type, options, value, onChange, placeholder, disabled, min, max, required }) => {

    // Obtener fecha actual para establecerla como atributo min a los inputs date
    let today
    if (type === "date") {
        today = new Date().toISOString().split("T")[0]
    }

    console.log(`${name}: ${required}`)

    const onInputChange = (e) => {
        const currentValue = e.target.value
        switch (type) {
            case "phone":
                validatePhoneInput(currentValue, name, min, onChange, required)
                break;
            case "email":
                validateEmailInput(currentValue, name, min, onChange, required)
                break;
            case "rut":
                validateRutInput(currentValue, name, min, onChange, required)
                break;
            default:
                validateTextInput(currentValue, name, min, onChange, required)
                break;
        }
    }

    // Variable para almacenar el componente de entrada que se renderizará
    let input;

    // Selecciona el tipo de entrada basado en la prop `type`
    switch (type) {
        case "phone":
            input = <input
                name={name}
                minLength={min}
                maxLength={max}
                max={max}
                disabled={disabled}
                placeholder={placeholder}
                value={value[name].value}
                onChange={onInputChange}
                className={INPUT_STYLES}
                type="text"
            />
            break;
        case "textarea":
            // Renderiza un textarea si el tipo es "textarea"
            input = <textarea
                minLength={min}
                name={name}
                maxLength={max}
                disabled={disabled}
                placeholder={placeholder}
                value={value[name].value}
                onChange={onInputChange}
                className={INPUT_STYLES}
            />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select
                disabled={disabled}
                value={value[name].value}
                name={name}
                onChange={onInputChange}
                className={INPUT_STYLES}
            >
                <option disabled value="">Seleccione una opción</option>
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
                name={name}
                disabled={disabled}
                value={value[name].value}
                onChange={onInputChange}
                className={INPUT_STYLES}
                type="date"
                min={today}
            />
            break;
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input
                name={name}
                minLength={min}
                maxLength={max}
                disabled={disabled}
                placeholder={placeholder}
                value={value[name].value}
                onChange={onInputChange}
                className={INPUT_STYLES}
                type={type}
            />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (
        <label>
            <span>{label} {!required && <span className="text-slate-400 ml-1">(opcional)</span>} </span>
            {input}
            {type === "textarea" && <span className="text-slate-500 text-xs">{`${value[name].value.length}/${max}`}</span>}
        </label >
    )

}

export default Input
