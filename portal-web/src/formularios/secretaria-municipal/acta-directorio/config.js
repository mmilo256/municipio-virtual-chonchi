import Paso01 from './pasos/Paso01';
import Paso02 from './pasos/Paso02';
import Paso03 from './pasos/Paso03';
import Paso04 from './pasos/Paso04';
import Paso05 from './pasos/Paso05';
import Paso06 from './pasos/Paso06';
/* import Paso05 from './pasos/Paso08'; */

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
    description:
      'Ingrese los datos de cada integrante de la Comisión Electoral. El usuario solicitante debe ser parte de la Comisión, sino, no podrá realizar la solicitud.',
    component: Paso03,
  },
  {
    id: 'datos-eleccion',
    label: 'Datos de la elección',
    description: '',
    component: Paso04,
  },
  {
    id: 'antecedentes-directorio-titular',
    label: 'Certificado de Antecedentes del Directorio Titular',
    description: '',
    component: Paso05,
  },
  {
    id: 'antecedentes-directorio-suplente',
    label: 'Certificado de Antecedentes del Directorio Suplente',
    description: '',
    component: Paso06,
  },
  {
    id: 'ingreso-formularios',
    label: 'Ingreso de Formularios',
    description: '',
    component: Paso05,
  },
  {
    id: 'confirmacion',
    label: 'Confirmación del formulario',
    description: '',
    component: Paso05,
  },
];

export default steps;
