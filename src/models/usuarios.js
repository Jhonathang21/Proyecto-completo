// backend/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // importa o bcrypt para criptografar la contraseña

const UserSchema = new mongoose.Schema({
  usuario: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Nuevo campo para el rol
});

// esta función se ejecuta antes de guardar un nuevo usuario y cifra la contraseña antes de guardar
UserSchema.pre('save', async function(next) { // Usa el método pre para ejecutar una función antes de guardar el usuario y el async para esperar a que termine la función
  if (!this.isModified('password')) return next(); // Si la contraseña no ha sido modificada, no hace nada
  this.password = await bcrypt.hash(this.password, 10); // Cifra la contraseña con bcrypt
});


// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) { // Define un método para comparar la contraseña ingresada con la contraseña cifrada
  return bcrypt.compare(candidatePassword, this.password); // Compara la contraseña ingresada con la contraseña cifrada
};

// Exporta el modelo de usuario
export default mongoose.model('Usuarios', UserSchema);


