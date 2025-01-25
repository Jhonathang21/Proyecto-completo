import express from 'express';
import { getItems, crearItem, actualizarItem, eliminarItem } from '../controller/itemcontroller.js';

const router = express.Router();// importa el registro y login de authController


router.get('/', getItems); // esto crea una ruta para el método GET
router.post('/', crearItem) // esto crea una ruta para el método POST
router.put('/:id', actualizarItem) // esto crea una ruta para el método POST
router.delete('/:id', eliminarItem) // esto crea una ruta para el método DELETE


export default router;

