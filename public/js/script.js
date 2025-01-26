const apiUrl = 'http://localhost:3000/api/items'; // URL de la API para los items

// Obtener el token JWT desde el almacenamiento local
const token = localStorage.getItem('token');

// Función para obtener todos los items desde el backend
function getItems() {
  if (!token) {
    alert("Debes iniciar sesión para ver los items.");
    window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
  }

  fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
    }
  })
    .then(response => response.json())
    .then(items => {
      const itemsList = document.getElementById('items-list');
      itemsList.innerHTML = '';

      items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.description}`;
        const editarBoton = document.createElement('button');
        editarBoton.textContent = 'Editar';
        editarBoton.style.backgroundColor = '#6db9b8';
        editarBoton.addEventListener('click', () => editaritem(item));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.style.backgroundColor = '#f76c6c';
        deleteButton.addEventListener('click', () => deleteItem(item._id));

        li.appendChild(editarBoton);
        li.appendChild(deleteButton);

        itemsList.appendChild(li);
      });
    })
    .catch(error => console.error('Error al obtener los items:', error));
}

// Modificamos el event listener del formulario para manejar tanto POST como PUT
document.getElementById('item-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const itemId = e.target.dataset.id;

  if (itemId) {
    // Si hay un ID, actualizamos el item existente
    updateItem(itemId, name, description);
  } else {
    // Si no hay ID, creamos un nuevo item
    createItem(name, description);
  }
});

// Función para crear un nuevo item (POST)
function createItem(name, description) {
  if (!token) {
    alert("Debes iniciar sesión para crear un item.");
    window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
    },
    body: JSON.stringify({ name, description })
  })
    .then(response => response.json())
    .then(() => {
      alert("Item creado correctamente");
      getItems(); // Actualizar la lista de items
      document.getElementById('item-form').reset(); // Limpiar el formulario
    })
    .catch(error => console.error('Error al crear el item:', error));
}

// Función para actualizar un item (PUT)
function updateItem(id, name, description) {
  if (!token) {
    alert("Debes iniciar sesión para actualizar un item.");
    window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
  }

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
    },
    body: JSON.stringify({ name, description })
  })
    .then(response => response.json())
    .then(() => {
      getItems(); // Actualizamos la lista de items
      document.getElementById('item-form').reset(); // Limpiamos el formulario
      document.getElementById('item-form').dataset.id = ''; // Limpiamos el ID guardado
    })
    .catch(error => console.error('Error al actualizar el item:', error));
}

// Función para eliminar un item (DELETE)
function deleteItem(id) {
  if (!token) {
    alert("Debes iniciar sesión para eliminar un item.");
    window.location.href = '../index.html'; // Redirigir al login si no hay token
    return;
  }

  if (confirm('¿Estás seguro de que quieres eliminar este item?')) {
    fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
      }
    })
      .then(() => getItems()) // Actualizamos la lista de items después de eliminar
      .catch(error => console.error('Error al eliminar el item:', error));
  }
}

// Modificamos la función editaritem para trabajar con updateItem
function editaritem(item) {
  document.getElementById('name').value = item.name;
  document.getElementById('description').value = item.description;
  document.getElementById('item-form').dataset.id = item._id;
}

// Limpiar items y formulario
document.getElementById('limpiar_items').addEventListener('click', (e) => {
  e.preventDefault();
  const itemsLists = document.getElementById('items-list');
  itemsLists.innerHTML = '';
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('item-form').dataset.id = '';
});

// Verificar si el usuario es admin (esto es opcional según si el rol está presente en el token)
function isAdmin() {
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decodificar el token
  return decodedToken.role === 'admin'; // Verificar si el rol es admin
}

document.getElementById('obtener_items').addEventListener('click', (e) => {
  e.preventDefault();
  getItems();
  alert("Items obtenidos");
});
