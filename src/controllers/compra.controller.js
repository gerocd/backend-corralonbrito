import { pool } from '../db.js';

export const getCompras = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Compra');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const getCompra = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Compra WHERE idCompra = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Compra no encontrada'
        });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const createCompra = async (req, res) => {
    const { idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Compra (idProducto, Cantidad, Fecha_Compra, Precio_Compra_Unitario, Monto_Compra_Total) VALUES (?, ?, ?, ?, ?)', [idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal]);

        res.send({
            id: rows.insertId,
            idProducto,
            cantidad,
            fechaCompra,
            precioCompraUnitario,
            montoCompraTotal
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const deleteCompra = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Compra WHERE idCompra = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Compra no encontrada'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateCompraPut = async (req, res) => {
    const { id } = req.params;
    const { idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal } = req.body;

    try {
        const [result] = await pool.query('UPDATE Compra SET idProducto = ?, Cantidad = ?, Fecha_Compra = ?, Precio_Compra_Unitario = ?, Monto_Compra_Total = ? WHERE idCompra = ?', [idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Compra no encontrada'
        });

        const [rows] = await pool.query('SELECT * FROM Compra WHERE idCompra = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateCompraPatch = async (req, res) => {
    const { id } = req.params;
    const { idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal } = req.body;

    try {
        const [result] = await pool.query('UPDATE Compra SET idProducto = IFNULL(?, idProducto), Cantidad = IFNULL(?, Cantidad), Fecha_Compra = IFNULL(?, Fecha_Compra), Precio_Compra_Unitario = IFNULL(?, Precio_Compra_Unitario), Monto_Compra_Total = IFNULL(?, Monto_Compra_Total) WHERE idCompra = ?', [idProducto, cantidad, fechaCompra, precioCompraUnitario, montoCompraTotal, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Compra no encontrada'
        });

        const [rows] = await pool.query('SELECT * FROM Compra WHERE idCompra = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
// ----------------------------------------------------------------------------------------

// Método para registrar una compra en la base de datos
export const transacciónCompra = async (req, res) => {
    try {
      const { idProducto, Cantidad, Fecha_Compra } = req.body;
  
      // Inserta la compra en la base de datos
      const [result] = await pool.query(
        'INSERT INTO Compra (idProducto, Cantidad, Fecha_Compra) VALUES (?, ?, ?)',
        [idProducto, Cantidad, Fecha_Compra]
      );
  
      // Verifica si la compra se insertó correctamente
      if (result.affectedRows === 1) {
        // Inserta una transacción en la tabla de Transacciones
        await pool.query(
          'INSERT INTO Transacciones (Tipo, CodigoProducto, Cantidad, FechaTransaccion) VALUES (?, ?, ?, ?)',
          ['Compra', idProducto, Cantidad, Fecha_Compra]
        );
  
        return res.status(201).json({ message: 'Compra registrada con éxito' });
      } else {
        return res.status(500).json({ message: 'Error al registrar la compra' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };