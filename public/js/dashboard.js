// frontend/public/js/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
    }

    document.getElementById('welcomeMessage').textContent = '¡Bienvenido al Dashboard!';

    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.href = '../index.html';
    });
});