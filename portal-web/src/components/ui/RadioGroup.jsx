const RadioGroup = ({ options, name, selectedValue, onChange, disabled }) => {

    return (
        <div>
            {/* Etiqueta del grupo de radios */}
            <div className="flex flex-col">
                {/* Mapea las opciones para crear un conjunto de botones de radio */}
                {options.map((op, index) => {
                    console.log("---------------------")
                    console.log({
                        input: name,
                        opcion: op,
                        valor: selectedValue
                    })
                    return (
                        <label key={index}>
                            <input
                                className="mr-1"
                                type="radio"
                                value={op ? "si" : "no"} // Valor asociado al botón de radio
                                name={name} // Nombre del grupo de botones de radio para agrupación
                                checked={selectedValue === op} // Marca el botón de radio si su valor coincide con el valor seleccionado
                                onChange={onChange} // Llama a la función onChange con el valor seleccionado
                            />
                            <span className="text-sm">{op ? "Si" : "No"}</span> {/* Texto asociado al botón de radio */}
                        </label>
                    )
                })}
            </div>
        </div>
    )
}

export default RadioGroup
