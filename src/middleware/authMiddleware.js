import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuarios from '../models/usuarios.js';

dotenv.config();

// Middleware para verificar el token JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extrae el token del header

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.userId = decoded.userId; // El ID del usuario decodificado se agrega a la solicitud
    next(); // Si todo es válido, pasa al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};


// Middleware para verificar si el usuario tiene el rol 'admin'
export const verificarAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado, solo administradores pueden acceder' });
    }
    next(); // Si el usuario es admin, pasamos al siguiente middleware o ruta
};




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
