/* ------------- Variables del Dom ----------------------- */
const tablaCarrito = document.getElementById("tablaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const carritoDeCompra = document.getElementById("carritoDeCompras");
const modalCarrito = document.getElementById("modalCarrito");
const btnPagar = document.getElementById("btn-pagar");



/* Carrito */
let total = 0;
let carrito = [];

const mostrarCarritoCompras = () => {
    tablaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const filaCarrito = document.createElement("tr");
        filaCarrito.innerHTML = `
                                <td>${producto.dia}</td>
                                <td>${producto.hora}</td>
                                <td>${producto.pelicula}</td>
                                <td>${producto.precio}</td>
                                <td><p class="w-50" id="cantidadEntrada" value="${producto.cantidad}">${producto.cantidad}</p></td>
                                <td><button class="btn btn-danger" id="btnEliminarProducto${producto.id}" onclick="borrarProductoCarrito(${producto.id})">X</button></td>
                                `;
        tablaCarrito.appendChild(filaCarrito);
    })
}


/* Quitar producto del Carrito */
function borrarProductoCarrito(idProducto) {
    Swal.fire({
        title: 'Esta seguro de Eliminar la Entrada?',
        titleText: 'Usted perdera la reserva de esta Entrada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminala',
        confirmButtonColor: '#4f759b',
        cancelButtonText: 'No, Cancelar',
        cancelButtonColor: '#d33'
    }).then((result) => {
        if (result.isConfirmed) {
            const entrada = carrito.find((producto) => producto.id === parseInt(idProducto));
            let index = carrito.indexOf(entrada);
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
                mostrarCarritoCompras();
            } else {
                const btnEliminarProducto = document.getElementById(`btnEliminarProducto${idProducto}`);
                carrito.splice(index, 1);
                btnEliminarProducto.closest("tr").remove();
                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarCarrito();
                mostrarCarritoCompras();
            }
            Swal.fire({
                title: 'Eliminada!',
                titleText: 'Usted ha Eliminado la Entrada del Carrito',
                icon: 'success',
                iconColor: '#198754',
                confirmButtonColor: '#4f759b'
            });
        } else {
            Swal.fire({
                title: 'Cancelado!',
                titleText: 'Su Entrada no ha sido borrada',
                icon: 'error',
                iconColor: '#d33',
                confirmButtonColor: '#4f759b'
            });
        }
    });
}

/* funcion para cargar un objeto "producto" al carrito */
function agregarPeliculaCarrito(idFuncion) {
    //traigo mi pelicula/ funcion de la cartelera
    const entrada = stockCartelera.find((funcion) => funcion.id === parseInt(idFuncion));
    // Evaluamos si el producto ya se encuentra en el carrito o no
    //Evaluo si exite el "producto" dentro del carrito, si existe no lo agrego, le sumo uno a su cantidad- si no existe si lo agrego
    if (carrito.some(producto => producto.id === parseInt(idFuncion))) {
        (carrito.find(producto => producto.id === parseInt(idFuncion))).cantidad++;
    } else {
        carrito.push({ id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1 });
    }
    //piso el local Storage - actualizo el precio y contador de productos y lo inserto en html
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    mostrarCarritoCompras();
}

/* Actualizar Carrito */
function actualizarCarrito() {
    //Cuento las cantidad de "entradas" que hay en el carrito
    contadorCarrito.innerText = carrito.reduce((acc, e) => acc + e.cantidad, 0);
    //sumo el precio total
    precioTotal.innerText = `Total: $ ${carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0)}`;
}

/* Pagar */

btnPagar.onclick = () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Error!',
            titleText: 'Error, asegurese de ingresar Peliculas al Carrito',
            icon: 'error',
            confirmButtonColor: '#4f759b'
        })
    } else {
        localStorage.clear();
        contadorCarrito.innerText = 0;
        precioTotal.innerText = 0;
        actualizarCarrito();
        tablaCarrito.innerHTML = "";
        Swal.fire({
            title: 'Exito!',
            titleText: 'Su compra ha sido realizada, pronto le llegara el QR a su Mail',
            icon: 'success',
            iconColor: '#198754',
            confirmButtonColor: '#4f759b'
        }).then(() => {            
            setTimeout(() => {
                location.reload(true);
            }, 1000);
        });
    }
};

verificarStorage();
localStorage.getItem('carrito') && (carrito = JSON.parse(localStorage.getItem('carrito')));
actualizarCarrito();
mostrarCarritoCompras();
