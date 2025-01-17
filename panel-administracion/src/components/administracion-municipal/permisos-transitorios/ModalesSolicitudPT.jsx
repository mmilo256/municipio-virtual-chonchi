import Modal from "../../ui/Modal";
// Importa el componente `Modal` desde la carpeta de interfaz de usuario (UI). Este componente se utiliza para mostrar ventanas modales reutilizables.

const ModalesSolicitudPT = ({
    sendSignedDoc, // Función que se ejecuta para enviar el decreto firmado al solicitante.
    approveModal, // Estado booleano que indica si el modal de aprobación está abierto o cerrado.
    toggleApproveModal, // Función que alterna el estado del modal de aprobación.
    rejectModal, // Estado booleano que indica si el modal para escribir el motivo de rechazo está abierto o cerrado.
    toggleRejectModal, // Función que alterna el estado del modal de rechazo.
    confirmRejectModal, // Estado booleano que indica si el modal de confirmación de rechazo está abierto o cerrado.
    toggleConfirmRejectModal, // Función que alterna el estado del modal de confirmación de rechazo.
    confirmReject, // Función que se ejecuta para confirmar y registrar el rechazo de la solicitud.
    modalInput, // Estado que almacena el texto del motivo del rechazo escrito por el usuario.
    setModalInput // Función para actualizar el valor de `modalInput`.
}) => {
    return (
        <>
            {/* Modal para enviar el decreto firmado al solicitante */}
            <Modal
                title="Enviar decreto al solicitante"
                modal={approveModal} // Controla si el modal está visible.
                toggleModal={toggleApproveModal} // Permite cerrar o abrir el modal.
                onClick={sendSignedDoc} // Acción ejecutada al confirmar el envío del decreto.
                btnText="Enviar decreto" // Texto del botón principal en el modal.
            >
                {/* Contenido del modal */}
                <p>Se notificará al usuario por correo electrónico la aprobación de su solicitud y se adjuntará el decreto firmado.</p>
                <p>¿Seguro que desea enviar el decreto?</p>
            </Modal>

            {/* Modal para confirmar el rechazo de la solicitud */}
            <Modal
                title="Rechazar solicitud"
                modal={confirmRejectModal} // Controla si el modal está visible.
                toggleModal={toggleConfirmRejectModal} // Permite cerrar o abrir el modal.
                onClick={confirmReject} // Acción ejecutada al confirmar el rechazo.
                btnText="Rechazar solicitud" // Texto del botón principal en el modal.
            >
                {/* Contenido del modal */}
                <p>Se notificará al usuario por correo electrónico el motivo del rechazo</p>
                <p>¿Seguro que desea rechazar esta solicitud?</p>
            </Modal>

            {/* Modal para escribir el motivo del rechazo */}
            <Modal
                title="Rechazar solicitud"
                modal={rejectModal} // Controla si el modal está visible.
                toggleModal={toggleRejectModal} // Permite cerrar o abrir el modal.
                onClick={toggleConfirmRejectModal} // Al hacer clic, abre el modal de confirmación del rechazo.
                btnText="Rechazar solicitud" // Texto del botón principal en el modal.
            >
                {/* Contenido del modal */}
                <p className="mb-1">Escriba el motivo por el cual rechaza la solicitud</p>
                <textarea
                    value={modalInput} // El contenido del textarea refleja el estado actual de `modalInput`.
                    onChange={(e) => { setModalInput(e.target.value); }} // Actualiza el estado `modalInput` cada vez que el usuario escribe algo.
                    className="p-1 border border-slate-600 rounded w-full resize-none" // Clases para dar estilo al textarea.
                />
            </Modal>
        </>
    );
};

export default ModalesSolicitudPT;
// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación.
