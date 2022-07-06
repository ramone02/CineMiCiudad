/* ------------- Variables del Dom ----------------------- */
const tablaCarrito = document.getElementById("tablaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const carritoDeCompra = document.getElementById("carritoDeCompras");
const btnMp = document.getElementById("pagarMp");

/* Carrito */
let total = 0;
let carrito = [];

/* // SDK de Mercado Pago
const Mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
    access_token: "TEST-8453804254204179-070217-5b24e17364f98f6b38d95dd38dd4ad85-164578592",
});

// SDK de Mercado Pago
const mercadopago = new MercadoPago('TEST-b9dc0b20-449a-4cdd-a110-91cf7726ab46', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});
const preference = {
    items: []
};

btnMp.addEventListener("click", () => {
    $('#btnMp').attr("disabled", true);
    const orderData = {
        quantity: carrito.reduce((acc, e) => acc + e.cantidad, 0),
        description: "Entradas para las Peliculas",
        price: carrito.reduce((acc, e) => acc + e.precio * e.cantidad, 0)
    };
    fetch("/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);

            $("#carritoDeCompra").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function () {
            alert("Unexpected error");
            $('#btnMp').attr("disabled", false);
        });
});

function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
        preference: {
            id: preferenceId
        },
        render: {
            container: '#btnMp', // Class name where the payment button will be displayed
            label: 'Pay', // Change the payment button text (optional)
        }
    });
} */

/* const cargarMercadoPago = async() => {
    carrito.forEach(() => {
        preference.items.push(
            {
                id: `${carrito.id}`,
                title: `Entrada para ${carrito.pelicula}`,
                currency_id: "ARS",
                picture_url: "https://www.mercadopago.com/org-img/MP3/home/logomp3.gif",
                description: "Descripción del Item",
                category_id: `Entrada para ${carrito.pelicula} - Para el dia ${carrito.dia} a las ${carrito.hora} hs`,
                quantity: `${carrito.cantidad}`,
                unit_price: `${carrito.precio}`
            }
        );
    });
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
}; */


/* como mostraba el carrito antes
Mostrar carrito
function mostrarCarrito() {
    console.log(`largo del carrito${carrito.length}`);
    carrito.forEach((producto) => {
    const tablaDatos = document.createElement("tr");
    btnTotal.className = "d-flex flex-row-reverse";
        tablaDatos.innerHTML = `
                                    <td>${producto.dia}</td>
                                    <td>${producto.hora}</td>
                                    <th>${producto.pelicula}</th>
                                    <td>${producto.precio}</td>
                                    <td><input class="w-50" id="cantidadEntrada" type="number" value="${producto.cantidad}" min="1" max="5"></input></td>
                                    <td><button class="btn btn-danger" id="btnEliminarProducto${producto.id}" value="${producto.id}">X</button></td> `
        tablaCarrito.appendChild(tablaDatos);
    });
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
} */

const mostrarCarritoCompras = () => {
    tablaCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const filaCarrito = document.createElement("tr");
        filaCarrito.innerHTML = `
                                <td>${producto.dia}</td>
                                <td>${producto.hora}</td>
                                <td>${producto.pelicula}</td>
                                <td>${producto.precio}</td>
                                <td><input class="w-50" id="cantidadEntrada" type="number" value="${producto.cantidad}" min="1" max="5"></input></td>
                                <td><button class="btn btn-danger" id="btnEliminarProducto${producto.id}" onclick="borrarProductoCarrito(${producto.id})">X</button></td>
                                `;
        tablaCarrito.appendChild(filaCarrito);
        //agrego evento eliminar producto    
        /* const btnEliminarProducto = document.getElementById(`btnEliminarProducto${producto.id}`);
        btnEliminarProducto.onclick = (e) => {
            console.log(e.target.value);
            Swal.fire({
                title: "Esta seguro de Eliminar la Entrada?",
                icon: 'warning',
                text: "Usted perdera la reserva de esta Entrada",
                showCancelButton: true,
                confirmButtonText: 'Si, Eliminala',
                cancelButtonText: 'No, Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(e.target.value);
                    borrarProductoCarrito(e.target.value);
                    btnEliminarProducto.closest("tr").remove();
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    actualizarCarrito();
                    Swal.fire({
                        title: 'Eliminada!',
                        text: 'Usted ha Eliminado la Entrada del Carrito',
                        icon: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'Cancelado!',
                        text: 'Su Entrada no ha sido borrada',
                        icon: 'error'
                    });
                }
            });
        } */
    })
}


/* Quitar producto del Carrito */
function borrarProductoCarrito(idProducto) {
    console.log("entrandoa  eliminar");
    Swal.fire({
        title: "Esta seguro de Eliminar la Entrada?",
        icon: 'warning',
        text: "Usted perdera la reserva de esta Entrada",
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminala',
        cancelButtonText: 'No, Cancelar'
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
                text: 'Usted ha Eliminado la Entrada del Carrito',
                icon: 'success'
            });
        } else {
            Swal.fire({
                title: 'Cancelado!',
                text: 'Su Entrada no ha sido borrada',
                icon: 'error'
            });
        }
    });

    /* const entrada = carrito.find((producto) => producto.id === parseInt(idProducto));
    console.log(`Entrada : ${entrada}`);
    let index = carrito.indexOf(entrada);
    console.log(index);
    console.log(carrito) */

    /* carrito[index]?.cantidad > 1
        ? carrito.splice(index, 1)
        && actualizarCarrito()
        && localStorage.setItem("carrito", JSON.stringify(carrito))
        : Swal.fire({
            toast: true,
            icon: 'warning',
            title: "Debe tener entradas en su carrito para poder eliminar",
            position: "top-end"
        }); */
    /* if (carrito[index]?.cantidad > 1) {
        console.log("estoy restando")
        carrito[index].cantidad--;
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }else{
        carrito.splice(index, 1);
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } */
    //obtengo el index del objeto a borrar
    /* let index = carrito.indexOf(indice); */
    //borro el prodcuto del array - solo uno
    /* carrito.splice(index, 1); */
}

/* funcion para cargar un objeto "producto" al carrito */
function agregarPeliculaCarrito(idFuncion) {
    //traigo mi pelicula/ funcion de la cartelera
    const entrada = carteleraPrincipal.find((funcion) => funcion.id === parseInt(idFuncion));
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



/* // agrego evento cambiar cantidad de entrada
        const inputCantidad = document.getElementById("cantidadEntrada");
        inputCantidad.onchange = (e) => {
            producto.cantidad = e.target.value;
            actualizarCarrito();
        }; */