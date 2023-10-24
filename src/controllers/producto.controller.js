import { pool } from '../db.js';

// Método GET (Obtener todos los productos)
export const getProductos = async (req, res) => {
    try {
        console.log('Controlador getProductos se está ejecutando');
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los productos', error: error.message });
    }
};

// Método GET (Obtener un producto por su ID)
export const getProducto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE Codigo_Producto = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el producto', error: error.message });
    }
};

// Método POST (Crear un nuevo producto)
export const createProducto = async (req, res) => {
    const { Nombre, Descripcion, Marca, Precio_Unitario, Precio_Costo } = req.body;
    try {
        const [rows] = await pool.query(
            'INSERT INTO productos(Nombre, Descripcion, Marca, Precio_Unitario, Precio_Costo) VALUES (?,?,?,?,?)',
            [Nombre, Descripcion, Marca, Precio_Unitario, Precio_Costo]
        );
        res.send({
            id: rows.insertId,
            Nombre,
            Descripcion,
            Marca,
            Precio_Unitario,
            Precio_Costo,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el producto', error: error.message });
    }
};

// Método PUT (Actualizar un producto por su ID)
export const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Marca, Precio_Unitario, Precio_Costo } = req.body;
    try {
        const [result] = await pool.query(
            'UPDATE productos SET Nombre=?, Descripcion=?, Marca=?, Precio_Unitario=?, Precio_Costo=? WHERE Codigo_Producto = ?',
            [Nombre, Descripcion, Marca, Precio_Unitario, Precio_Costo, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        const [rows] = await pool.query('SELECT * FROM productos WHERE Codigo_Producto = ?', [id]);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
};

// Método DELETE (Eliminar un producto por su ID)
export const deleteProducto = async (req, res) => {
    try {
        // Realiza una consulta SELECT para verificar si el producto existe
        const [rows] = await pool.query('SELECT * FROM productos WHERE Codigo_Producto = ?', [req.params.id]);

        // Verifica si el producto existe
        if (rows.length <= 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Si el producto existe, procede a eliminarlo
        const [result] = await pool.query('DELETE FROM productos WHERE Codigo_Producto = ?', [req.params.id]);

        if (result.affectedRows <= 0) {
            return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el producto', error: error.message });
    }
};


// Método GET para buscar productos por nombre, marca o categoría
export const searchProductos = async (req, res) => {
    const { keyword } = req.query;
  
    try {
      const [rows] = await pool.query(
        'SELECT * FROM Productos WHERE Nombre LIKE ? OR Marca LIKE ?',
        [`%${keyword}%`, `%${keyword}%`]
      );
  
      res.json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al buscar los productos', error: error.message });
    }
};
