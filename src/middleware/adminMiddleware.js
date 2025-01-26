import Usuarios from '../models/usuarios.js';

// Middleware para verificar si el usuario es un admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await Usuarios.findById(req.userId); // Obtener el usuario por ID (debe estar en el token)
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado. No tienes privilegios de administrador.' });
    }
    next(); // Si es admin, continuar
  } catch (error) {
    res.status(500).json({ message: 'Error al verificar el rol de administrador', error: error.message });
  }
};
