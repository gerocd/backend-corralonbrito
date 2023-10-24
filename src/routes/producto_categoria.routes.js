import { Router } from 'express';
import {
  getProductosCategorias,
  getProductoCategoria,
  createProductoCategoria,
  deleteProductoCategoria,
  updateProductoCategoriaPut,
  updateProductoCategoriaPatch,
} from '../controllers/producto_categoria.controller.js';

const router = Router();

router.get('/productoscategorias', getProductosCategorias);

router.get('/productoscategorias/:id', getProductoCategoria);

router.post('/productoscategorias', createProductoCategoria);

router.delete('/productoscategorias/:id', deleteProductoCategoria);

router.put('/productoscategorias/:id', updateProductoCategoriaPut);

router.patch('/productoscategorias/:id', updateProductoCategoriaPatch);

export default router;
