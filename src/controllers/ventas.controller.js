import { pool } from '../db.js';

// -------------------------------------- METODO GET (all) --------------------------------------------------
export const getVentas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Ventas');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO GET (id) --------------------------------------------------
export const getVenta = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Ventas WHERE idVenta = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Venta not found'
        });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO POST --------------------------------------------------
export const createVenta = async (req, res) => {
    const { Codigo_Producto, Cantidad_Venta } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Ventas(Codigo_Producto, Cantidad_Venta) VALUES (?, ?)', [Codigo_Producto, Cantidad_Venta]);
        res.send({
            id: rows.insertId,
            Codigo_Producto,
            Cantidad_Venta,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO DEL --------------------------------------------------
export const deleteVenta = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Ventas WHERE idVenta = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Venta not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO PUT --------------------------------------------------
export const updateVentaPut = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, Cantidad_Venta } = req.body;

    try {
        const [result] = await pool.query('UPDATE Ventas SET Codigo_Producto = ?, Cantidad_Venta = ? WHERE idVenta = ?', [Codigo_Producto, Cantidad_Venta, id]);

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Venta not found'
        });

        const [rows] = await pool.query('SELECT * FROM Ventas WHERE idVenta = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// -------------------------------------- METODO PATCH --------------------------------------------------
export const updateVentaPatch = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, Cantidad_Venta } = req.body;

    try {
        const [result] = await pool.query('UPDATE Ventas SET Codigo_Producto = IFNULL(?, Codigo_Producto), Cantidad_Venta = IFNULL(?, Cantidad_Venta) WHERE idVenta = ?', [Codigo_Producto, Cantidad_Venta, id]);

        console.log(result);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Venta not found'
        });

        const [rows] = await pool.query('SELECT * FROM Ventas WHERE idVenta = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

// ----------------------------------------------------------------------------------------

// Método para registrar una venta en la base de datos
export const transacciónVenta = async (req, res) => {
    try {
      const { Codigo_Producto, Cantidad_Venta, Fecha_Venta } = req.body;
  
      // Inserta la venta en la base de datos
      const [result] = await pool.query(
        'INSERT INTO Ventas (Codigo_Producto, Cantidad_Venta) VALUES (?, ?)',
        [Codigo_Producto, Cantidad_Venta]
      );
  
      // Verifica si la venta se insertó correctamente
      if (result.affectedRows === 1) {
        // Inserta una transacción en la tabla de Transacciones
        await pool.query(
          'INSERT INTO Transacciones (Tipo, CodigoProducto, Cantidad, FechaTransaccion) VALUES (?, ?, ?, ?)',
          ['Venta', Codigo_Producto, Cantidad_Venta, Fecha_Venta]
        );
  
        return res.status(201).json({ message: 'Venta registrada con éxito' });
      } else {
        return res.status(500).json({ message: 'Error al registrar la venta' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  };
  