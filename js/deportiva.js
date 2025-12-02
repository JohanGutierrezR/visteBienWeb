// =======================
//  PRODUCTOS DEL CATÁLOGO
// =======================
const productos = [
    { id: 1, nombre: "Sudadera Azul", precio: 78000, imagen: "img/Catalogo Deportiva/deportiva.jpg" },
    { id: 2, nombre: "Buzo Cafe", precio: 70000, imagen: "img/Catalogo Deportiva/deportivo1.jpg" },
    { id: 3, nombre: "Legis Rosa", precio: 50000, imagen: "img/Catalogo Deportiva/deportiva2.jpg" },
    { id: 4, nombre: "Legis Gris", precio: 50000, imagen: "img/Catalogo Deportiva/deportiva3.jpg" },
    { id: 5, nombre: "Sudadera Deportiva", precio: 78000, imagen: "img/Catalogo/SudaderaDeportiva.jpg" },
    { id: 6, nombre: "Sudadera Mujer", precio: 80000, imagen: "img/Catalogo Deportiva/deportiva4.jpg" },
    { id: 7, nombre: "Chaqueta Deportiva", precio: 60000, imagen: "img/Catalogo Deportiva/deportiva5.jpg" },
    { id: 8, nombre: "Sudadera Buzo", precio: 80000, imagen: "img/Catalogo Deportiva/deportiva6.jpg" }
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
