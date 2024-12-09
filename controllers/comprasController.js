const Compra = require('../models/comprasModel');

const obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.obtenerCompras();
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compras', error });
  }
};

const obtenerCompraPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const compra = await Compra.obtenerCompraPorId(id);
    res.status(200).json(compra);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener compra', error });
  }
};

const crearCompra = async (req, res) => {
  const { proveedor_id, total } = req.body;
  try {
    await Compra.crearCompra(proveedor_id, total);
    res.status(201).json({ message: 'Compra creada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear compra', error });
  }
};

const actualizarCompra = async (req, res) => {
  const { id } = req.params;
  const { proveedor_id, total } = req.body;
  try {
    await Compra.actualizarCompra(id, proveedor_id, total);
    res.status(200).json({ message: 'Compra actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar compra', error });
  }
};

const eliminarCompra = async (req, res) => {
  const { id } = req.params;
  try {
    await Compra.eliminarCompra(id);
    res.status(200).json({ message: 'Compra eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar compra', error });
  }
};

module.exports = {
  obtenerCompras,
  obtenerCompraPorId,
  crearCompra,
  actualizarCompra,
  eliminarCompra
};
