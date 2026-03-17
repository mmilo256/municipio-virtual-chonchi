import { Op } from 'sequelize';
import Funcionario from '../models/Funcionario.js';
import { hashPassword } from '../utils/encryption.utils.js';
import { generateRandomToken } from '../utils/token.utils.js';

//Obtener funcionarios
export const obtenerFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.findAll({
      attributes: ['id', 'nombres', 'apellidos', 'username', 'email', 'run', 'rol', 'activo'],
    });
    res.status(200).json({ data: funcionarios, message: 'Funcionarios obtenidos exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, message: 'No se pudo obtener los funcionarios' });
  }
};

// Obtener funcionario por ID
export const obtenerFuncionarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const funcionarios = await Funcionario.findByPk(id, {
      attributes: ['nombres', 'apellidos', 'username', 'email', 'run', 'rol', 'activo'],
      where: { activo: true },
    });
    res.status(200).json(funcionarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No se pudo obtener el funcionario' });
  }
};

// Crear funcionario
export const crearFuncionario = async (req, res) => {
  const { nombres, apellidos, username, password, email, run, rol, activo } = req.body;

  const salt = generateRandomToken();
  const hashedPassword = hashPassword(password, salt);

  const funcionarioExiste = await Funcionario.findOne({ where: { username } });

  if (funcionarioExiste) {
    return res.status(400).json({ error: true, message: 'El funcionario ya existe en el sistema' });
  }

  const data = {
    nombres,
    apellidos,
    username,
    password: hashedPassword,
    email,
    run,
    rol,
    salt,
    activo,
  };

  try {
    const funcionarios = await Funcionario.create(data);
    res.status(200).json({ data: funcionarios, message: 'El funcionario fue creado exitosamente' });
  } catch (error) {
    res.status(400).json({ error, message: 'No se pudo crear el funcionario' });
  }
};

// Editar funcionario
export const editarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, username, password, email, run, rol, activo } = req.body;

  const funcionarioExiste = await Funcionario.findByPk(id);

  if (!funcionarioExiste) {
    return res.status(404).json({ error: true, message: 'Funcionario no encontrado' });
  }

  const usernameExiste = await Funcionario.findOne({ where: { username, id: { [Op.ne]: id } } });

  if (usernameExiste) {
    return res
      .status(404)
      .json({ error: true, message: 'Ya existe un funcionario con este nombre de usuario' });
  }

  const values = {};

  if (nombres !== undefined && nombres !== funcionarioExiste.nombres) values.nombres = nombres;
  if (apellidos !== undefined && apellidos !== funcionarioExiste.apellidos)
    values.apellidos = apellidos;
  if (username !== undefined && username !== funcionarioExiste.username) values.username = username;
  if (email !== undefined && email !== funcionarioExiste.email) values.email = email;
  if (run !== undefined && run !== funcionarioExiste.run) values.run = run;
  if (rol !== undefined && rol !== funcionarioExiste.rol) values.rol = rol;
  if (activo !== undefined && activo !== funcionarioExiste.activo) values.activo = activo;
  if (password) {
    const salt = generateRandomToken();
    const hashedPassword = hashPassword(password, salt);
    values.password = hashedPassword;
  }

  if (Object.values(values).length === 0) {
    return res.status(404).json({ error: true, message: 'No se ha realizado ningún cambio' });
  }

  try {
    const funcionario = await Funcionario.update(values, { where: { id } });
    res.status(200).json({ data: funcionario, message: 'Funcionario editado correctamente' });
  } catch (error) {
    res.status(500).json({ error, message: 'No se pudo editar la información del funcionario' });
  }
};
