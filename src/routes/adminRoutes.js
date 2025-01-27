// backend/src/routes/adminRoutes.js
import express from 'express';
import { obtenerUsuarios } from '../controller/adminController.js';
import { checkAdminRole } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Ruta para obtener todos los usuarios (solo accesible para admin) y Protege la ruta con el middleware checkAdminRole
router.get('/usuarios', checkAdminRole, obtenerUsuarios);


export default router;


