import { API_URL } from '../../../config';
import { formatDate } from '../../../utils/utils';
import Accordion from '../../ui/Accordion';

const Respuestas = ({ data, docs, direct = false }) => {
  const {
    name,
    rut,
    email,
    phone,
    orgName,
    orgNum,
    orgType,
    comisionEmail1,
    comisionName1,
    comisionLastName1,
    comisionRut1,
    comisionEmail2,
    comisionName2,
    comisionLastName2,
    comisionRut2,
    comisionEmail3,
    comisionName3,
    comisionLastName3,
    comisionRut3,
    fechaEleccion,
  } = data;

  const itemStyles = 'mb-2';

  const openDocument = (id) => {
    window.open(`${API_URL}/documents/${id}/view`);
  };

  return (
    <div className="text-sm">
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
              <strong>Nombre de la Organización Comunitaria </strong>
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
              <strong>Tipo de Organización Comunitaria </strong>
            </p>
            <p>{orgType || ''}</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="3. Identificación de la Comisión Electoral">
        <div className=" pl-2">
          <div className={itemStyles}>
            <p>
              <strong>Integrante 1</strong>
            </p>
            <p>Nombre: {`${comisionName1} ${comisionLastName1}`}</p>
            <p>RUT: {`${comisionRut1}`}</p>
            <p>Correo electrónico: {`${comisionEmail1}`}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Integrante 2</strong>
            </p>
            <p>Nombre: {`${comisionName2} ${comisionLastName2}`}</p>
            <p>RUT: {`${comisionRut2}`}</p>
            <p>Correo electrónico: {`${comisionEmail2}`}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Integrante 3</strong>
            </p>
            <p>Nombre: {`${comisionName3} ${comisionLastName3}`}</p>
            <p>RUT: {`${comisionRut3}`}</p>
            <p>Correo electrónico: {`${comisionEmail3}`}</p>
          </div>
        </div>
      </Accordion>

      {!direct ? (
        <Accordion title="4. Datos de la elección">
          <div className=" pl-2">
            <div className={itemStyles}>
              <p>
                <strong>Fecha de la elección </strong>
              </p>
              <p>{formatDate(fechaEleccion, 1) || ''}</p>
            </div>
            <div className={itemStyles}>
              <button
                type="button"
                onClick={() => {
                  openDocument(docs[0].id);
                }}
                className="block text-left"
              >
                Comunicación de la fecha de elección
              </button>
            </div>
          </div>
        </Accordion>
      ) : (
        <Accordion title="4. Datos de la elección">
          <div className=" pl-2">
            <div className={itemStyles}>
              <p>
                <strong>Fecha de la elección </strong>
              </p>
              <p>{formatDate(fechaEleccion, 1) || ''}</p>
            </div>
            <div className={itemStyles}>
              <a
                target="_blank"
                href={docs[0].ruta}
                className="block text-left text-blue-500 underline"
                rel="noreferrer"
              >
                Comunicación de la fecha de elección
              </a>
            </div>
          </div>
        </Accordion>
      )}
    </div>
  );
};

export default Respuestas;
