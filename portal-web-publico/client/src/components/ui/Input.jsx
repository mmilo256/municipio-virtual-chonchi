const Input = ({ label, type, options, value, onChange, placeholder, disabled, min, max }) => {

    // Define estilos comunes para todos los tipos de entrada
    const inputStyles = "border border-slate-400 p-1 w-full focus:outline-blue-400"

    // Variable para almacenar el componente de entrada que se renderizará
    let input;

    // Selecciona el tipo de entrada basado en la prop `type`
    switch (type) {
        case "phone":
            input = <input minLength={min} maxLength={max} max={max} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} className={inputStyles} type="number" />
            break;
        case "textarea":
            // Renderiza un textarea si el tipo es "textarea"
            input = <textarea minLength={min} maxLength={max} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} className={inputStyles} />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select disabled={disabled} value={value} onChange={onChange} className={inputStyles}>
                <option value="">Seleccione una opción</option>
                {/* Mapea las opciones para crear elementos <option> */}
                {options.map((op, index) => (
                    <option key={index} value={op}>{op}</option>
                ))}
            </select>
            break;
        default:
            // Renderiza un input de tipo genérico si no es ninguno de los anteriores
            input = <input minLength={min} maxLength={max} disabled={disabled} placeholder={placeholder} value={value} onChange={onChange} className={inputStyles} type={type} />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (
        <label>
            <span>{label}</span>
            {input}
        </label>
    )

}

export default Input
