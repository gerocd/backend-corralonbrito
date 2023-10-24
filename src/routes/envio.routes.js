import { Router } from 'express';
import {
  getEnvios,
  getEnvio,
  createEnvio,
  deleteEnvio,
  updateEnvioPut,
  updateEnvioPatch,
} from '../controllers/envio.controller.js';

const router = Router();

router.get('/envios', getEnvios);

router.get('/envios/:id', getEnvio);

router.post('/envios', createEnvio);

router.delete('/envios/:id', deleteEnvio);

router.put('/envios/:id', updateEnvioPut);

router.patch('/envios/:id', updateEnvioPatch);

export default router;
