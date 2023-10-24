import { Router } from "express";
import { getCompras, getCompra, createCompra, deleteCompra, updateCompraPut, updateCompraPatch, transacciónCompra } from '../controllers/compra.controller.js';

const router = Router();

router.get('/compras', getCompras);

router.get('/compras/:id', getCompra);

router.post('/compras', createCompra);

router.delete('/compras/:id', deleteCompra);

router.put('/compras/:id', updateCompraPut);

router.patch('/compras/:id', updateCompraPatch);

router.patch('/compras/historial',transacciónCompra)

export default router;
