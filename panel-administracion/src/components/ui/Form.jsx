import Button from "./Button"
import Input from "./Input"
import Upload from "./Upload"

const Form = ({ onSubmit, submitText, inputs, cols, uploadName }) => {
    return (

        <form className="bg-[#fff] p-4 shadow rounded mb-4">
            <div className={`grid gap-x-4 grid-cols-${cols}`}>
                {inputs.map((input, index) => {
                    if (input.tipo === "file") {
                        return <Upload
                            key={index}
                            label={input.etiqueta}
                            files={input.file}
                            setFiles={input.setFile}
                            name={uploadName}
                        />
                    } else {
                        return <Input
                            value={input.value}
                            onChange={input.onChange}
                            key={index}
                            type={input.tipo}
                            label={input.etiqueta}
                        />
                    }
                })}
            </div>
            <div className="flex justify-end mt-4">
                <Button variant="secondary" text={submitText} onClick={onSubmit} />
            </div>
        </form>


    )
}

export default Form