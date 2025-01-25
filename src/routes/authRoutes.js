// backend/src/routes/authRoutes.js
import express from 'express';
import { registro, login } from '../controller/authController.js';

const router = express.Router();// importa el registro y login de authController

router.post('/registro', registro);// esto crea una ruta para el método POST
router.post('/login', login); // esto crea una ruta para el método POST



export default router;







