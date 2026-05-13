import React, { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Breadcrumbs from '../ui/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerSolicitudPorCodigo, solicitarCorreccion } from '../../services/solicitudes.service';
import { formatDate } from '../../utils/format';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { API_URL } from '../../../config';

const SolicitarCorreccion = () => {
  const { codigo, slug } = useParams();

  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState({});
  const infoSolicitud = solicitud.solicitud;

  const usuario = infoSolicitud?.usuario;
  const respuestas = solicitud?.solicitud?.respuestas;
  const documentos = solicitud?.solicitud?.documentos;
  const pasosFormulario = solicitud?.solicitud?.tramite?.formulario?.pasos_formularios ?? [];

  const [observaciones, setObservaciones] = useState('');

  const [modal, setModal] = useState(false);

  const [camposSeleccionados, setCamposSeleccionados] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await obtenerSolicitudPorCodigo(codigo);
        setSolicitud(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [codigo]);

  const onChangeCamposSeleccionados = (nombreInterno, valor, campo_id, respuesta) => {
    setCamposSeleccionados((prev) => ({
      ...prev,
      [nombreInterno]: {
        correccion: valor,
        campo_id,
        respuesta,
      },
    }));
  };

  const onSolicitarCorreccion = async () => {
    const data = {
      observaciones,
      camposSeleccionados,
    };
    try {
      const response = await solicitarCorreccion(codigo, data);
      console.log(response);
      navigate(`../${slug}/${codigo}`);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setModal(false);
    }
  };

  return (
    <div className="max-w-[60rem] mx-auto bg-[#fff] p-6 pt-0 mt-4 rounded border">
      <Modal
        onClick={onSolicitarCorreccion}
        modal={modal}
        toggleModal={() => {
          setModal(!modal);
        }}
        btnText="Solicitar corrección"
        title="Solicitar corrección"
      >
        <p>
          La solicitud será devuelta al solicitante para que realice las correcciones
          indicadas.{' '}
        </p>
        <p>
          Mientras no se envíe la información corregida, la solicitud permanecerá pendiente de
          respuesta del solicitante.
        </p>
      </Modal>
      <Breadcrumbs breadcrumbs={[]} />
      <h1 className="text-2xl font-bold mt-4">Solicitar corrección</h1>
      <p className="mb-4 text-sm text-slate-500">
        Solicita al usuario que corriga la información indicada
      </p>
      <div>
        <h2 className="text-xl font-bold mb-2">Resumen de la solicitud</h2>
        <div className="grid grid-cols-2 gap-4 border p-4 rounded mb-4">
          <div>
            <p className="font-bold text-sm text-slate-500">CÓDIGO</p>
            <p className="font-bold">{codigo}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">TRÁMITE</p>
            <p className="font-bold">{solicitud?.solicitud?.tramite?.titulo}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">SOLICITANTE</p>
            <p className="font-bold">{`${usuario?.nombres} ${usuario?.apellidos}`}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">FECHA DE INGRESO</p>
            <p className="font-bold">
              {formatDate(solicitud?.solicitud?.createdAt, 'DD MMM YYYY, HH:mm')}
            </p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">CORREO ELECTRÓNICO</p>
            <p className="font-bold">{solicitud?.solicitud?.email_contacto}</p>
          </div>
          <div>
            <p className="font-bold text-sm text-slate-500">TELÉFONO</p>
            <p className="font-bold">{solicitud?.solicitud?.telefono_contacto}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Indicar campos que requieren corrección</h2>
        <ul className="grid grid-cols-2">
          {pasosFormulario?.map((paso) => (
            <li key={paso.titulo}>
              <h3 className="font-bold">{paso.titulo}</h3>
              <ul>
                {paso?.campos_formularios?.map((campo) => {
                  const respuesta = respuestas.find((r) => r.campo_id === campo.id)?.valor;
                  const documento = documentos.find((d) => d.campo_id === campo.id);
                  return (
                    <li key={campo.id}>
                      <label htmlFor={campo.id}>
                        <input
                          value={camposSeleccionados[campo.nombre_interno]}
                          onChange={(e) => {
                            onChangeCamposSeleccionados(
                              campo.nombre_interno,
                              e.target.checked,
                              campo.id,
                              respuesta,
                            );
                          }}
                          className="mr-2"
                          type="checkbox"
                          id={campo.id}
                        />
                        {campo.tipo !== 'file' ? (
                          <p className="inline">
                            <strong>{campo.etiqueta}:</strong> {respuesta}
                          </p>
                        ) : (
                          <p className="inline">
                            <strong>{campo.etiqueta}:</strong>{' '}
                            <a
                              target="_blank"
                              className="text-blue-500 underline"
                              href={`${API_URL}/documentos/${documento.id}/view`}
                              rel="noreferrer"
                            >
                              Ver documento
                            </a>
                          </p>
                        )}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
        <hr className="mt-4 mb-4" />
        <Input
          value={observaciones}
          onChange={setObservaciones}
          placeholder="Indique las correcciones que debe realizar el solicitante"
          label="Observaciones"
          type="textarea"
        />
      </div>

      <div className="mt-10 flex justify-end gap-2">
        <Button variant="primary" text="Volver" />
        <Button
          onClick={() => {
            if (observaciones !== '') {
              setModal(true);
            } else {
              alert('La observación es obligatoria');
            }
          }}
          variant="secondary"
          text="Solicitar corrección"
        />
      </div>
    </div>
  );
};

export default SolicitarCorreccion;
