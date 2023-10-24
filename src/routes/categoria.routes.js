import { Router } from 'express';
import {
  getCategorias,
  getCategoria,
  createCategoria,
  deleteCategoria,
  updateCategoriaPut,
  updateCategoriaPatch,
} from '../controllers/categoria.controller.js';

const router = Router();

router.get('/categorias', getCategorias);

router.get('/categorias/:id', getCategoria);

router.post('/categorias', createCategoria);

router.delete('/categorias/:id', deleteCategoria);

router.put('/categorias/:id', updateCategoriaPut);

router.patch('/categorias/:id', updateCategoriaPatch);

export default router;
