import { useEffect, useState } from 'react';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import SelectInput from '../../ui/SelectInput';
import {
  crearFuncionario,
  editarFuncionario,
  obtenerFuncionarioPorId,
} from '../../../services/funcionarios.service';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const FormFuncionario = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [run, setRun] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [rol, setRol] = useState('Funcionario');
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await obtenerFuncionarioPorId(id);
        setNombres(data.nombres);
        setApellidos(data.apellidos);
        setRun(data.run);
        setEmail(data.email);
        setUsername(data.username);
        setRol(data.rol);
        setActivo(data.activo);
      })();
    }
  }, [id]);

  let breadcrumbs;

  if (id) {
    breadcrumbs = [
      { label: 'Funcionarios', href: '/funcionarios' },
      { label: 'Editar funcionario', href: `/funcionarios/${id}/editar` },
    ];
  } else {
    breadcrumbs = [
      { label: 'Funcionarios', href: '/funcionarios' },
      { label: 'Agregar funcionario', href: '/funcionarios/agregar' },
    ];
  }

  const resetForm = () => {
    setNombres('');
    setApellidos('');
    setRun('');
    setEmail('');
    setUsername('');
    setPassword('');
    setPassword2('');
    setRol('Funcionario');
  };

  const goBack = () => {
    navigate('..');
  };

  const editarInfoFuncionario = async () => {
    if (password !== password2) {
      return toast.warning('Las contraseñas no coinciden');
    }

    const data = {};

    data.activo = activo;

    if (nombres !== '') data.nombres = nombres;
    if (apellidos !== '') data.apellidos = apellidos;
    if (run !== '') data.run = run;
    if (email !== '') data.email = email;
    if (username !== '') data.username = username;
    if (password !== '') data.password = password;
    if (rol !== '') data.rol = rol;

    try {
      const response = await editarFuncionario(id, data);
      toast.success(response.message);
    } catch (error) {
      toast.warning(error.message);
    }
  };

  const agregarFuncionario = async () => {
    const data = {
      nombres,
      apellidos,
      run,
      email,
      username,
      password,
      rol,
      activo,
    };
    if (nombres && apellidos && run && email && username && password && password2 && rol) {
      if (password !== password2) {
        toast.error('Las contraseñas no coinciden');
      } else {
        try {
          const response = await crearFuncionario(data);
          toast.success(response.message);
          resetForm();
        } catch (error) {
          toast.error(error.message);
        }
      }
    } else {
      toast.warning('Debe rellenar todos los campos');
    }
  };

  const rolOptions = [
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Funcionario', value: 'Funcionario' },
  ];

  return (
    <div className="mb-4 max-w-[50rem] mx-auto">
      <ToastContainer />
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-2xl font-bold my-4">
        {id ? 'Editar funcionario' : 'Agregar funcionario'}
      </h1>
      <form className="grid grid-cols-2 gap-x-4" action="">
        <Input value={nombres} onChange={setNombres} label="Nombres" />
        <Input value={apellidos} onChange={setApellidos} label="Apellidos" />
        <Input value={run} onChange={setRun} label="RUT" />
        <Input value={email} onChange={setEmail} label="Email" />
        <SelectInput value={rol} onChange={setRol} label="Rol" options={rolOptions} />
        <Input value={username} onChange={setUsername} label="Nombre de usuario" />
        <Input value={password} onChange={setPassword} label="Contraseña" />
        <Input value={password2} onChange={setPassword2} label="Repetir contraseña" />
        <div>
          <label>
            <input
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
      </form>
      <div className="flex gap-4 justify-end mt-4">
        <Button onClick={goBack} variant="primary" text="Volver" />
        <Button
          onClick={id ? editarInfoFuncionario : agregarFuncionario}
          variant="secondary"
          text={id ? 'Guardar cambios' : 'Agregar funcionario'}
        />
      </div>
    </div>
  );
};

export default FormFuncionario;
