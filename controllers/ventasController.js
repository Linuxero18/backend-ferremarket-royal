const Venta = require('../models/ventasModel');

const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.obtenerVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas', error });
  }
};

const obtenerVentaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Venta.obtenerVentaPorId(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener venta', error });
  }
};

const crearVenta = async (req, res) => {
  const { id_cliente, fecha, total } = req.body;
  try {
    await Venta.crearVenta(id_cliente, fecha, total);
    res.status(201).json({ message: 'Venta creada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear venta', error });
  }
};

const actualizarVenta = async (req, res) => {
  const { id } = req.params;
  const { id_cliente, fecha, total } = req.body;
  try {
    await Venta.actualizarVenta(id, id_cliente, fecha, total);
    res.status(200).json({ message: 'Venta actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar venta', error });
  }
};

const eliminarVenta = async (req, res) => {
  const { id } = req.params;
  try {
    await Venta.eliminarVenta(id);
    res.status(200).json({ message: 'Venta eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar venta', error });
  }
};

module.exports = {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
  actualizarVenta,
  eliminarVenta
};
