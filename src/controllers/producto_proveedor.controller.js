import { pool } from '../db.js';

export const getProductosProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Producto_Proveedor');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getProductoProveedor = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Producto_Proveedor WHERE idProducto_Proveedor = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({ message: 'Producto Proveedor no encontrado' });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createProductoProveedor = async (req, res) => {
    const { Codigo_Producto, idProveedor } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Producto_Proveedor (Codigo_Producto, idProveedor) VALUES (?, ?)', [Codigo_Producto, idProveedor]);

        res.json({
            id: rows.insertId,
            Codigo_Producto,
            idProveedor
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteProductoProveedor = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Producto_Proveedor WHERE idProducto_Proveedor = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Producto Proveedor no encontrado' });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateProductoProveedorPut = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, idProveedor } = req.body;

    try {
        const [result] = await pool.query('UPDATE Producto_Proveedor SET Codigo_Producto = ?, idProveedor = ? WHERE idProducto_Proveedor = ?', [Codigo_Producto, idProveedor, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto Proveedor no encontrado' });

        const [rows] = await pool.query('SELECT * FROM Producto_Proveedor WHERE idProducto_Proveedor = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateProductoProveedorPatch = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, idProveedor } = req.body;

    try {
        const [result] = await pool.query('UPDATE Producto_Proveedor SET Codigo_Producto = IFNULL(?, Codigo_Producto), idProveedor = IFNULL(?, idProveedor) WHERE idProducto_Proveedor = ?', [Codigo_Producto, idProveedor, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto Proveedor no encontrado' });

        const [rows] = await pool.query('SELECT * FROM Producto_Proveedor WHERE idProducto_Proveedor = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
