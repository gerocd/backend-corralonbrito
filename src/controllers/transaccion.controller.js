import { pool } from '../db.js';

export const getTransacciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Transacciones');
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener las transacciones del stock',
            error: error.message
        });
    }
}

export const createCompra = async (req, res) => {
    const { Producto, Cantidad, Precio_Unitario, Fecha_Transaccion } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Transacciones (Tipo, Producto, Cantidad, Precio_Unitario, Fecha_Transaccion) VALUES (?, ?, ?, ?, ?)', ['Compra', Producto, Cantidad, Precio_Unitario, Fecha_Transaccion]);

        res.send({
            id: rows.insertId,
            Tipo: 'Compra',
            Producto,
            Cantidad,
            Precio_Unitario,
            Fecha_Transaccion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al crear la compra en el stock',
            error: error.message
        });
    }
}

export const createVenta = async (req, res) => {
    const { Producto, Cantidad, Precio_Unitario, Fecha_Transaccion } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Transacciones (Tipo, Producto, Cantidad, Precio_Unitario, Fecha_Transaccion) VALUES (?, ?, ?, ?, ?)', ['Venta', Producto, Cantidad, Precio_Unitario, Fecha_Transaccion]);

        res.send({
            id: rows.insertId,
            Tipo: 'Venta',
            Producto,
            Cantidad,
            Precio_Unitario,
            Fecha_Transaccion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al crear la venta en el stock',
            error: error.message
        });
    }
}
