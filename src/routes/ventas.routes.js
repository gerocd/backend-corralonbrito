import { Router } from "express";
import { getVentas, getVenta, createVenta, deleteVenta, updateVentaPut, updateVentaPatch, transacciónVenta 
} from '../controllers/ventas.controller.js';

const router = Router();

router.get('/ventas', getVentas);

router.get('/ventas/:id', getVenta);

router.post('/ventas', createVenta);

router.delete('/ventas/:id', deleteVenta);

router.put('/ventas/:id', updateVentaPut);

router.patch('/ventas/:id', updateVentaPatch);

router.patch('/ventas/historial', transacciónVenta)

export default router;
