const url = 'http://localhost:3000/api/auth/login'; // URL del backend

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) // El rol no es necesario aquí
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Almacena el token
            localStorage.setItem('user', JSON.stringify(data.usuario)); // Guardar los datos del usuario (nombre, email, rol)
            
            // Decodificar el token JWT para obtener el rol del usuario
            const decodedToken = JSON.parse(atob(data.token.split('.')[1])); // Decodifica el token JWT
            const userRole = decodedToken.role; // Obtiene el rol del usuario

            // Redirigir a la página correspondiente dependiendo del rol
            if (userRole === 'admin') {
                window.location.href = './html/dashboard.html'; // Redirigir al dashboard del admin
            } else {
                window.location.href = './html/item.html'; // Redirigir a la página de los items
            }
        } else {
            alert(data.message); // Muestra el mensaje de error
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al iniciar sesión');
    }
});



