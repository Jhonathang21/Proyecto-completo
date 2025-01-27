const url = 'http://localhost:3000/api/admin/usuarios';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token'); // Obtener el token almacenado en el localStorage
  
  // Si no hay token, redirige al login
  if (!token) {
    window.location.href = '../index.html';
  }

  // Verificar si el usuario tiene el rol 'admin' en el token
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificamos el token para obtener los datos
  const userRole = decodedToken.role;
  const usuario = decodedToken.usuario; // Extraemos el nombre de usuario
  const email = decodedToken.email; // Extraemos el email del usuario

  // Mostrar los datos del usuario en el icono de cuenta
  const accountIcon = document.getElementById('account-icon');
  const userInfoDiv = document.getElementById('user-info');
  accountIcon.textContent = `${usuario.charAt(0).toUpperCase()}`; // Muestra el nombre de usuario en el icono


  

  accountIcon.addEventListener('click', () => {
    // Al hacer clic en el icono, mostramos los detalles del usuario
    userInfoDiv.innerHTML = `
      <p><strong>Usuario:</strong> ${usuario}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Rol:</strong> ${userRole}</p>
    `;
    userInfoDiv.style.display = 'block'; // Muestra los detalles
  });

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
  //document.getElementById('welcomeMessage').textContent = '¡Bienvenido al Dashboard!';
  document.getElementById('welcomeMessage').textContent = `¡Bienvenido ${usuario}!`;
    

  // Cargar la lista de usuarios solo si el rol es admin
  if (userRole === 'admin') {
    obtenerUsuarios();
  }

  // Lógica de cierre de sesión
  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
  });
});
