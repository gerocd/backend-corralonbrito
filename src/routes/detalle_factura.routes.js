import { Router } from "express";
import { getDetalleFacturas, getDetalleFactura, createDetalleFactura, deleteDetalleFactura, updateDetalleFacturaPut, updateDetalleFacturaPatch } from '../controllers/detalle_factura.controller.js';

const router = Router();

router.get('/detallefacturas', getDetalleFacturas);

router.get('/detallefacturas/:id', getDetalleFactura);

router.post('/detalleFacturas', createDetalleFactura);

router.delete('/detallefacturas/:id', deleteDetalleFactura);

router.put('/detallefacturas/:id', updateDetalleFacturaPut);

router.patch('/detallefacturas/:id', updateDetalleFacturaPatch);

export default router;
