import { Router } from 'express';
import {
  getProveedores,
  getProveedor,
  createProveedor,
  deleteProveedor,
  updateProveedorPut,
  updateProveedorPatch,
} from '../controllers/proveedores.controller.js'

const router = Router();

router.get('/proveedores', getProveedores);

router.get('/proveedores/:id', getProveedor);

router.post('/proveedores', createProveedor);

router.delete('/proveedores/:id', deleteProveedor);

router.put('/proveedores/:id', updateProveedorPut);

router.patch('/proveedores/:id', updateProveedorPatch);

export default router;
