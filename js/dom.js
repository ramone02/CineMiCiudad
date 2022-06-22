
const divCartelera = document.getElementById("divCartelera");
const buscador = document.getElementById("buscador");
const btnMain = document.getElementById("cargarMainCartelera");
const tablaCarrito = document.getElementById("tablaCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");


/* aplico filtrado de busqueda por DIA - NOMBRE PELICULA Y HORA */
buscador.addEventListener("input", (e) => {
    let input = e.target.value;
    // no me estaria funcionando armar el filter en varias lineas - lo dejo asi por ahora (puede mejorar)
    const filtrado = carteleraPrincipal.filter((funcion) => funcion.dia.toLowerCase().includes(input) || funcion.pelicula.nombre.toLowerCase().includes(input) || funcion.hora.includes(input));
    llenarCarteleraMain(filtrado);
});

/* function buscadoCartelera(input){
    console.log(input);
} */

/* cargo un grupo de botones de filtrado por "DIA" - le paso un array con los dias de la semana */
function agregarBotoneraSemana(){
    //Traigo mi elemento donde voy a crear los botones
    const divBotoneraSemana = document.querySelector("#botoneraSemana");
    //array de dias
    const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    //Voy a agregar un boton por cada día - En un futuro sera boton "Hoy", segun la fecha que entres(dia)  
    dias.forEach((dia)=>{
        //Crear siempre los elementos dentro del forEach - Afuera no funciona, imprime/usa siempre el ultimo
        const botoneraSemana = document.createElement("button");
        botoneraSemana.className = `btn btn-outline-dark `;
        //Con setAtributt le agrego el tipo Button
        botoneraSemana.setAttribute(`type`,`button`);
        // agreggo un dia por "día", asi puedo manejarlo con eventos
        botoneraSemana.setAttribute(`id`, `btn-${dia}`);
        botoneraSemana.setAttribute(`value`, `${dia}`);
        botoneraSemana.innerHTML = `${dia}`;
        //agrego todo el boton al html
        divBotoneraSemana.appendChild(botoneraSemana);
        //me traigo ese boton que acabo insertar en el html 
        const btnDia = document.getElementById(`btn-${dia}`);
        //le agrego el evento onclick - para que cuando lo apriete me traiga esas peliculas de ese dia
        /* btnDia.onclick = (e) => {
            let diaIngresado = llenarCarteleraxDia(e.target.value);
            llenarCarteleraxDia(diaIngresado);
        } */
        btnDia.onclick = (e) => {
            let diaIngresado = e.target.value;
            llenarCarteleraxDia(diaIngresado);
        }        
    })
    //agrego boton para volver a cargar la cartelera por defecto
    btnMain.onclick = () => llenarCarteleraMain(carteleraPrincipal);
}

/* funcion por la que filtro por dia y cargo la cartelera con ese filtro */
function llenarCarteleraxDia(diaIngresado){
    const carteleraxDia = carteleraPrincipal.filter((funcion) => funcion.dia === diaIngresado);
    llenarCarteleraMain(carteleraxDia);
}

/* funcion para cargar un objeto "producto" al carrito */
function agregarPeliculaCarrito(idFuncion){
    const entrada = carteleraPrincipal.find((funcion) => funcion.id === idFuncion);
    carrito.push({id: idFuncion, pelicula: entrada.pelicula.nombre, dia: entrada.dia, hora: entrada.hora, precio: entrada.precio, promocion: entrada.promocion, cantidad: 1, total:0 });
    mostrarCarrito();
    actualizarCarrito();
    //local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    //intente hacerle uno por uno, agregue id, pero creo que es mas facil agregar directamente el array "carrito"
    /* for (const entrada of carrito) {
        localStorage.setItem(`${entrada.id}`, JSON.stringify(entrada));
    } */
    /* carrito.forEach((entrada)=>{
        localStorage.setItem(`item${index}`, JSON.stringify(entrada));
    }) */
}

/*  Recupero mi array del carrito que fui "guardando" en Local Storage  */
function recuperarCarrito(){
    let carritoLs = JSON.parse(localStorage.getItem("carrito"));
    if (carritoLs) {
        for (const entrada of carritoLs) {
            //error aca, me recupera todos -1, el ultimo elemento no me lo muestra, pero si lo trae D:
            console.log(entrada);            
            carrito.push(entrada);
            actualizarCarrito();
            mostrarCarrito();
        }
        /* carritoLs.forEach((entrada)=>{
            mostrarCarrito();
            carrito.push(entrada);
            actualizarCarrito();
        }); */
    }else{
        console.log("Error local storage");
    }
}

