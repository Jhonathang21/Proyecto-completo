// backend/src/config/database.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export const ConectarDB = async () => { // se crea la funcion para conectar a la base de datos
  try {
    await mongoose.connect(process.env.MONGO_URI, { // se utiliza el proceso de ambiente para obtener la url de la base de datos
      useNewUrlParser: true, // se utiliza el nuevo formato de url
      useUnifiedTopology: true, // se utiliza la nueva forma de conectar a la base de datos
    });
    console.log('Conexión a MongoDB establecida'); // se imprime un mensaje en la consola para indicar que la conexión se ha establecido
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message); // se imprime un mensaje en la consola para indicar que ha habido un error al conectar
    // process.exit(1); // se utiliza para salir del proceso si hay un error
  }
};

