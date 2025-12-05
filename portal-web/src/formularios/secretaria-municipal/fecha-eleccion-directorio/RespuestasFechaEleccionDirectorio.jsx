import { formatDate } from '../../../utils/utils';
import Accordion from '../../../components/ui/Accordion';
import { API_URL } from '../../../config';

const RespuestasFechaEleccionDirectorio = ({ data, docs }) => {
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
            <a
              className="text-blue-500 hover:cursor-pointer hover:underline"
              target="_blank"
              onClick={() => {
                openDocument(docs[0].id);
              }}
              rel="noreferrer"
            >
              Comunicación de fecha de la elección
            </a>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default RespuestasFechaEleccionDirectorio;
