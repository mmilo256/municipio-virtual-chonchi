import { useState } from 'react';

const useInputsGenerarDecreto = (activity, orgName, orgRut, presidentName, presidentRut, startDate, startTime, endTime, place) => {

    // Declaración de los estados locales para almacenar los valores de los campos del formulario
    const [decreto, setDecreto] = useState("") // Almacena el número del decreto
    const [actividad, setActividad] = useState(activity || "") // Almacena el nombre de la actividad
    const [organizacion, setOrganizacion] = useState(orgName || "") // Almacena el nombre de la organización
    const [rutOrganizacion, setRutOrganizacion] = useState(orgRut || "") // Almacena el RUT de la organización
    const [presidente, setPresidente] = useState(presidentName || "") // Almacena el nombre del presidente
    const [rutPresidente, setRutPresidente] = useState(presidentRut || "") // Almacena el RUT del presidente
    const [fechaInicio, setFechaInicio] = useState(startDate || "") // Almacena la fecha de inicio
    const [horaInicio, setHoraInicio] = useState(startTime || "") // Almacena la hora de inicio
    const [horaTermino, setHoraTermino] = useState(endTime || "") // Almacena la hora de término
    const [ubicacion, setUbicacion] = useState(place || "") // Almacena la ubicación

    const inputs = [{
        nombre: "nDecreto",
        etiqueta: "N° decreto",
        tipo: "number",
        requerido: true,
        value: decreto,
        onChange: setDecreto
    }, {
        nombre: "actividad",
        etiqueta: "Nombre de la actividad",
        tipo: "text",
        requerido: true,
        value: actividad,
        onChange: setActividad
    }, {
        nombre: "organizacion",
        etiqueta: "organizacion",
        tipo: "text",
        requerido: true,
        value: organizacion,
        onChange: setOrganizacion
    }, {
        nombre: "rutOrganizacion",
        etiqueta: "rutOrganizacion",
        tipo: "text",
        requerido: true,
        value: rutOrganizacion,
        onChange: setRutOrganizacion
    }, {
        nombre: "presidente",
        etiqueta: "presidente",
        tipo: "text",
        requerido: true,
        value: presidente,
        onChange: setPresidente
    }, {
        nombre: "rutPresidente",
        etiqueta: "rutPresidente",
        tipo: "text",
        requerido: true,
        value: rutPresidente,
        onChange: setRutPresidente
    }, {
        nombre: "fechaInicio",
        etiqueta: "fechaInicio",
        tipo: "date",
        requerido: true,
        value: fechaInicio,
        onChange: setFechaInicio
    }, {
        nombre: "horaInicio",
        etiqueta: "horaInicio",
        tipo: "time",
        requerido: true,
        value: horaInicio,
        onChange: setHoraInicio
    }, {
        nombre: "horaTermino",
        etiqueta: "horaTermino",
        tipo: "time",
        requerido: true,
        value: horaTermino,
        onChange: setHoraTermino
    }, {
        nombre: "ubicacion",
        etiqueta: "ubicacion",
        tipo: "text",
        requerido: true,
        value: ubicacion,
        onChange: setUbicacion
    }]

    return { inputs, decreto, actividad, organizacion, rutOrganizacion, presidente, rutPresidente, fechaInicio, horaInicio, horaTermino, ubicacion }

};

export default useInputsGenerarDecreto;
