import Paso01 from './pasos/Paso01';
import Paso02 from './pasos/Paso02';
import Paso03 from './pasos/Paso03';
import Paso04 from './pasos/Paso04';
import Paso05 from './pasos/Paso05';

const steps = [
  {
    id: 'contacto',
    label: 'Datos del solicitante',
    description: 'Estos datos serán usados para notificar el estado de su solicitud',
    component: Paso01,
  },
  {
    id: 'datos-organizacion',
    label: 'Información de la Organización Comunitaria',
    description: '',
    component: Paso02,
  },
  {
    id: 'datos-comision',
    label: 'Identificación de la Comisión Electoral',
    description: '',
    component: Paso03,
  },
  {
    id: 'datos-eleccion',
    label: 'Datos de la elección',
    description: '',
    component: Paso04,
  },
  {
    id: 'confirmacion',
    label: 'Confirmación del formulario',
    description: '',
    component: Paso05,
  },
];

export default steps;
