import { validationRules } from "../../forms/validations";

const Input = ({
    register,
    disabled,
    label,
    name,
    type = "text",
    options,
    min,
    placeholder,
    maxLength = 100,
    error,
    validations
}) => {

    // Variable para almacenar el componente de entrada que se renderizará
    let input;

    // Define estilos comunes para todos los tipos de entrada
    const INPUT_STYLES = `border-2 ${error ? "border-red-400 outline-red-400" : "border-slate-300"} outline-blue-400 rounded text-sm p-1 w-full`

    // Selecciona el tipo de entrada basado en la prop `type`
    switch (type) {
        case "file":
            input = <input
                {...register(name, { ...validations })}
                name={'requestDoc'}
                id={name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES} border-none text-slate-500`}
                type="file"
            />
            break;
        case "phone":
            input = <input
                {...register(name, {
                    ...validations,
                    minLength: validationRules.minLength(8)
                })}
                name={name}
                id={name}
                disabled={disabled}
                autoComplete="off"
                placeholder={placeholder}
                className={`${INPUT_STYLES}`}
                onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
                maxLength={9}
                type="text"
            />
            break;
        case "rut":
            input = <input
                {...register(name, {
                    ...validations,
                    pattern: validationRules.rut,
                    minLength: validationRules.minLength(9)
                })}
                id={name}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES}`}
                maxLength={10}
                type="text"
            />
            break;
        case "email":
            input = <input
                {...register(name, {
                    ...validations,
                    pattern: validationRules.email
                })}
                id={name}
                name={name}
                autoComplete="off"
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES}`}
                type="email"
            />
            break;
        case "textarea":
            // Renderiza un textarea si el tipo es "textarea"
            input = <textarea
                {...register(name, { ...validations })}
                id={name}
                name={name}
                disabled={disabled}
                placeholder={placeholder}
                className={`${INPUT_STYLES}`}
            />
            break;
        case "select":
            // Renderiza un select si el tipo es "select"
            input = <select
                {...register(name, { ...validations })}
                id={name}
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
                id={name}
                name={name}
                disabled={disabled}
                autoComplete="off"
                placeholder={placeholder}
                min={min}
                maxLength={maxLength}
                className={`${INPUT_STYLES}`}
                type={type}
            />
            break;
    }

    // Renderiza la etiqueta y el componente de entrada
    return (
        <label className="block mb-4">
            <p className="text-slate-600 font-medium text-sm"><span>{label}</span> {!validations?.required && <span className="font-light text-xs text-slate-500">(opcional)</span>}</p>
            {input}
            {/* type === "textarea" && <span className="text-slate-500 text-xs">{`${value[name].value.length}/${max}`}</span> */}
            {error && <p className="left-0 -bottom-4 text-red-500 text-xs">{error.message}</p>}
        </label >
    )
}
export default Input
