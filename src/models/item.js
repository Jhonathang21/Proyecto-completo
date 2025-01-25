// const mongoose = require('mongoose');

import mongoose from 'mongoose'; // Importamos mongoose

// Definimos el esquema de un item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del item, requerido
  description: { type: String, required: true }, // Descripción del item, requerida
});

// Creamos el modelo de 'Item' basado en el esquema
const Item = mongoose.model('item', itemSchema);

//module.exports = Item; // Exportamos el modelo para usarlo en las rutas

export default Item; // Exportamos el modelo para usarlo en las rutas