/* Mostrar carrito */
function mostrarCarrito(){
    const tablaDatos = document.createElement("tbody");
    const btnTotal = document.createElement("div");
    btnTotal.className = "d-flex flex-row-reverse" ;
    carrito.forEach((producto)=>{
        tablaDatos.innerHTML = `<tr>
                                    <td>${producto.dia}</td>
                                    <td>${producto.hora}</td>
                                    <th>${producto.pelicula}</th>
                                    <td>${producto.precio}</td>
                                    <td><input class="w-50" id="cantidadEntrada" type="number" value="${producto.cantidad}" min="1" max="5"></input></td>
                                    <td><button class="btn btn-danger" id="btnEliminarProducto${producto.id}">X</button></td>
                                </tr> `    
        tablaCarrito.appendChild(tablaDatos);
        //agrego evento eliminar producto    
        const btnEliminarProducto = document.getElementById(`btnEliminarProducto${producto.id}`);
        btnEliminarProducto.onclick = (e) =>{
            //aplico operador ternario - Elimino el elemento "fila" del html - Tabla
            confirm("Esta seguro que desea eliminar?") ? btnEliminarProducto.closest("tr").remove() : alert("error");
            //elimino el producto del array Carrito
            borrarProductoCarrito(e.target.value);
            actualizarCarrito();
            //actualizo Local Storage
            localStorage.setItem("carrito", JSON.stringify(carrito));            
        }

        // agrego evento cambiar cantidad de entrada
        const inputCantidad = document.getElementById("cantidadEntrada");
        inputCantidad.onchange = (e) =>{

        };
    });
}

/* Cambiar Cantidad de Entradas */
function cambiarCantidadEntradas(cantidad){
}

/* Actualizar Carrito */ 
function actualizarCarrito(){
    contadorCarrito.innerText =  carrito.length;
    precioTotal.innerText = `Total: $ ${carrito.reduce((acc, e) => acc + e.precio, 0)}`;
}

/* Quitar producto del Carrito */
function borrarProductoCarrito(producto){
    //obtengo el index del objeto a borrar
    let index = carrito.indexOf(producto);
    //borro el prodcuto del array- solo uno
    carrito.splice(index, 1);
}

/* funcion principal donde inyecto las cards en mi "cartelera principal" - agreggo clases y botones de compra por cada card*/
function llenarCarteleraMain(cartelera){
    //limpiar el main div
    divCartelera.innerHTML = "";    
    cartelera.forEach((funcion) => {
        //Creo la etiqueta div(card) dentro de mi main #divCartelera
        const cardPelicula = document.createElement("div");
        //Le añado las clases correspondientes a mi "div card"
        cardPelicula.className = "card producto m-3 bg-secondary bg-opacity-75 text-white";        
        //E inserto la informacion de cada pelicula del array Cartelera
        cardPelicula.innerHTML = `<div class="align-items-center text-center">
                <h4 class="pt-2">${funcion.pelicula.nombre}</h4>
                    <img src="${funcion.pelicula.imagen}" alt="Banner" class="rounded pt-2" width="228">
                    <!-- Informacion -->
                    <div class="mt-2 ps-4 text-start info">
                        <span class="d-block">${funcion.dia}</span>
                        <span class="d-block">Horario - ${funcion.hora} Hs</span>
                    </div>
                    <!-- Precio -->
                    <div class="precio mt-2 ps-4 text-start">
                        <span class="d-block">Entrada General</span>
                        <span class="">$${funcion.precio}</span>                        
                    </div>
                    <button type="button" class="btn btn-success btn-sm" id="funcion-${funcion.id}-${funcion.dia}" value="${funcion.id}">Comprar</button>
                </div>`;
        divCartelera.appendChild(cardPelicula);
        const btnPelicula = document.getElementById(`funcion-${funcion.id}-${funcion.dia}`);
        btnPelicula.onclick = (e) => {
            agregarPeliculaCarrito(parseInt(e.target.value));
        }
    })
}

/* let buttonDia = document.getElementById("btn-lunes");
buttonDia.onclick = (e) => {
    e.stopPropagation();
    llenarCarteleraxDia(e.target.value);
} */

/* Invocaciones funcionales basicas de la aplicacion */

agregarBotoneraSemana();
llenarCarteleraMain(carteleraPrincipal);
recuperarCarrito();


