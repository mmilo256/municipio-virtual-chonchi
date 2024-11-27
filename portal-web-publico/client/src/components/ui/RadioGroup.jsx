const RadioGroup = ({ label, options, name, selectedValue, onChange, disabled }) => {
    return (
        <div>
            {/* Etiqueta del grupo de radios */}
            <label>{label}</label>
            <div className="flex flex-col">
                {/* Mapea las opciones para crear un conjunto de botones de radio */}
                {options.map((op, index) => (
                    <label key={index}>
                        <input
                            className="mr-1"
                            disabled={disabled}
                            type="radio"
                            value={op.value} // Valor asociado al botón de radio
                            name={name} // Nombre del grupo de botones de radio para agrupación
                            checked={selectedValue === op.value} // Marca el botón de radio si su valor coincide con el valor seleccionado
                            onChange={(e) => onChange(e.target.value)} // Llama a la función onChange con el valor seleccionado
                        />
                        <span className="text-sm">{op.label}</span> {/* Texto asociado al botón de radio */}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default RadioGroup
