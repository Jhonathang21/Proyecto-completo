// backend/src/models/item.js
import mongoose from 'mongoose';

// Definimos el esquema de un item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del item, requerido
  description: { type: String, required: true }, // Descripción del item, requerida
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true }, // Relación con el usuario el type es un ObjectId y ref es la referencia a la colección de usuarios
}, { timestamps: true }); // La propiedad 'timestamps' agrega automáticamente 'createdAt' y 'updatedAt'

// Creamos el modelo de 'Item' basado en el esquema
const Item = mongoose.model('Item', itemSchema);

export default Item;
