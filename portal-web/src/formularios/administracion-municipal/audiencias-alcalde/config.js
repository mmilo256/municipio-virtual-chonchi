import Paso01 from './pasos/Paso01';
import Paso02 from './pasos/Paso02';
import Paso03 from './pasos/Paso03';

const steps = [
  {
    id: 'contacto',
    label: 'Datos del solicitante',
    description: 'Estos datos serán usados para notificar el estado de su solicitud',
    component: Paso01,
  },
  {
    id: 'info-audiencia',
    label: 'Información de la audiencia',
    description:
      'Toda solicitud de audiencia será revisada previamente para conocer el motivo del requerimiento y coordinar de manera adecuada la atención. Este proceso permite organizar la agenda y asegurar una mejor respuesta a la solicitud presentada.',
    component: Paso02,
  },
  {
    id: 'confirmacion',
    label: 'Confirmación del formulario',
    description: '',
    component: Paso03,
  },
];

export default steps;
