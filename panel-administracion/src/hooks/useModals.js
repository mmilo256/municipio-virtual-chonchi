import { useState } from "react";
// Importa `useState` de React, que se utiliza para manejar estados en componentes funcionales.

const useModals = () => {
    // Estado para controlar si el modal de rechazo está abierto o cerrado.
    const [rejectModal, setRejectModal] = useState(false);

    // Estado para controlar si el modal de confirmación de rechazo está abierto o cerrado.
    const [confirmRejectModal, setConfirmRejectModal] = useState(false);

    // Estado para controlar si el modal de aprobación está abierto o cerrado.
    const [approveModal, setApproveModal] = useState(false);

    // Estado que almacena el motivo escrito por el usuario para rechazar una solicitud.
    const [modalInput, setModalInput] = useState("");

    // Función que alterna el estado del modal de aprobación.
    const toggleApproveModal = () => setApproveModal(!approveModal);

    // Función que alterna el estado del modal de rechazo.
    const toggleRejectModal = () => setRejectModal(!rejectModal);

    // Función que alterna el estado del modal de confirmación de rechazo.
    const toggleConfirmRejectModal = () => {
        if (!confirmRejectModal) {
            // Si el modal de confirmación no está abierto:
            if (modalInput.trim().length > 3) {
                // Verifica que el motivo del rechazo (`modalInput`) tenga al menos 4 caracteres no vacíos.
                setRejectModal(false); // Cierra el modal de rechazo.
                setConfirmRejectModal(true); // Abre el modal de confirmación de rechazo.
            } else {
                // Si el motivo es muy corto, muestra un mensaje de alerta al usuario.
                alert("Debe ingresar un motivo para rechazar la solicitud");
            }
        } else {
            // Si el modal de confirmación está abierto, simplemente lo cierra.
            setConfirmRejectModal(false);
        }
    };

    // Retorna un objeto que expone los estados y funciones relacionadas con los modales.
    return {
        rejectModal, // Estado del modal de rechazo.
        toggleRejectModal, // Función para alternar el modal de rechazo.
        confirmRejectModal, // Estado del modal de confirmación de rechazo.
        toggleConfirmRejectModal, // Función para alternar el modal de confirmación de rechazo.
        approveModal, // Estado del modal de aprobación.
        toggleApproveModal, // Función para alternar el modal de aprobación.
        modalInput, // Estado del texto ingresado en el modal de rechazo.
        setModalInput, // Función para actualizar el texto ingresado en el modal de rechazo.
    };
};

export default useModals;
// Exporta el hook para que pueda ser utilizado en otros componentes.
