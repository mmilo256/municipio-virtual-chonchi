import Button from "./Button"

const Modal = ({ children, title, btnText, modal, toggleModal, onClick, loading }) => {

    if (!modal) {
        return null
    }

    return (
        <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-between items-center">

            <div className="bg-[#fff] p-4 mx-auto rounded">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl">{title}</h2>
                    <button onClick={toggleModal} className="text-2xl">&times;</button>
                </div>

                <div className="py-6 border-t">
                    {children}
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    {!loading && <Button onClick={toggleModal} variant="tertiary" text="Cancelar" />}
                    <Button isLoading={loading} onClick={onClick} variant="secondary" text={btnText} />
                </div>
            </div>
        </div>

    )
}

export default Modal