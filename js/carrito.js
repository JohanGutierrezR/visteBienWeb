// =======================
//   FUNCIONES BASE
// =======================
function cargarCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


// =======================
//   MOSTRAR CARRITO
// =======================
function mostrarCarrito() {
    const contenedor = document.getElementById("carritoContainer");
    const totalPagar = document.getElementById("totalPagar");
    const carritoCantidad = document.getElementById("carritoCantidad");

    let carrito = cargarCarrito();

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {

        let subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="producto-carrito">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                
                <div class="info-producto">
                    <h3>${producto.nombre}</h3>
                    <p>Precio unidad: $${producto.precio.toLocaleString()}</p>
                    <p>Cantidad: 
                        <button onclick="restar(${index})"> - </button>
                        <b>${producto.cantidad}</b>
                        <button onclick="sumar(${index})"> + </button>
                    </p>
                    <p>Subtotal: <b>$${subtotal.toLocaleString()}</b></p>
                </div>

                <button class="borrar-btn" onclick="borrarProducto(${index})">Eliminar</button>
            </div>
        `;
    });

    totalPagar.textContent = "$" + total.toLocaleString();
    carritoCantidad.textContent = carrito.reduce((s, p) => s + p.cantidad, 0);
}


// =======================
//   SUMAR / RESTAR
// =======================
function sumar(index) {
    let carrito = cargarCarrito();
    carrito[index].cantidad++;
    guardarCarrito(carrito);
    mostrarCarrito();
    actualizarContadorCarrito();
}


function restar(index) {
    let carrito = cargarCarrito();

    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
    } else {
        carrito.splice(index, 1);
    }

    guardarCarrito(carrito);
    mostrarCarrito();
}


// =======================
//   BORRAR PRODUCTO
// =======================
function borrarProducto(index) {
    let carrito = cargarCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    mostrarCarrito();
}


// =======================
//   INICIAR
// =======================
document.addEventListener("DOMContentLoaded", mostrarCarrito);
