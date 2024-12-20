import { create } from 'zustand'

// Creación de un store con Zustand para gestionar los datos de un formulario
const usePermisosTransitoriosStore = create((set) => ({
    // Estado inicial
    formData: {},

    // Función para actualizar los datos del formulario
    setFormData: (data) => set(() => ({
        formData: {
            ...data
        }
    }))
}))

export default usePermisosTransitoriosStore
