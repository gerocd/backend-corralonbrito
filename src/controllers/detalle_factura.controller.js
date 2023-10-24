import { pool } from '../db.js';

// Método GET (Obtener todos los detalles de factura)
export const getDetalleFacturas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DetalleFactura');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método GET (Obtener un detalle de factura por su ID)
export const getDetalleFactura = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM DetalleFactura WHERE Detalle_Factura = ?', [req.params.id]);

        if (rows.length <= 0) return res.status(404).json({ message: 'Detalle de factura no encontrado' });

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método POST (Crear un nuevo detalle de factura)
export const createDetalleFactura = async (req, res) => {
    const { idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta } = req.body;

    try {
        const [rows] = await pool.query('INSERT INTO DetalleFactura (idVenta, Cantidad_Venta_Producto, Precio_Venta_Total, Fecha_Venta) VALUES (?, ?, ?, ?)', [idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta]);

        res.send({
            id: rows.insertId,
            idVenta,
            cantidadVentaProducto,
            precioVentaTotal,
            fechaVenta
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método DELETE (Eliminar un detalle de factura por su ID)
export const deleteDetalleFactura = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM DetalleFactura WHERE Detalle_Factura = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).json({ message: 'Detalle de factura no encontrado' });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método PUT (Actualizar un detalle de factura por su ID)
export const updateDetalleFacturaPut = async (req, res) => {
    const { id } = req.params;
    const { idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta } = req.body;

    try {
        const [result] = await pool.query('UPDATE DetalleFactura SET idVenta = ?, Cantidad_Venta_Producto = ?, Precio_Venta_Total = ?, Fecha_Venta = ? WHERE Detalle_Factura = ?', [idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de factura no encontrado' });

        const [rows] = await pool.query('SELECT * FROM DetalleFactura WHERE Detalle_Factura = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

// Método PATCH (Actualizar un detalle de factura por su ID)
export const updateDetalleFacturaPatch = async (req, res) => {
    const { id } = req.params;
    const { idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta } = req.body;

    try {
        const [result] = await pool.query('UPDATE DetalleFactura SET idVenta = IFNULL(?, idVenta), Cantidad_Venta_Producto = IFNULL(?, Cantidad_Venta_Producto), Precio_Venta_Total = IFNULL(?, Precio_Venta_Total), Fecha_Venta = IFNULL(?, Fecha_Venta) WHERE Detalle_Factura = ?', [idVenta, cantidadVentaProducto, precioVentaTotal, fechaVenta, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: 'Detalle de factura no encontrado' });

        const [rows] = await pool.query('SELECT * FROM DetalleFactura WHERE Detalle_Factura = ?', [id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
