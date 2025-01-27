import Usuarios from '../models/usuarios.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware para verificar si el usuario tiene el rol 'admin'

const checkAdminRole = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization
  if (!token) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuarios.findById(decoded.userId);
    
    // Si no es admin, no puede acceder a esta ruta
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'No tiene permisos para acceder a esta sección' });
    }

    req.user = user; // Añadimos la información del usuario a la solicitud
    next(); // Continuamos con la siguiente función en la ruta
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

export { checkAdminRole };
