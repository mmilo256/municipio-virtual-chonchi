// ---------------------------------------------------------------------------------------------------------------
// TramiteForm.jsx
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; // Integración con Yup
import { Input } from './Input'; // Componente reutilizable de Input
// import { trámiteSchema } from './trámiteSchema'; // El esquema de validación

function TrámiteForm({ onSubmit }) {
    // Usamos useForm de react-hook-form y yupResolver para integrar Yup
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(trámiteSchema), // Esquema de validación
    });

    const handleFormSubmit = (data) => {
        onSubmit(data); // Llamamos a la función onSubmit que pasa como prop
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            {/* Datos de la organización */}
            <h3>Datos de la Organización</h3>
            <Input label="Nombre" name="organizacion.nombre" register={register} errors={errors} />
            <Input label="RUT" name="organizacion.rut" register={register} errors={errors} />
            <Input label="Dirección" name="organizacion.direccion" register={register} errors={errors} />
            <Input label="Email" name="organizacion.email" type="email" register={register} errors={errors} />
            <Input label="Teléfono" name="organizacion.telefono" type="tel" register={register} errors={errors} />
            <Input label="Tipo" name="organizacion.tipo" register={register} errors={errors} />

            {/* Datos del presidente de la organización */}
            <h3>Datos del Presidente de la Organización</h3>
            <Input label="Nombre" name="presidente.nombre" register={register} errors={errors} />
            <Input label="RUT" name="presidente.rut" register={register} errors={errors} />
            <Input label="Dirección" name="presidente.direccion" register={register} errors={errors} />
            <Input label="Email" name="presidente.email" type="email" register={register} errors={errors} />
            <Input label="Teléfono 1" name="presidente.telefono1" type="tel" register={register} errors={errors} />
            <Input label="Teléfono 2" name="presidente.telefono2" type="tel" register={register} errors={errors} />

            {/* Datos del permiso */}
            <h3>Datos del Permiso</h3>
            <Input label="Nombre de la Actividad" name="permiso.nombreActividad" register={register} errors={errors} />
            <Input label="Lugar" name="permiso.lugar" register={register} errors={errors} />
            <Input label="Fecha de Inicio" name="permiso.fechaInicio" type="date" register={register} errors={errors} />
            <Input label="Hora de Inicio" name="permiso.horaInicio" type="time" register={register} errors={errors} />
            <Input label="Fecha de Término" name="permiso.fechaTermino" type="date" register={register} errors={errors} />
            <Input label="Hora de Término" name="permiso.horaTermino" type="time" register={register} errors={errors} />
            <Input label="Permite Alcohol" name="permiso.permiteAlcohol" type="checkbox" register={register} errors={errors} />
            <Input label="Permite Alimentos" name="permiso.permiteAlimentos" type="checkbox" register={register} errors={errors} />
            <Input label="Descripción" name="permiso.descripcion" register={register} errors={errors} />
            <Input label="Destino de los Fondos" name="permiso.destinoFondos" register={register} errors={errors} />

            <button type="submit">Enviar</button>
        </form>
    );
}

export default TrámiteForm;


// ---------------------------------------------------------------------------------------------------------------
// TramiteSchema.js

export const trámiteSchema = Yup.object().shape({
    organizacion: Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        rut: Yup.string().required('El RUT es obligatorio'),
        direccion: Yup.string().required('La dirección es obligatoria'),
        email: Yup.string().email('Debe ser un correo válido').required('El correo es obligatorio'),
        telefono: Yup.string().required('El teléfono es obligatorio'),
        tipo: Yup.string().required('El tipo es obligatorio'),
    }),
    presidente: Yup.object().shape({
        nombre: Yup.string().required('El nombre del presidente es obligatorio'),
        rut: Yup.string().required('El RUT del presidente es obligatorio'),
        direccion: Yup.string().required('La dirección del presidente es obligatoria'),
        email: Yup.string().email('Debe ser un correo válido').required('El correo del presidente es obligatorio'),
        telefono1: Yup.string().required('El teléfono 1 es obligatorio'),
        telefono2: Yup.string(),
    }),
    permiso: Yup.object().shape({
        nombreActividad: Yup.string().required('El nombre de la actividad es obligatorio'),
        lugar: Yup.string().required('El lugar es obligatorio'),
        fechaInicio: Yup.date().required('La fecha de inicio es obligatoria'),
        horaInicio: Yup.string().required('La hora de inicio es obligatoria'),
        fechaTermino: Yup.date().required('La fecha de término es obligatoria'),
        horaTermino: Yup.string().required('La hora de término es obligatoria'),
        permiteAlcohol: Yup.boolean(),
        permiteAlimentos: Yup.boolean(),
        descripcion: Yup.string().required('La descripción es obligatoria'),
        destinoFondos: Yup.string().required('El destino de los fondos es obligatorio'),
    }),
});

// ---------------------------------------------------------------------------------------------------------------
// trámiteLogic.js
export const handleFormSubmit = async (data) => {
    try {
        // Lógica para enviar el formulario (por ejemplo, llamada a API)
        console.log('Datos del formulario enviados:', data);

        // Simular una llamada a la API
        await fakeApiCall(data);

        alert('Formulario enviado con éxito');
    } catch (error) {
        console.log(error);
        alert('Hubo un error al enviar el formulario');
    }
};

// Simula una llamada a una API
const fakeApiCall = async (data) => {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
};





