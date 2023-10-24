import { Router } from "express";
import {
  getProductos,
  getProducto,
  createProducto,
  deleteProducto,
  updateProducto,
  searchProductos,
} from '../controllers/producto.controller.js'

const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.post('/productos', createProducto);

router.delete('/productos/:id', deleteProducto);

router.put('/productos/:id', updateProducto);

router.put('/productos/search', searchProductos)

export default router;
