// index.js
document.addEventListener('DOMContentLoaded', () => {
    const roleSelector = document.getElementById('rolSelector');
    const carritoLink = document.getElementById('carritoLink');
    const adminLink = document.getElementById('adminLink');
    const loginLink = document.getElementById('loginLink');
    const adminPanel = document.getElementById('adminPanel'); // panel visible solo para admin

    // Rol por defecto
    let currentUser = {
        name: "Invitado",
        role: "invitado"
    };

    // Actualiza la visibilidad según el rol
    function updateUI() {
        // Ocultar todo por defecto
        carritoLink.style.display = 'none';
        adminLink.style.display = 'none';
        loginLink.style.display = 'inline-block';
        if (adminPanel) adminPanel.style.display = 'none';

        switch (currentUser.role) {
            case 'admin':
                adminLink.style.display = 'inline-block';
                if (adminPanel) adminPanel.style.display = 'block';
                break;
            case 'cliente':
                carritoLink.style.display = 'inline-block';
                break;
            case 'invitado':
            default:
                // Solo login visible
                break;
        }
    }

    // Cambia el rol desde el selector
    roleSelector.addEventListener('change', (e) => {
        const selectedRole = e.target.value;

        switch (selectedRole) {
            case 'admin':
                currentUser = { name: "Administrador", role: "admin" };
                break;
            case 'cliente':
                currentUser = { name: "Cliente", role: "cliente" };
                break;
            default:
                currentUser = { name: "Invitado", role: "invitado" };
                break;
        }

        updateUI();
    });

    updateUI(); // Inicial
});

document.addEventListener('DOMContentLoaded', () => {
    const selector = document.getElementById('catalogoSelector');

    selector.addEventListener('change', function () {
        const destino = this.value;
        if (destino !== "") {
            window.location.href = destino;
        }
        
        this.value = "";
    });
});
