// =======================
//  PRODUCTOS DEL CATÁLOGO
// =======================
const productos = [
    { id: 1, nombre: "Camiseta Azul Oscuro", precio: 35000, imagen: "img/Catalogo Camisas y Camisetas/camisa1.jpg" },
    { id: 2, nombre: "Camisas Varios Colores", precio: 60000, imagen: "img/Catalogo Camisas y Camisetas/camisa2.jpg" },
    { id: 3, nombre: "Camisa Polo", precio: 60000, imagen: "img/Catalogo Camisas y Camisetas/camisa3.jpg" },
    { id: 4, nombre: "Camiseta Básica", precio: 35000, imagen: "img/catalogo/CamisetaBasica.jpg" },
    { id: 5, nombre: "Camiseta Negra Hombre", precio: 35000, imagen: "img/Catalogo Camisas y Camisetas/camisa4.jpg" },
    { id: 6, nombre: "Camiseta Negra Mujer", precio: 30000, imagen: "img/Catalogo Camisas y Camisetas/camisa5.jpg" },
    { id: 7, nombre: "Camisa Mujer Rojo", precio: 60000, imagen: "img/Catalogo Camisas y Camisetas/camisa6.jpg" },
    { id: 8, nombre: "Camiseta con Estanpado", precio: 45000, imagen: "img/Catalogo Camisas y Camisetas/camisa7.jpg" }
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
