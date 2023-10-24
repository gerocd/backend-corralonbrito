import { Router } from 'express';
import {
  getProductosProveedores,
  getProductoProveedor,
  createProductoProveedor,
  deleteProductoProveedor,
  updateProductoProveedorPut,
  updateProductoProveedorPatch,
} from '../controllers/producto_proveedor.controller.js'

const router = Router();

router.get('/productosproveedores', getProductosProveedores);

router.get('/productosproveedores/:id', getProductoProveedor);

router.post('/productosproveedores', createProductoProveedor);

router.delete('/productosproveedores/:id', deleteProductoProveedor);

router.put('/productosproveedores/:id', updateProductoProveedorPut);

router.patch('/productosproveedores/:id', updateProductoProveedorPatch);

export default router;
