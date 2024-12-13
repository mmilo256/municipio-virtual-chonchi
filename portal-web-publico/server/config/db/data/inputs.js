const ORG_TYPES = [
    { label: "Junta de Vecinos", value: "junta de vecinos" },
    { label: "Comunidad Indígena", value: "comunidad indigena" },
    { label: "Club Deportivo", value: "club deportivo" },
    { label: "Fundación", value: "fundacion" },
    { label: "Empresa", value: "empresa" },
    { label: "Agrupación", value: "agrupacion" },
    { label: "Otro", value: "otro" },
];
const BOOLEAN_OP = [
    { label: "Si", value: true },
    { label: "No", value: false },
]

export const permisosTransitoriosInputs = [
    {
        nombre: "orgName",
        etiqueta: "Nombre o razón social",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Junta de Vecinos 66",
        min: 3,
        max: 100
    }, {
        nombre: "orgRut",
        etiqueta: "RUT de la organización",
        tipo: "rut",
        es_requerido: true,
        opciones: null,
        placeholder: "77777777-7",
        min: 9,
        max: 10
    }, {
        nombre: "orgAddress",
        etiqueta: "Dirección",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Sargento Candelaria 385",
        min: 3,
        max: 50
    }, {
        nombre: "orgEmail",
        etiqueta: "Correo electrónico",
        tipo: "email",
        es_requerido: true,
        opciones: null,
        placeholder: "ejemplo@gmail.com",
        min: 3,
        max: 50
    }, {
        nombre: "orgPhone",
        etiqueta: "Teléfono",
        tipo: "phone",
        es_requerido: true,
        opciones: null,
        placeholder: "950383923",
        min: 8,
        max: 9
    }, {
        nombre: "orgType",
        etiqueta: "Tipo de organización",
        tipo: "select",
        es_requerido: true,
        opciones: ORG_TYPES,
        placeholder: null
    }, {
        nombre: "presidentName",
        etiqueta: "Nombre del representante legal",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Juan Pérez",
        min: 3,
        max: 100
    }, {
        nombre: "presidentRut",
        etiqueta: "RUT del representante legal",
        tipo: "rut",
        es_requerido: true,
        opciones: null,
        placeholder: "55555555-5",
        min: 9,
        max: 10
    }, {
        nombre: "presidentAddress",
        etiqueta: "Dirección",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Sargento Candelaria 385",
        min: 3,
        max: 50
    }, {
        nombre: "presidentEmail",
        etiqueta: "Correo electrónico",
        tipo: "email",
        es_requerido: true,
        opciones: null,
        placeholder: "ejemplo@gmail.com",
        min: 3,
        max: 50
    }, {
        nombre: "presidentPhone",
        etiqueta: "Teléfono",
        tipo: "phone",
        es_requerido: true,
        opciones: null,
        placeholder: "950383923",
        min: 8,
        max: 9
    }, {
        nombre: "presidentPhone2",
        etiqueta: "Teléfono 2",
        tipo: "phone",
        es_requerido: false,
        opciones: null,
        placeholder: "950383923",
        min: 8,
        max: 9
    }, {
        nombre: "permissionName",
        etiqueta: "Nombre de la actividad",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Bingo Bailable",
        min: 3,
        max: 100
    }, {
        nombre: "permissionPlace",
        etiqueta: "Lugar de realización",
        tipo: "text",
        es_requerido: true,
        opciones: null,
        placeholder: "Gimnasio Municipal",
        min: 3,
        max: 100
    }, {
        nombre: "permissionStartDate",
        etiqueta: "Fecha de inicio",
        tipo: "date",
        es_requerido: true,
        opciones: null,
        placeholder: null
    }, {
        nombre: "permissionStartTime",
        etiqueta: "Hora de inicio",
        tipo: "time",
        es_requerido: true,
        opciones: null,
        placeholder: null
    }, {
        nombre: "permissionEndDate",
        etiqueta: "Fecha de término",
        tipo: "date",
        es_requerido: true,
        opciones: null,
        placeholder: null
    }, {
        nombre: "permissionEndTime",
        etiqueta: "Hora de término",
        tipo: "time",
        es_requerido: true,
        opciones: null,
        placeholder: null
    }, {
        nombre: "permissionAlcohol",
        etiqueta: "¿Con venta y/o consumo de alcohol?",
        tipo: "select",
        es_requerido: true,
        opciones: BOOLEAN_OP,
        placeholder: null
    }, {
        nombre: "permissionFood",
        etiqueta: "¿Con venta y/o consumo de alimentos?",
        tipo: "select",
        es_requerido: true,
        opciones: BOOLEAN_OP,
        placeholder: null
    }, {
        nombre: "permissionDescription",
        etiqueta: "Descripción de la actividad",
        tipo: "textarea",
        es_requerido: true,
        opciones: null,
        placeholder: "Bingo bailable con venta de alcohol y alimentos",
        min: 3,
        max: 200
    }, {
        nombre: "permissionPurpose",
        etiqueta: "Destino de los fondos",
        tipo: "textarea",
        es_requerido: true,
        opciones: null,
        placeholder: "los fondos recaudados serán destinados a la compra de suministros",
        min: 3,
        max: 200
    }
]