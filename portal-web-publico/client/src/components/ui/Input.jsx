const Input = ({ label, name, type, options, value, onChange, placeholder, disabled, min, max, required }) => {

    // Validación para los input de números telefónicos
    const validatePhoneInput = (e) => {
        const currentValue = e.target.value
        if (/^$|^[0-9]+$/.test(currentValue)) {
            handleOnChange(currentValue)
        }
    }

    // Sin validación extra más que el míninmo y el máximo de longitud
    const genericValidation = (e) => {
        const currentValue = e.target.value
        handleOnChange(currentValue)
    }

    // Cambiar el valor del input teniendo en cuenta las validaciones
    const handleOnChange = (currentValue, typeValidation = true) => {
        let isValid = false
        if (typeValidation && currentValue.length >= min) {
            isValid = true
        } else {
            isValid = false
        }
        onChange(prev => ({
            ...prev,
            [name]: {
                isValid,
                value: currentValue
            }
        }))

    }

    // Define estilos comunes para todos los tipos de entrada
    const inputStyles = 'border border-slate-400 p-1 w-full focus:outline-blue-400'

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
                onChange={validatePhoneInput}
                className={inputStyles}
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
                onChange={genericValidation}
                className={inputStyles}
            />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select
                disabled={disabled}
                value={value[name].value}
                name={name}
                onChange={genericValidation}
                className={inputStyles}
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
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input
                name={name}
                minLength={min}
                maxLength={max}
                disabled={disabled}
                placeholder={placeholder}
                value={value[name].value}
                onChange={genericValidation}
                className={inputStyles}
                type={type}
            />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (
        <label>
            <span>{label} {!required && <span className="text-slate-400 ml-1">(opcional)</span>} </span>
            {input}
            {type === "textarea" && <span className="text-slate-500 text-xs">{`${value.length}/${max}`}</span>}
        </label >
    )

}

export default Input
