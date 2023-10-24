import { Router } from "express";

import categoriaRoutes from './categoria.routes.js';
import compraRoutes from './compra.routes.js';
import detalleFacturaRoute from './detalle_factura.routes.js'
import envioRoutes from './envio.routes.js';
import productoProveedorRoutes from './producto_proveedor.routes.js';
import productoCategoriaRoutes from './producto_categoria.routes.js';
import productosRoutes from './producto.routes.js';
import proveedoresRoutes from './proveedores.routes.js';
import stockRoutes from './stock.routes.js'
import transaccionesRoutes from './transaccion.routes.js'; // Ruta de transacciones
import ventasRoutes from './ventas.routes.js';

const router = Router();


router.use('/corralonbrito', categoriaRoutes);
router.use('/corralonbrito', compraRoutes);
router.use('/corralonbrito', detalleFacturaRoute);
router.use('/corralonbrito', envioRoutes);
router.use('/corralonbrito', productoProveedorRoutes);
router.use('/corralonbrito', productoCategoriaRoutes);
router.use('/corralonbrito', productosRoutes);
router.use('/corralonbrito', proveedoresRoutes);
router.use('/corralonbrito', stockRoutes);
router.use('/corralonbrito', transaccionesRoutes);
router.use('/corralonbrito', ventasRoutes);

console.log("finalizo index ")
export default router





