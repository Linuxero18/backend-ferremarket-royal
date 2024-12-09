const DetalleVenta = require('../models/detalleVentasModel');

const obtenerDetalleVentas = async (req, res) => {
  try {
    const detalleVentas = await DetalleVenta.obtenerDetalleVentas();
    res.status(200).json(detalleVentas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles de ventas', error });
  }
};

const obtenerDetalleVentaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const detalleVenta = await DetalleVenta.obtenerDetalleVentaPorId(id);
    res.status(200).json(detalleVenta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalle de venta', error });
  }
};

const crearDetalleVenta = async (req, res) => {
  const { venta_id, producto_id, cantidad, precio } = req.body;
  try {
    await DetalleVenta.crearDetalleVenta(venta_id, producto_id, cantidad, precio);
    res.status(201).json({ message: 'Detalle de venta creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear detalle de venta', error });
  }
};

const actualizarDetalleVenta = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio } = req.body;
  try {
    await DetalleVenta.actualizarDetalleVenta(id, cantidad, precio);
    res.status(200).json({ message: 'Detalle de venta actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar detalle de venta', error });
  }
};

const eliminarDetalleVenta = async (req, res) => {
  const { id } = req.params;
  try {
    await DetalleVenta.eliminarDetalleVenta(id);
    res.status(200).json({ message: 'Detalle de venta eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar detalle de venta', error });
  }
};

module.exports = {
  obtenerDetalleVentas,
  obtenerDetalleVentaPorId,
  crearDetalleVenta,
  actualizarDetalleVenta,
  eliminarDetalleVenta
};
