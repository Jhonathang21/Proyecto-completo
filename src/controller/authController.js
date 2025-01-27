// backend/src/controllers/authController.js
import Usuarios from '../models/usuarios.js';
import jwt from 'jsonwebtoken'; // importa la libreria de token que permite generar tokens JWT
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Funcion para registrar un usuario y se exporta 
export const registro = async (req, res) => {  // req es la solicitud y res es la respuesta
  try {
    const { usuario, email, password, role = 'user' } = req.body; //  extrae los datos del cuerpo de la solicitud y Definir un rol por defecto de 'user', si no se pasa 'role'
    
    if (role !== 'admin' && role !== 'user') {
      return res.status(400).json({ message: 'Rol inválido' });
    }

    const user = new Usuarios({ usuario, email, password, role }); // crea un nuevo usuario con los datos recibidos
        
    await user.save(); // guarda el usuario en la base de datos
    
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });// genera un token JWT con el id del usuario y lo expira en 1 hora
    res.status(201).json({ message: 'Usuario registrado exitosamente', token }); // devuelve un mensaje de exito y el token
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};

// Funcion para iniciar sesion y se exporta
export const login = async (req, res) => { // req es la solicitud y res es la respuesta
  try {
    const { email, password } = req.body; // extrae los datos del cuerpo de la solicitud
    const user = await Usuarios.findOne({ email }); // busca un usuario con el correo electrónico recibido
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' }); // si no encuentra un usuario devuelve un mensaje de error

    const isMatch = await user.comparePassword(password); // compara la contraseña recibida con la contraseña del usuario
    if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' }); // si la contraseña no coincide devuelve un mensaje de error

    const token = jwt.sign({ userId: user._id, 
                              role: user.role, 
                              usuario: user.usuario, 
                              email: user.email 
                            }, process.env.JWT_SECRET, { expiresIn: '1h' });
// Retornar el token y el rol del usuario
    res.json({ message: 'Inicio de sesión exitoso', token }); // devuelve un mensaje de exito y el token
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};


