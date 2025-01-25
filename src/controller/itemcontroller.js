
import express from 'express'; // Importamos Express
import Item from '../models/item.js'; // Importamos el modelo Item

const router = express.Router();


export const getItems = async (req, res) => {
    try {
        // Obtenemos todos los items desde la base de datos
        const items = await Item.find();
        // Respondemos con los items obtenidos
        res.status(200).json(items);
      } catch (error) {
        // Si ocurre un error, respondemos con código 500 y el mensaje de error
        res.status(500).json({ message: error.message });
      }
    };


export const crearItem = async (req, res) => {
    try {
        // Creamos una nueva instancia del modelo Item con los datos recibidos en el cuerpo de la solicitud
        const newItem = new Item(req.body);
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