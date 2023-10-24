import { pool } from '../db.js';

export const getEnvios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Envio');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const getEnvio = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Envio WHERE idEnvio = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Envio no encontrado'
        });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const createEnvio = async (req, res) => {
    const { Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Envio (Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura) VALUES (?, ?, ?, ?)', [Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura]);

        res.send({
            id: rows.insertId,
            Cantidad,
            Fecha_Envio,
            Direccion_Envio,
            Detalle_Factura
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const deleteEnvio = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Envio WHERE idEnvio = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Envio no encontrado'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateEnvioPut = async (req, res) => {
    const { id } = req.params;
    const { Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura } = req.body;

    try {
        const [result] = await pool.query('UPDATE Envio SET Cantidad = ?, Fecha_Envio = ?, Direccion_Envio = ?, Detalle_Factura = ? WHERE idEnvio = ?', [Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Envio no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM Envio WHERE idEnvio = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateEnvioPatch = async (req, res) => {
    const { id } = req.params;
    const { Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura } = req.body;

    try {
        const [result] = await pool.query('UPDATE Envio SET Cantidad = IFNULL(?, Cantidad), Fecha_Envio = IFNULL(?, Fecha_Envio), Direccion_Envio = IFNULL(?, Direccion_Envio), Detalle_Factura = IFNULL(?, Detalle_Factura) WHERE idEnvio = ?', [Cantidad, Fecha_Envio, Direccion_Envio, Detalle_Factura, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Envio no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM Envio WHERE idEnvio = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
