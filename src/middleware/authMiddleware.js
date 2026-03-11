import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


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


