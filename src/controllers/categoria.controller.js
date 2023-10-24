import { pool } from '../db.js';

export const getCategorias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Categoria');
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener las categorías',
            error: error.message
        });
    }
}

export const getCategoria = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Categoria WHERE idCategoria = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        });

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener la categoría',
            error: error.message
        });
    }
}

export const createCategoria = async (req, res) => {
    const { nombre, descripcion } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO Categoria (Nombre, Descripcion) VALUES (?, ?)', [nombre, descripcion]);

        res.send({
            id: rows.insertId,
            nombre,
            descripcion
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al crear la categoría',
            error: error.message
        });
    }
}

export const deleteCategoria = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM Categoria WHERE idCategoria = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        });

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al eliminar la categoría',
            error: error.message
        });
    }
}

export const updateCategoriaPut = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const [result] = await pool.query('UPDATE Categoria SET Nombre = ?, Descripcion = ? WHERE idCategoria = ?', [nombre, descripcion, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        });

        const [rows] = await pool.query('SELECT * FROM Categoria WHERE idCategoria = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al actualizar la categoría',
            error: error.message
        });
    }
}

export const updateCategoriaPatch = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const [result] = await pool.query('UPDATE Categoria SET Nombre = IFNULL(?, Nombre), Descripcion = IFNULL(?, Descripcion) WHERE idCategoria = ?', [nombre, descripcion, id]);

        if (result.affectedRows === 0) return res.status(404).json({
            message: 'Categoría no encontrada'
        });

        const [rows] = await pool.query('SELECT * FROM Categoria WHERE idCategoria = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al actualizar la categoría',
            error: error.message
        });
    }
}
