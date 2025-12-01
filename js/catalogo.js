// =======================
//  PRODUCTOS DEL CATÁLOGO
// =======================
const productos = [
    { id: 1, nombre: "Vestido Floral", precio: 120000, imagen: "img/Catalogo/VestidoFloral.jpg" },
    { id: 2, nombre: "Chaqueta de Cuero", precio: 260000, imagen: "img/Catalogo/ChaquetaCuero.jpg" },
    { id: 3, nombre: "Pantalón Casual", precio: 95000, imagen: "img/catalogo/PantalonCasual.jpg" },
    { id: 4, nombre: "Camiseta Básica", precio: 35000, imagen: "img/catalogo/CamisetaBasica.jpg" },
    { id: 5, nombre: "Sudadera Deportiva", precio: 78000, imagen: "img/catalogo/SudaderaDeportiva.jpg" },
    { id: 6, nombre: "Vestido Elegante Noche", precio: 185000, imagen: "img/Catalogo/VestidoEleganteNoche.jpg" },
    { id: 7, nombre: "Chaqueta Jean Oversize", precio: 145000, imagen: "img/Catalogo/ChaquetaJeanOversize.jpg" },
    { id: 8, nombre: "Pantalón Cargo Unisex", precio: 110000, imagen: "img/catalogo/PantalonCargoUnisex.jpg" }
];


// =======================
//  MOSTRAR PRODUCTOS
// =======================
const lista = document.getElementById("listaProductos");

productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("producto-card");

    card.innerHTML = `
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p>$ ${prod.precio.toLocaleString()}</p>
        <button class="boton-agregar" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
    `;

    lista.appendChild(card);
});


// =======================
//  AGREGAR AL CARRITO
// =======================
function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = productos.find(x => x.id === id);
    let existe = carrito.find(x => x.id === id);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarNotificacion("Producto agregado");  
}


// =======================
//  NOTIFICACIÓN
// =======================
function mostrarNotificacion(texto) {
    const noti = document.getElementById("notificacion");

    if (!noti) return;

    noti.innerText = texto;
    noti.style.display = "block";

    setTimeout(() => {
        noti.style.display = "none";
    }, 1200);
}


// =======================
//  SISTEMA DE ROLES
// =======================
document.addEventListener("DOMContentLoaded", () => {

    const carritoLink = document.getElementById("carritoLink");
    const adminLink = document.getElementById("adminLink");
    const loginLink = document.getElementById("loginLink");
    const roleSelector = document.getElementById("rolSelector");

    let currentRole = localStorage.getItem("rol") || "invitado";

    if (roleSelector) roleSelector.value = currentRole;

    function actualizarHeaderSegunRol() {

        if (carritoLink) carritoLink.style.display = "none";
        if (adminLink) adminLink.style.display = "none";
        if (loginLink) loginLink.style.display = "none";

        switch (currentRole) {
            case "invitado":
                if (loginLink) loginLink.style.display = "inline-block";
                break;

            case "cliente":
                if (carritoLink) carritoLink.style.display = "inline-block";
                break;

            case "admin":
                if (adminLink) adminLink.style.display = "inline-block";
                break;
        }
    }

    if (roleSelector) {
        roleSelector.addEventListener("change", e => {
            currentRole = e.target.value;
            localStorage.setItem("rol", currentRole);
            actualizarHeaderSegunRol();
        });
    }

    actualizarHeaderSegunRol();
});
