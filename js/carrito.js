/* Carrito */
let total = 0;
let carrito = [];

/* ------------- Variables del Dom ----------------------- */
const tablaCarrito = document.getElementById("tablaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const carritoDeCompra = document.getElementById("carritoDeCompras");

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

    /* TODAS LAS FORMAS QUE INTENTE HACER QUE FUNCIONARA D: */

    /* const index = carrito?.id.indexOf(idFuncion); */
    /* console.log(`indice producto a agregar ${index}`);
    if (index != -1) {
        carrito[index].cantidad++;
    } else {
        const entradaCarrito = {id, pelicula:{nombre}, dia, precio, promocion, cantidad: 1} = entrada;
        carrito.push({ id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1 });
    } */
    
    //Primero pregunto si existe en mi carrito una "entrada/funcion" con ese id, si existe le sumo uno a cantidad si no pusheo "la entrada/funcion" al carrito
    /* carrito.some((entrada) => entrada.id === parseInt(idFuncion)) 
        ? carrito.find((entrada) => entrada.id === parseInt(idFuncion)).cantidad++
        : carrito.push({ id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1}); */
    //local Storage
    /* localStorage.setItem("carrito", JSON.stringify(carrito)); */

    // traigo los datos de la funcion de la entrada a agregar
    /* const entrada = carteleraPrincipal.find((funcion) => funcion.id === idFuncion); */
    // busco dentro del carrito si ya existe una pelicula con ese id
    /* const productoEnCarro = carrito.find((producto) => producto.id === idFuncion);

    productoEnCarro?.id && productoEnCarro.cantidad++ || carrito.push({ id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1, total: 0 }); */
    /* if (productoEnCarro.id) {
        productoEnCarro.cantidad++;
    }else{
        carrito.push({ id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1, total: 0 });
    } */
    /* carrito.push({id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1, total:0 }); */
    /* carrito.forEach((entrada)=>{
        localStorage.setItem(`item${index}`, JSON.stringify(entrada));
    }) */
}

/* Actualizar Carrito */
function actualizarCarrito() {
    //Cuento las cantidad de "entradas" que hay en el carrito
    contadorCarrito.innerText = carrito.reduce((acc, e) => acc + e.cantidad, 0);
    //sumo el precio total
    precioTotal.innerText = `Total: $ ${carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0)}`;
}

verificarStorage();
localStorage.getItem('carrito') && (carrito = JSON.parse(localStorage.getItem('carrito')));
actualizarCarrito();
mostrarCarritoCompras();
