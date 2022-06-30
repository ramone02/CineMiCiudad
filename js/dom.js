
const divCartelera = document.getElementById("divCartelera");
const buscador = document.getElementById("buscador");
const btnMain = document.getElementById("cargarMainCartelera");
//ver de declaclar los obj sweet alert
// const alertEliminar = Swal.

/* aplico filtrado de busqueda por DIA - NOMBRE PELICULA Y HORA */
buscador.addEventListener("input", (e) => {
    let input = e.target.value;
    const filtrado = carteleraPrincipal.filter((funcion) => funcion.dia.toLowerCase().includes(input) || funcion.pelicula.nombre.toLowerCase().includes(input) || funcion.hora.includes(input));
    llenarCarteleraMain(filtrado);
});

/* cargo un grupo de botones de filtrado por "DIA" - le paso un array con los dias de la semana */
function agregarBotoneraSemana() {
    //Traigo mi elemento donde voy a crear los botones
    const divBotoneraSemana = document.querySelector("#botoneraSemana");
    //array de dias
    const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    //Voy a agregar un boton por cada día - En un futuro sera boton "Hoy", segun la fecha que entres(dia)  
    dias.forEach((dia) => {
        //Crear siempre los elementos dentro del forEach - Afuera no funciona, imprime/usa siempre el ultimo
        const botoneraSemana = document.createElement("button");
        botoneraSemana.className = `btn btn-info`;
        //Con setAtributt le agrego el tipo Button
        botoneraSemana.setAttribute(`type`, `button`);
        // agreggo un dia por "día", asi puedo manejarlo con eventos
        botoneraSemana.setAttribute(`id`, `btn-${dia}`);
        botoneraSemana.setAttribute(`value`, `${dia}`);
        botoneraSemana.innerHTML = `${dia}`;
        //agrego todo el boton al html
        divBotoneraSemana.appendChild(botoneraSemana);
        //me traigo ese boton que acabo insertar en el html 
        const btnDia = document.getElementById(`btn-${dia}`);
        //le agrego el evento onclick - para que cuando lo apriete me traiga esas peliculas de ese dia
        btnDia.onclick = (e) => {
            let diaIngresado = e.target.value;
            llenarCarteleraxDia(diaIngresado);
        }
    })
    //agrego boton para volver a cargar la cartelera por defecto
    btnMain.onclick = () => llenarCarteleraMain(carteleraPrincipal);
}

/* funcion por la que filtro por dia y cargo la cartelera con ese filtro */
function llenarCarteleraxDia(diaIngresado) {
    const carteleraxDia = carteleraPrincipal.filter((funcion) => funcion.dia === diaIngresado);
    llenarCarteleraMain(carteleraxDia);
}



/*  Recupero mi array del carrito que fui "guardando" en Local Storage  */
const recuperarStorage = ((clave) => JSON.parse(localStorage.getItem(clave)));
const verificarStorage = () => recuperarStorage() && (carrito= recuperarStorage());

/* funcion principal donde inyecto las cards en mi "cartelera principal" - agreggo clases y botones de compra por cada card*/
function llenarCarteleraMain(cartelera) {
    //limpiar el main div
    divCartelera.innerHTML = "";
    cartelera.forEach((funcion) => {
        //Creo la etiqueta div(card) dentro de mi main #divCartelera
        const cardPelicula = document.createElement("div");
        //Le añado las clases correspondientes a mi "div card"
        cardPelicula.className = "card producto m-3  bg-opacity-50 text-white";
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
            Swal.fire({
                toast: true,
                icon: 'success',
                title: "Entrada Agregada con exito",
                position: "top-end"
            });
        }
    })
}

/* Invocaciones funcionales basicas de la aplicacion */

/* recuperarCarrito(); */
verificarStorage();
agregarBotoneraSemana();
llenarCarteleraMain(carteleraPrincipal);


