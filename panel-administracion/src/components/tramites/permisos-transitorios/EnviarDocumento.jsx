import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import Button from '../../ui/Button';
import { useEffect, useState } from 'react';
import { emailRegex } from '../../../utils/regex';
import { ToastContainer, toast } from 'react-toastify';
import { FaRegLightbulb } from 'react-icons/fa';
import { sendEmail } from '../../../services/emailServices';
import { obtenerDecretos } from '../../../services/permisosTransitoriosServices';
import { approveTemplate } from '../../../email-templates/permisos-transitorios/approveTemplate';
import Modal from '../../ui/Modal';
import { API_URL, DESTINATARIOS_PT } from '../../../../config';

const EnviarDocumento = () => {
  return (
    <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
      <Modal btnText="Enviar decreto" title="Enviar decreto">
        <p className="text-center">
          ¿Está seguro que desea enviar el decreto al usuario solicitante?
        </p>
        <p className="text-center my-4 p-2 bg-amber-200 rounded font-bold text-amber-800">
          Esta acción dará por finalizada la solicitud y no se puede deshacer.
        </p>
        <p className="text-center">El decreto será enviado a los siguientes correos:</p>
      </Modal>
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-2xl font-bold my-4">Enviar decreto</h1>
      <p className="bg-amber-100 p-2 rounded text-amber-600 mb-4 flex items-center gap-2">
        {' '}
        <FaRegLightbulb className="text-amber-600" /> Este paso da por finalizado el trámite
      </p>
      <label className="block mb-1" htmlFor="destinatario">
        Agregar destinatario
      </label>
      <form className="flex gap-2">
        <select id="destinatario" className="block w-full border-2 rounded p-1">
          <option value="">-- Selecciona un destinatario --</option>
        </select>
        <button className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primaryHover rounded py-2 w-40">
          {' '}
          <IoIosAddCircleOutline size={25} /> Agregar
        </button>
      </form>
      <div className="mt-4"></div>
      <hr className="my-4" />

      {/* <a className="block py-1 px-4 text-blue-500 border underline font-bold" target="_blank" href={`${SERVER_URL}/${decretoPath}`}>DECRETO.PDF</a> */}
      {
        <button
          className="block py-1 px-4 text-blue-500 border underline font-bold"
          target="_blank"
          type="button"
        >
          DECRETO.PDF
        </button>
      }

      <div className="mt-10 flex justify-end gap-2">
        <Button variant="primary" text="Volver" />
        <Button variant="secondary" text="Enviar documento" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default EnviarDocumento;
