import { pool } from '../db.js';

export const getProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Proveedores');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const getProveedor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const createProveedor = async (req, res) => {
    const { nombre } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Proveedores (Nombre) VALUES (?)', [nombre]);

        res.send({
            id: rows.insertId,
            nombre
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const deleteProveedor = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Proveedores WHERE idProveedor = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateProveedorPut = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const [result] = await pool.query('UPDATE Proveedores SET Nombre = ? WHERE idProveedor = ?', [nombre, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}

export const updateProveedorPatch = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const [result] = await pool.query('UPDATE Proveedores SET Nombre = IFNULL(?, Nombre) WHERE idProveedor = ?', [nombre, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Proveedor no encontrado'
        });

        const [rows] = await pool.query('SELECT * FROM Proveedores WHERE idProveedor = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
}
