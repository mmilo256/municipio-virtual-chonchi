import Form from "../ui/Form"

const FormLayout = ({ onSubmit, submitText, title, inputs, cols }) => {
    return (
        <div className="max-w-[40rem] mx-auto">
            {/* Título del formulario */}
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <Form cols={cols} onSubmit={onSubmit} submitText={submitText} inputs={inputs} />
        </div>
    )
}

export default FormLayout