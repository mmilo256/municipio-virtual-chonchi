import Modal from "../../ui/Modal"

const ModalesSolicitudPT = ({
    confirmApproveModal,
    setConfirmApproveModal,
    sendSignedDoc,
    confirmRejectModal,
    setConfirmRejectModal,
    confirmReject,
    rejectModal,
    setRejectModal,
    openConfirmModal,
    modalInput,
    setModalInput
}) => {

    return (
        <>
            <Modal
                title="Enviar decreto al solicitante"
                modal={confirmApproveModal}
                setModal={setConfirmApproveModal}
                onClick={sendSignedDoc}
                btnText="Enviar decreto"
            >
                <p>Se notificará al usuario por correo electrónico la aprobación de su solicitud y se adjuntará el decreto firmado.</p>
                <p>¿Seguro que desea enviar el decreto?</p>
            </Modal>
            <Modal
                title="Rechazar solicitud"
                modal={confirmRejectModal}
                setModal={setConfirmRejectModal}
                onClick={confirmReject}
                btnText="Rechazar solicitud"
            >
                <p>Se notificará al usuario por correo electrónico el motivo del rechazo</p>
                <p>¿Seguro que desea rechazar esta solicitud?</p>
            </Modal>
            <Modal
                title="Rechazar solicitud"
                modal={rejectModal}
                setModal={setRejectModal}
                onClick={openConfirmModal}
                btnText="Rechazar solicitud"
            >
                <p className="mb-1">Escriba el motivo por el cual rechaza la solicitud</p>
                <textarea value={modalInput} onChange={(e) => { setModalInput(e.target.value) }} className="p-1 border border-slate-600 rounded w-full resize-none" />
            </Modal>
        </>
    )
}

export default ModalesSolicitudPT