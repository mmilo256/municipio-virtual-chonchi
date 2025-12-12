import { formatDate } from '../../../utils/utils';
import Accordion from '../../../components/ui/Accordion';
import { API_URL } from '../../../config';

const RespuestasActaDirectorio = ({ data, docs }) => {
  const {
    name,
    rut,
    email,
    phone,
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
  } = data;

  const itemStyles = 'mb-2';

  const openDocument = (id) => {
    window.open(`${API_URL}/documents/${id}/view`);
  };

  return (
    <div className="text-sm">
      {/* Acordeones para mostrar los datos organizados */}
      <Accordion title="1. Datos del solicitante">
        <div className=" pl-2">
          <div className={itemStyles}>
            <p>
              <strong>Nombre del solicitante </strong>
            </p>
            <p>{name || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>RUT </strong>
            </p>
            <p>{rut || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Correo electrónico </strong>
            </p>
            <p>{email || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Teléfono </strong>
            </p>
            <p>{phone || ''}</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="2. Información de la Organización Comunitaria">
        <div className=" pl-2">
          <div className={itemStyles}>
            <p>
              <strong>Nombre de la organización </strong>
            </p>
            <p>{orgName || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Personalidad Jurídica N° </strong>
            </p>
            <p>{orgNum || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Tipo de organización </strong>
            </p>
            <p>{orgType || ''}</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="3. Identificación de la Comisión Electoral">
        <div className=" pl-2">
          <div className={itemStyles}>
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
        </div>
      </Accordion>

      <Accordion title="4. Datos de la elección">
        <div className=" pl-2">
          <div className={itemStyles}>
            <p>
              <strong>Fecha de la elección </strong>
            </p>
            <p>{formatDate(elecDate) || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Número de integrantes directorio titular </strong>
            </p>
            <p>{numIntegrantes || ''}</p>
          </div>
          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[0]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Acta de Elección del Directorio
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[1]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Registro de socios actualizado
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[2]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Registro de socios que votaron
            </a>
          </div>
        </div>
      </Accordion>

      <Accordion title="5. Certificados de Antecedentes del Directorio Titular">
        <div className=" pl-2">
          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[3]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Presidente
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[4]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Secretario/a
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[5]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Tesorero/a
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[6]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Primer Director
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[7]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Segundo Director
            </a>
          </div>
        </div>
      </Accordion>

      <Accordion title="6. Certificados de Antecedentes del Directorio Suplente">
        <div className=" pl-2">
          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[8]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Suplente 1
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[9]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Suplente 2
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[10]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Suplente 3
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[11]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Suplente 4
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[12]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Suplente 5
            </a>
          </div>
        </div>
      </Accordion>

      <Accordion title="7. Ingreso de formularios">
        <div className=" pl-2">
          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[13]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Acta de Elección Comisión Electoral (Formulario 1)
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[14]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Acta de Reunión de Comisión Electoral pra fijar fecha de inscripción de candidatos
              (Formulario 2)
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[15]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Acta Comisión Electoral inscripción de Candidatos, con su respectivo anexo (Formulario
              4)
            </a>
          </div>

          <div className={itemStyles}>
            <a
              onClick={() => openDocument(docs[16]?.id)}
              className="text-blue-500 hover:underline cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              Otros antecedentes relevantes para el proceso de elección del directorio
            </a>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default RespuestasActaDirectorio;
