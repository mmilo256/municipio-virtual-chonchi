import Button from "./Button"

const Modal = ({ children, title, modal, setModal }) => {

    if (!modal) {
        return null
    }

    const handleClose = () => {
        setModal(false)
    }

    return (
        <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-between items-center">

            <div className="bg-[#fff] p-4 mx-auto rounded">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl">{title}</h2>
                    <button onClick={handleClose} className="text-2xl">&times;</button>
                </div>

                <div className="py-6 border-t">
                    {children}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button onClick={() => { setModal(false) }} variant="tertiary" text="Cancelar" />
                    <Button variant="secondary" text="Rechazar solicitud" />
                </div>
            </div>
        </div>

    )
}

export default Modal