import express from 'express';
import { getTransacciones, createCompra, createVenta } from '../controllers/transaccion.controller.js'

const router = express.Router();

router.get('/transacciones', getTransacciones);

router.post('/compra', createCompra);

router.post('/venta', createVenta);

export default router;
