/* Probando el DOM */

/* let funcion = document.querySelector("#card");
console.log("Prbando Dom");
console.log(funcion.innerHTML); */

const divCartelera = document.getElementById("divCartelera");/* 
console.log(divCartelera.innerHTML);  */

function agregarBotoneraSemana(){
    //Traigo mi elemento donde voy a crear los botones
    const divBotoneraSemana = document.querySelector("#botoneraSemana");
    //array de dias
    const dias = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];
    //Voy a agregar un boton por cada día - En un futuro sera boton "Hoy", segun la fecha que entres(dia)  
    dias.forEach((dia)=>{
        //Crear siempre los elementos dentro del forEach - Afuera no funciona, imprime/usa siempre el ultimo
        const botoneraSemana = document.createElement("button");
        botoneraSemana.className = `btn btn-outline-light`;
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
            let diaIngresado = e.target.value
            console.log(diaIngresado);
            llenarCarteleraxDia(diaIngresado);
        }
        
    })
}

function llenarCarteleraxDia(diaIngresado){
    const carteleraxDia = carteleraPrincipal.filter((funcion) => funcion.dia === diaIngresado);
    /* console.log("aca"); */
    llenarCarteleraMain(carteleraxDia);
}

function agregarPeliculaCarrito(idFuncion){
    const entrada = carteleraPrincipal.find((funcion) => funcion.id === idFuncion);
    carrito.push({ Pelicula: entrada.pelicula.nombre, Dia: entrada.dia, Hora: entrada.hora, Precio: entrada.precio, Promocion: entrada.promocion, cantidad: 1 });
    carrito.forEach((carrito) => {
        console.log(carrito);
    })
}

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
        /* console.log("acacartelera") */
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

agregarBotoneraSemana();
llenarCarteleraMain(carteleraPrincipal);


