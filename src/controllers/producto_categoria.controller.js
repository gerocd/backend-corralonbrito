import { pool } from '../db.js';

export const getProductosCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Producto_Categoria');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const getProductoCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Producto_Categoria WHERE idProducto_Categoria = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({ message: 'Producto_Categoria no encontrada' });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const createProductoCategoria = async (req, res) => {
    const { Codigo_Producto, idCategoria } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Producto_Categoria (Codigo_Producto, idCategoria) VALUES (?, ?)', [Codigo_Producto, idCategoria]);

        res.send({
            id: rows.insertId,
            Codigo_Producto,
            idCategoria
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const deleteProductoCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Producto_Categoria WHERE idProducto_Categoria = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Producto_Categoria no encontrada' });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateProductoCategoriaPut = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, idCategoria } = req.body;

    try {
        const [result] = await pool.query('UPDATE Producto_Categoria SET Codigo_Producto = ?, idCategoria = ? WHERE idProducto_Categoria = ?', [Codigo_Producto, idCategoria, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto_Categoria no encontrada' });

        const [rows] = await pool.query('SELECT * FROM Producto_Categoria WHERE idProducto_Categoria = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export const updateProductoCategoriaPatch = async (req, res) => {
    const { id } = req.params;
    const { Codigo_Producto, idCategoria } = req.body;

    try {
        const [result] = await pool.query('UPDATE Producto_Categoria SET Codigo_Producto = IFNULL(?, Codigo_Producto), idCategoria = IFNULL(?, idCategoria) WHERE idProducto_Categoria = ?', [Codigo_Producto, idCategoria, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto_Categoria no encontrada' });

        const [rows] = await pool.query('SELECT * FROM Producto_Categoria WHERE idProducto_Categoria = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
