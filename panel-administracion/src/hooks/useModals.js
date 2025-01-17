import { useState } from "react";

const useModals = () => {
    const [rejectModal, setRejectModal] = useState(false);
    const [confirmRejectModal, setConfirmRejectModal] = useState(false);
    const [confirmApproveModal, setConfirmApproveModal] = useState(false);
    const [modalInput, setModalInput] = useState("");

    const openRejectModal = () => setRejectModal(true);
    const closeRejectModal = () => setRejectModal(false);

    const openConfirmRejectModal = () => {
        if (modalInput.trim().length > 3) {
            setRejectModal(false);
            setConfirmRejectModal(true);
        } else {
            alert("Debe ingresar un motivo para rechazar la solicitud");
        }
    };

    return {
        rejectModal,
        confirmRejectModal,
        confirmApproveModal,
        modalInput,
        setModalInput,
        openRejectModal,
        closeRejectModal,
        openConfirmRejectModal,
        setConfirmApproveModal,
    };
};

export default useModals;
