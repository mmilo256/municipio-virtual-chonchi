import { create } from 'zustand'

// Creación de un store con Zustand para gestionar los datos de un formulario
const usePermisosTransitoriosStore = create((set) => ({
    // Estado inicial que organiza los datos del formulario en diferentes secciones
    formData: {
        // Datos de la organización
        orgData: {
            name: "",
            rut: "",
            address: "",
            email: "",
            phone: "",
            orgType: ""
        },
        // Datos de la persona de contacto
        personData: {
            name: "",
            rut: "",
            address: "",
            email: "",
            phone: "",
            phone2: ""
        },
        // Información sobre el permiso solicitado
        permissionData: {
            name: "",
            place: "",
            startDate: "",
            startTime: "",
            endDate: "",
            endTime: "",
            alcohol: "false",
            food: "false",
            description: '',
            purpose: ""
        },
        // Documentos adjuntos
        docsData: []
    },

    // Función para actualizar los datos de la organización
    setOrgData: (data) => set(state => ({
        formData: {
            ...state.formData, // Mantiene las demás secciones intactas
            orgData: data // Actualiza solo los datos de la organización
        }
    })),

    // Función para actualizar los datos de la persona de contacto
    setPersonData: (data) => set(state => ({
        formData: {
            ...state.formData, // Mantiene las demás secciones intactas
            personData: data // Actualiza solo los datos de la persona
        }
    })),

    // Función para actualizar los datos del permiso solicitado
    setPermissionData: (data) => set(state => ({
        formData: {
            ...state.formData, // Mantiene las demás secciones intactas
            permissionData: data // Actualiza solo los datos del permiso
        }
    })),

    // Función para actualizar los documentos adjuntos
    setDocsData: (data) => set(state => ({
        formData: {
            ...state.formData, // Mantiene las demás secciones intactas
            docsData: data // Actualiza solo los documentos adjuntos
        }
    }))
}))

export default usePermisosTransitoriosStore
