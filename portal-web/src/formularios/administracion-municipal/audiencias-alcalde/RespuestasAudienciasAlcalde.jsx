import Accordion from '../../../components/ui/Accordion';

const RespuestasAudienciasAlcalde = ({ data }) => {
  const { name, rut, email, phone, domicilio, motivoAudiencia, descripcionMotivo } = data;

  const itemStyles = 'mb-2';

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
          <div className={itemStyles}>
            <p>
              <strong>Domicilio del solicitante </strong>
            </p>
            <p>{domicilio || ''}</p>
          </div>
        </div>
      </Accordion>
      <Accordion title="2. Datos de la organización">
        <div className=" pl-2">
          <div className={itemStyles}>
            <p>
              <strong>Motivo de la audiencia </strong>
            </p>
            <p>{motivoAudiencia || ''}</p>
          </div>
          <div className={itemStyles}>
            <p>
              <strong>Descripción del motivo </strong>
            </p>
            <p>{descripcionMotivo || ''}</p>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default RespuestasAudienciasAlcalde;
