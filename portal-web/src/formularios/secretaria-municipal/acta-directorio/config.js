import Paso01 from './pasos/Paso01';
import Paso02 from './pasos/Paso02';
import Paso03 from './pasos/Paso03';
import Paso04 from './pasos/Paso04';
import Paso05 from './pasos/Paso05';
import Paso06 from './pasos/Paso06';

const steps = [
  {
    id: 'contacto',
    label: 'Datos del solicitante',
    description: 'Estos datos serán usados para notificar el estado de su solicitud',
    component: Paso01,
  },
  {
    id: 'datos-organizacion',
    label: 'Datos de la organización',
    description: '',
    component: Paso02,
  },
  {
    id: 'datos-presidente',
    label: 'Datos del representante legal',
    description: '',
    component: Paso03,
  },
  {
    id: 'detalle-permiso',
    label: 'Detalles del permiso',
    description: '',
    component: Paso04,
  },
  {
    id: 'antecedentes',
    label: 'Antecedentes',
    description: 'Formatos permitidos: PDF, DOCX, JPG, PNG. Tamaño máximo: 2 MB.',
    component: Paso05,
  },
  {
    id: 'confirmacion',
    label: 'Confirmación del formulario',
    description: '',
    component: Paso06,
  },
];

export default steps;
