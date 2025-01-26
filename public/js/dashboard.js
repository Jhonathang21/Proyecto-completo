// frontend/public/js/dashboard.js

const url = 'http://localhost:3000/api/admin/usuarios';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token'); // Obtener el token almacenado en el localStorage

  // Si no hay token, redirige al login
  if (!token) {
    window.location.href = '../index.html';
  }

  // Verificar si el usuario tiene el rol 'admin' en el token
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificamos el token para obtener el rol
  if (decodedToken.role !== 'admin') {
    window.location.href = '../index.html'; // Si no es admin, redirigir al inicio
  }

  // Función para obtener la lista de usuarios si el rol es 'admin'
  async function obtenerUsuarios() {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en los headers
        },
      });

      if (!response.ok) {
        throw new Error('No autorizado o error al obtener usuarios');
      }

      const users = await response.json(); // Devuelve la lista de usuarios en formato JSON
      mostrarUsuarios(users); // Llamar a la función para mostrar los usuarios
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      // Si hay error, mostrar un mensaje en el dashboard
      document.getElementById('user-list').innerHTML = '<p>No tienes permisos para ver los usuarios o ocurrió un error.</p>';
    }
  }

  // Función para renderizar los usuarios en el HTML
  function mostrarUsuarios(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Limpiar la lista de usuarios (por si hay datos previos)

    // Recorremos todos los usuarios y los mostramos en una tabla
    users.forEach(user => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.usuario}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
      `;
      userList.appendChild(tr);
    });
  }

  // Mostrar mensaje de bienvenida
  document.getElementById('welcomeMessage').textContent = '¡Bienvenido al Dashboard!';

  // Cargar la lista de usuarios solo si el rol es admin
  obtenerUsuarios();

  // Lógica de cierre de sesión
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
  });
});
