const Rol = require('../models/rolModel');

const obtenerRoles = async (req, res) => {
  try {
    const roles = await Rol.obtenerRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener roles', error });
  }
};

const obtenerRolPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Rol.obtenerRolPorId(id);
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rol', error });
  }
};

const crearRol = async (req, res) => {
  const { nombre } = req.body;
  try {
    await Rol.crearRol(nombre);
    res.status(201).json({ message: 'Rol creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear rol', error });
  }
};

const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    await Rol.actualizarRol(id, nombre);
    res.status(200).json({ message: 'Rol actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rol', error });
  }
};

const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await Rol.eliminarRol(id);
    res.status(200).json({ message: 'Rol eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rol', error });
  }
};

module.exports = {
  obtenerRoles,
  obtenerRolPorId,
  crearRol,
  actualizarRol,
  eliminarRol
};
