import { pool } from '../db.js';

export const getStock = async (req, res) => {
    const query = `
        SELECT 
            Productos.Codigo_Producto,
            Productos.Nombre,
            COALESCE(SUM(Compra.Cantidad), 0) AS cantidad_comprada,
            COALESCE(SUM(Ventas.Cantidad_Venta), 0) AS cantidad_vendida,
            COALESCE(SUM(Compra.Cantidad), 0) - COALESCE(SUM(Ventas.Cantidad_Venta), 0) AS stock_actual
        FROM 
            Productos 
        LEFT JOIN 
            Compra ON Productos.Codigo_Producto = Compra.idProducto
        LEFT JOIN 
            Ventas ON Productos.Codigo_Producto = Ventas.Codigo_Producto
        GROUP BY 
            Productos.Codigo_Producto, Productos.Nombre;
    `;
    try {
        const [rows] = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Error al obtener el stock',
            error: error.message
        });
    }
}
