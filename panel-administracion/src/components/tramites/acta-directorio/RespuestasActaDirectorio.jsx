import { API_URL } from '../../../../config';
import { formatDate } from '../../../utils/format';
import Accordion from '../../ui/Accordion';

const RespuestasActaDirectorio = ({ respuestas = [], documentos = [] }) => {
  const {
    orgName,
    orgNum,
    orgType,
    comName1,
    comLastName1,
    comRut1,
    comEmail1,
    comName2,
    comLastName2,
    comRut2,
    comEmail2,
    comName3,
    comLastName3,
    comRut3,
    comEmail3,
    elecDate,
    numIntegrantes,
  } = respuestas;

  const documentosPorNombre = documentos.reduce((acc, { nombre, ...rest }) => {
    acc[nombre] = rest;
    return acc;
  }, {});

  const {
    docActa,
    docRegistroSociosActualizado,
    docRegistroSociosVotacion,
    docAntPresidente,
    docAntSecretario,
    docAntTesorero,
    docAntPrimerDirector,
    docAntSegundoDirector,
    docAntSup1,
    docAntSup2,
    docAntSup3,
    docAntSup4,
    docAntSup5,
    docActaComision,
    docActaReunion,
    docActaInscripcion,
    docOtrosAntecedentes,
  } = documentosPorNombre;

  const openDocument = (id) => {
    window.open(`${API_URL}/documents/${id}/view`);
  };

  return (
    <>
      <Accordion title="Información de la Organización Comunitaria">
        <div className="grid grid-cols-3 gap-y-1">
          <p>
            <strong>Nombre de la organización:</strong> {orgName}
          </p>
          <p>
            <strong>Personalidad Jurídica N°:</strong> {orgNum}
          </p>
          <p>
            <strong>Tipo de organización:</strong> {orgType}
          </p>
        </div>
      </Accordion>

      {/* Sección 2: Datos del representante legal */}
      <Accordion title="Identificación de la Comisión Electoral">
        <div className="grid grid-cols-3 gap-y-1">
          <ul className="mb-2">
            <p>
              <strong>Integrante 1 </strong>
            </p>
            <li>Nombre completo: {`${comName1} ${comLastName1}`}</li>
            <li>RUT: {comRut1}</li>
            <li>Correo electrónico: {comEmail1}</li>
          </ul>
          <ul className="mb-2">
            <p>
              <strong>Integrante 2 </strong>
            </p>
            <li>Nombre completo: {`${comName2} ${comLastName2}`}</li>
            <li>RUT: {comRut2}</li>
            <li>Correo electrónico: {comEmail2}</li>
          </ul>
          <ul className="mb-2">
            <p>
              <strong>Integrante 3 </strong>
            </p>
            <li>Nombre completo: {`${comName3} ${comLastName3}`}</li>
            <li>RUT: {comRut3}</li>
            <li>Correo electrónico: {comEmail3}</li>
          </ul>
        </div>
      </Accordion>

      {/* Sección 3: Detalles del permiso */}
      <Accordion title="Datos de la elección">
        <div className="grid grid-cols-2">
          <p>
            <strong>Fecha de la elección:</strong>{' '}
            {formatDate(elecDate, 'DD [de] MMMM [de] YYYY') || ''}
          </p>
          <p>
            <strong>Número de integrantes:</strong> {numIntegrantes}
          </p>
          <ul className="flex flex-col underline gap-2">
            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docActa.id);
              }}
              rel="noreferrer"
            >
              Acta de elección del directorio
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docRegistroSociosActualizado.id);
              }}
              rel="noreferrer"
            >
              Registro de socios actualizado
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docRegistroSociosVotacion.id);
              }}
              rel="noreferrer"
            >
              Registro de socios que votaron
            </a>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Certificados de Antecedentes del Directorio Titular">
        <div>
          <ul className="flex flex-col underline gap-2">
            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntPresidente.id);
              }}
              rel="noreferrer"
            >
              Presidente
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSecretario.id);
              }}
              rel="noreferrer"
            >
              Secretario/a
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntTesorero.id);
              }}
              rel="noreferrer"
            >
              Tesorero/a
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntPrimerDirector.id);
              }}
              rel="noreferrer"
            >
              Primer director
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSegundoDirector.id);
              }}
              rel="noreferrer"
            >
              Segundo director
            </a>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Certificados de Antecedentes del Directorio Suplente">
        <div>
          <ul className="flex flex-col underline gap-2">
            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSup1.id);
              }}
              rel="noreferrer"
            >
              Suplente 1
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSup2.id);
              }}
              rel="noreferrer"
            >
              Suplente 2
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSup3.id);
              }}
              rel="noreferrer"
            >
              Suplente 3
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSup4.id);
              }}
              rel="noreferrer"
            >
              Suplente 4
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docAntSup5.id);
              }}
              rel="noreferrer"
            >
              Suplente 5
            </a>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Ingreso de formularios">
        <div>
          <ul className="flex flex-col underline gap-2">
            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docActaComision.id);
              }}
              rel="noreferrer"
            >
              Acta de Elección Comisión Electoral (Formulario 1)
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docActaReunion.id);
              }}
              rel="noreferrer"
            >
              Acta de Reunión de Comisión Electoral para fijar fecha de inscripción de candidatos
              (Formulario 2)
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docActaInscripcion.id);
              }}
              rel="noreferrer"
            >
              Acta Comisión Electoral inscripción de candidatos, con su respectivo anexo (Formulario
              4)
            </a>

            <a
              className="text-blue-500 hover:text-secondary hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docOtrosAntecedentes.id);
              }}
              rel="noreferrer"
            >
              Otros antecedentes relevantes para el proceso de elección del directorio
            </a>
          </ul>
        </div>
      </Accordion>
    </>
  );
};

export default RespuestasActaDirectorio;
