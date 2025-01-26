import express from 'express';
import { getItems, crearItem, actualizarItem, eliminarItem } from '../controller/itemController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js'; // Importamos el middleware de autenticación

const router = express.Router();

// Solo los usuarios autenticados pueden ver y crear ítems
router.get('/', authenticateJWT, getItems); // Obtener los ítems del usuario autenticado
router.post('/', authenticateJWT, crearItem); // Crear un ítem (vinculado al usuario autenticado)
router.put('/:id', authenticateJWT, actualizarItem); // Actualizar un ítem
router.delete('/:id', authenticateJWT, eliminarItem); // Eliminar un ítem

export default router;
