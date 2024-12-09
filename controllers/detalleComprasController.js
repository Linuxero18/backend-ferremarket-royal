const DetalleCompra = require('../models/detalleComprasModel');

const obtenerDetalleCompras = async (req, res) => {
  try {
    const detalleCompras = await DetalleCompra.obtenerDetalleCompras();
    res.status(200).json(detalleCompras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles de compras', error });
  }
};

const obtenerDetalleCompraPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const detalleCompra = await DetalleCompra.obtenerDetalleCompraPorId(id);
    res.status(200).json(detalleCompra);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalle de compra', error });
  }
};

const crearDetalleCompra = async (req, res) => {
  const { compra_id, producto_id, cantidad, precio } = req.body;
  try {
    await DetalleCompra.crearDetalleCompra(compra_id, producto_id, cantidad, precio);
    res.status(201).json({ message: 'Detalle de compra creado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear detalle de compra', error });
  }
};

const actualizarDetalleCompra = async (req, res) => {
  const { id } = req.params;
  const { cantidad, precio } = req.body;
  try {
    await DetalleCompra.actualizarDetalleCompra(id, cantidad, precio);
    res.status(200).json({ message: 'Detalle de compra actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar detalle de compra', error });
  }
};

const eliminarDetalleCompra = async (req, res) => {
  const { id } = req.params;
  try {
    await DetalleCompra.eliminarDetalleCompra(id);
    res.status(200).json({ message: 'Detalle de compra eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar detalle de compra', error });
  }
};

module.exports = {
  obtenerDetalleCompras,
  obtenerDetalleCompraPorId,
  crearDetalleCompra,
  actualizarDetalleCompra,
  eliminarDetalleCompra
};
