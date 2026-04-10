import { useEffect, useState } from 'react';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { obtenerFuncionarios } from '../../../services/funcionarios.service';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Textarea from '../../ui/Textarea';
import { obtenerDireccionesMunicipales } from '../../../services/direccionesMunicipales.service';
import SelectInput from '../../ui/SelectInput';
import {
  crearTramite,
  editarTramite,
  obtenerTramitePorId,
} from '../../../services/tramites.service';
import { obtenerFormularios } from '../../../services/formularios.service';

const FormTramite = () => {
  // Estados
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Campos formulario
  const [titulo, setTitulo] = useState('');
  const [slug, setSlug] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descripcionCorta, setDescripcionCorta] = useState('');
  const [infoAdicional, setInfoAdicional] = useState('');
  const [requisitos, setRequisitos] = useState('');
  const [costo, setCosto] = useState('');
  const [modalidadPago, setModalidadPago] = useState('');
  const [direccion, setDireccion] = useState('');
  const [horarioAtencion, setHorarioAtencion] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccionMunicipal, setDireccionMunicipal] = useState('');
  const [activo, setActivo] = useState(true);
  const [funcionarioActual, setFuncionarioActual] = useState('');
  const [funcionariosAutorizados, setFuncionariosAutorizados] = useState([]);

  const [direccionesMunicipales, setDireccionesMunicipales] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState([]);

  const [formularios, setFormularios] = useState([]);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState('');

  // Cargar datos del trámite si existe el ID
  useEffect(() => {
    (async () => {
      if (id) {
        const response = await obtenerTramitePorId(id);
        const tramite = response.data;

        const funAutorizados = tramite.funcionarios.map((fun) => fun.id);

        setTitulo(tramite.titulo);
        setSlug(tramite.slug);
        setDescripcion(tramite.descripcion);
        setDescripcionCorta(tramite.descripcion_corta);
        setInfoAdicional(tramite.info_adicional);
        setRequisitos(tramite.requisitos);
        setCosto(tramite.costo);
        setModalidadPago(tramite.modalidad_pago);
        setDireccion(tramite.direccion);
        setHorarioAtencion(tramite.horario_atencion);
        setEmail(tramite.email);
        setTelefono(tramite.telefono);
        setDireccionMunicipal(tramite.direccion_id);
        setActivo(tramite.activo);
        setFuncionariosAutorizados(funAutorizados);
        setFormularioSeleccionado(tramite.formulario_id ?? '');
      }
    })();
  }, [id]);

  // Cargar listado de formularios
  useEffect(() => {
    (async () => {
      const response = await obtenerFormularios();
      const data = response.data.map((form) => ({
        label: form.titulo,
        value: form.id,
      }));
      setFormularios(data);
    })();
  }, []);

  // Obtener funcionarios y direcciones municipales
  useEffect(() => {
    (async () => {
      const direccionesMunicipalesResponse = await obtenerDireccionesMunicipales();
      const direccionesMunicipalesData = direccionesMunicipalesResponse.data.map((e) => ({
        label: e.nombre,
        value: e.id,
      }));

      setDireccionesMunicipales(direccionesMunicipalesData);

      const funcionariosResponse = await obtenerFuncionarios();
      const funcionariosData = funcionariosResponse.data.map((funcionario) => ({
        label: `${funcionario.id} - ${funcionario.nombres} ${funcionario.apellidos}`,
        value: funcionario.id,
      }));

      setFuncionarios(funcionariosData);

      const filteredData = funcionariosData.filter(
        (funcionario) =>
          !funcionariosAutorizados.some((a) => {
            return a == funcionario.value;
          }),
      );
      setFuncionariosFiltrados(filteredData);
    })();
  }, [funcionariosAutorizados]);

  // Breadcrumbs
  let breadcrumbs;

  if (id) {
    breadcrumbs = [
      { label: 'Trámites', href: '/tramites' },
      { label: 'Editar trámite', href: `/tramites/${id}/editar` },
    ];
  } else {
    breadcrumbs = [
      { label: 'Trámites', href: '/tramites' },
      { label: 'Agregar trámite', href: '/tramites/agregar' },
    ];
  }

  // Resetear formulario
  const resetForm = () => {
    setTitulo('');
    setSlug('');
    setDescripcion('');
    setDescripcionCorta('');
    setInfoAdicional('');
    setRequisitos('');
    setCosto('');
    setModalidadPago('');
    setDireccion('');
    setHorarioAtencion('');
    setEmail('');
    setTelefono('');
    setDireccionMunicipal('');
    setActivo(true);
    setFuncionarioActual('');
    setFuncionariosAutorizados([]);
    setFormularioSeleccionado('');
  };

  // Volver a la página anterior
  const goBack = () => {
    navigate('..');
  };

  // Agregar un funcionario autorizado
  const agregarFuncionario = () => {
    setFuncionariosAutorizados((prev) => [...prev, Number(funcionarioActual)]);
    setFuncionarioActual('');
  };

  // Quitar funcionario autorizado
  const quitarFuncionario = (item) => {
    setFuncionariosAutorizados(() => {
      const newArray = funcionariosAutorizados.filter((fun) => fun !== item);
      return newArray;
    });
  };

  // Editar trámite
  const editarInfoTramite = async () => {
    const values = {};

    values.activo = activo;

    if (titulo !== '') values.titulo = titulo;
    if (slug !== '') values.slug = slug;
    if (descripcion !== '') values.descripcion = descripcion;
    if (descripcionCorta !== '') values.descripcionCorta = descripcionCorta;
    if (infoAdicional !== '') values.infoAdicional = infoAdicional;
    if (requisitos !== '') values.requisitos = requisitos;
    if (costo !== '') values.costo = costo;
    if (modalidadPago !== '') values.modalidadPago = modalidadPago;
    if (direccion !== '') values.direccion = direccion;
    if (horarioAtencion !== '') values.horarioAtencion = horarioAtencion;
    if (email !== '') values.email = email;
    if (telefono !== '') values.telefono = telefono;
    if (direccionMunicipal !== '') values.direccionMunicipal = direccionMunicipal;
    if (formularioSeleccionado !== '') values.formularioSeleccionado = formularioSeleccionado;
    if (funcionariosAutorizados.length !== 0)
      values.funcionariosAutorizados = funcionariosAutorizados;

    setLoading(true);

    try {
      const response = await editarTramite(id, values);
      toast.success(response.message);
    } catch (error) {
      toast.warning(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear trámite
  const agregarTramite = async () => {
    if (
      !titulo ||
      !slug ||
      !descripcion ||
      !descripcionCorta ||
      !infoAdicional ||
      !requisitos ||
      !costo ||
      !modalidadPago ||
      !direccion ||
      !horarioAtencion ||
      !email ||
      !telefono ||
      !direccionMunicipal
    ) {
      return toast.warning('Debe rellenar todos los campos');
    }

    const data = {
      titulo,
      slug,
      descripcion,
      descripcionCorta,
      infoAdicional,
      requisitos,
      costo,
      modalidadPago,
      direccion,
      horarioAtencion,
      email,
      telefono,
      activo,
      direccionMunicipal: Number(direccionMunicipal),
      funcionarios: funcionariosAutorizados,
      formulario_id: Number(formularioSeleccionado) !== 0 ? Number(formularioSeleccionado) : null,
    };

    setLoading(true);

    try {
      await crearTramite(data);
      resetForm();
      toast.success('Trámite creado exitosamente');
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">{id ? 'Editar trámite' : 'Agregar trámite'}</h1>
      <form className="grid grid-cols-2 gap-x-4" action="">
        <Input name="titulo" value={titulo} onChange={setTitulo} label="Nombre del trámite" />
        <Input name="slug" value={slug} onChange={setSlug} label="Slug" />
        <Textarea
          className="col-span-2"
          name="descripcion"
          value={descripcion}
          onChange={setDescripcion}
          label="Descripción"
        />
        <Textarea
          className="col-span-2"
          name="descripcion-corta"
          value={descripcionCorta}
          onChange={setDescripcionCorta}
          label="Descripción corta"
        />
        <Textarea
          name="info-adicional"
          value={infoAdicional}
          onChange={setInfoAdicional}
          label="Información Adicional"
        />
        <Textarea
          name="requisitos"
          value={requisitos}
          onChange={setRequisitos}
          label="Requisitos"
        />

        <Input name="costo" value={costo} onChange={setCosto} label="Costo del trámite" />
        <Input
          name="modalidad-pago"
          value={modalidadPago}
          onChange={setModalidadPago}
          label="Modalidad de pago"
        />
        <Input
          name="domicilio"
          value={direccion}
          onChange={setDireccion}
          label="Dirección (domicilio)"
        />
        <Input
          name="horario-atencion"
          value={horarioAtencion}
          onChange={setHorarioAtencion}
          label="Horario de atención"
        />
        <Input name="email" value={email} onChange={setEmail} label="Correo electrónico" />
        <Input name="telefono" value={telefono} onChange={setTelefono} label="Teléfono" />
        <SelectInput
          className="col-span-2"
          label="Dirección Municipal"
          value={direccionMunicipal}
          onChange={setDireccionMunicipal}
          name="direccion-municipal"
          options={direccionesMunicipales}
        />
        <div className="col-span-2">
          <label>
            <input
              id="activo"
              checked={activo}
              onChange={(e) => {
                setActivo(e.target.checked);
              }}
              className="mr-2"
              type="checkbox"
            />
            <span>¿Activo?</span>
          </label>
        </div>

        <div className="my-4 col-span-2 flex items-center gap-4">
          <span className="font-bold">Formulario</span>
          <hr className="w-full" />
        </div>
        <SelectInput
          className="col-span-2"
          label="Seleccionar formulario"
          value={formularioSeleccionado}
          onChange={setFormularioSeleccionado}
          name="formulario"
          options={formularios}
        />
        <div className="my-4 col-span-2 flex items-center gap-4">
          <span className="font-bold">Permisos</span>
          <hr className="w-full" />
        </div>
        <div>
          <SelectInput
            label="Seleccionar funcionario"
            name="funcionario"
            value={funcionarioActual}
            onChange={setFuncionarioActual}
            options={funcionariosFiltrados}
          />
          <Button
            isValid={funcionarioActual}
            onClick={agregarFuncionario}
            variant="primary"
            text="Agregar funcionario"
          />
        </div>
        <div>
          <p>Funcionarios autorizados</p>
          <ul className="bg-[#fff] p-2 rounded border space-y-2">
            {funcionariosAutorizados.length === 0 ? (
              <p className="text-slate-500 italic text-sm">
                No hay funcionarios autorizados para gestionar solicitudes de este trámite
              </p>
            ) : (
              funcionariosAutorizados.map((funcionario, index) => {
                const funcionarioEncontrado = funcionarios.find(
                  (fun) => fun.value === Number(funcionario),
                );
                const nombreFuncionario = funcionarioEncontrado?.label || 'funko pop';
                return (
                  <li key={index} className="flex items-center justify-between border-b py-2">
                    <p className="text-sm">{nombreFuncionario}</p>
                    <button
                      className="bg-red-600 hover:bg-red-500 h-6 w-6 rounded-full text-white font-black"
                      type="button"
                      onClick={() => {
                        quitarFuncionario(funcionario);
                      }}
                    >
                      x
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </form>
      <div className="flex gap-4 justify-end mt-4">
        <Button onClick={goBack} variant="primary" text="Volver" />
        <Button
          onClick={id ? editarInfoTramite : agregarTramite}
          isLoading={loading}
          variant="secondary"
          text={id ? 'Guardar cambios' : 'Agregar trámite'}
        />
      </div>
      {loading && <p>cargando...</p>}
    </div>
  );
};

export default FormTramite;
