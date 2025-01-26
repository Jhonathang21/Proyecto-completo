
import express from 'express'; // Importamos Express
import Item from '../models/item.js'; // Importamos el modelo Item

const router = express.Router();


// Obtener los ítems creados por el usuario autenticado
export const getItems = async (req, res) => {
    try {
      const userId = req.userId; // El ID del usuario viene del token JWT
      const items = await Item.find({ user: userId }); // Filtramos los ítems por el usuario
  
      res.status(200).json(items); // Respondemos con los ítems encontrados
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// Crear un nuevo ítem, vinculado al usuario autenticado
export const crearItem = async (req, res) => {
    try {
      const { name, description } = req.body;
      const userId = req.userId; // El ID del usuario viene del token JWT
  
      // Creamos una nueva instancia del modelo Item con los datos recibidos y el ID del usuario
      const newItem = new Item({ name, description, user: userId });
  
      // Guardamos el nuevo item en la base de datos
      await newItem.save();
        // Respondemos con el item creado y código de estado 201 (Creado)
        res.status(201).json(newItem);
      } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
      }
    };


export const actualizarItem = async (req, res) => {
    try {
        // Buscamos el item por su ID y lo actualizamos con los nuevos datos
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Respondemos con el item actualizado
        res.status(200).json(updatedItem);
      } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
      }
    };

export const eliminarItem = async (req, res) => {
    try {
        // Buscamos el item por su ID y lo eliminamos
        await Item.findByIdAndDelete(req.params.id);
        // Respondemos con código 204 (sin contenido)
        res.status(204).json();
      } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
      }
    };



// module.exports = router; // Exportamos las rutas para usarlas en el archivo server.js
export default router; // Exportamos las rutas para usarlas en el archivo server.js