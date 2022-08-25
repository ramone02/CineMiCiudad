
let stockCartelera = [];

const divCartelera = document.getElementById("divCartelera");
const buscador = document.getElementById("buscador");
const btnMain = document.getElementById("cargarMainCartelera");

/* const getPrecioRandom = () => {
    return Math.floor(Math.random() * (500 - 1000) + 1000);
} */

/* aplico filtrado de busqueda por DIA - NOMBRE PELICULA Y HORA */
buscador.addEventListener("input", (e) => {
    let input = e.target.value;
    const filtrado = stockCartelera.filter((funcion) => funcion.dia.toLowerCase().includes(input) || funcion.pelicula.nombre.toLowerCase().includes(input) || funcion.hora.includes(input));
    llenarCarteleraMain(filtrado);
});

/* cargo un grupo de botones de filtrado por "DIA" - le paso un array con los dias de la semana */
function agregarBotoneraSemana() {
    //Traigo mi elemento donde voy a crear los botones
    const divBotoneraSemana = document.querySelector("#botoneraSemana");
    //array de dias
    const dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    //Voy a agregar un boton por cada día - En un futuro sera boton "Hoy", segun la fecha que entres(dia)  
    dias.forEach((dia) => {
        //Crear siempre los elementos dentro del forEach - Afuera no funciona, imprime/usa siempre el ultimo
        const botoneraSemana = document.createElement("button");
        botoneraSemana.className = `btn btn-cta`;
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
    btnMain.onclick = () => llenarCarteleraMain(stockCartelera);
}

/* funcion por la que filtro por dia y cargo la cartelera con ese filtro */
async function llenarCarteleraxDia(diaIngresado) {
    const stockCartelera = await cargarCartelera();
    const carteleraxDia = stockCartelera.filter((funcion) => funcion.dia === diaIngresado);
    llenarCarteleraMain(carteleraxDia);
}

const cargarCartelera = async () => {
    try {
        const respuesta = await fetch('./data/cartelera.json');
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

/*  Recupero mi array del carrito que fui "guardando" en Local Storage  */
const recuperarStorage = ((clave) => JSON.parse(localStorage.getItem(clave)));
const verificarStorage = () => recuperarStorage() && (carrito = recuperarStorage());

/* funcion principal donde inyecto las cards en mi "cartelera principal" - agreggo clases y botones de compra por cada card*/
function llenarCarteleraMain(cartelera) {
    //limpiar el main div
    divCartelera.innerHTML = "";
    cartelera.forEach((funcion) => {
        //Creo la etiqueta div(card) dentro de mi main #divCartelera
        const cardPelicula = document.createElement("div");
        //Le añado las clases correspondientes a mi "div card"
        cardPelicula.className = "card";
        //E inserto la informacion de cada pelicula del array Cartelera
        cardPelicula.innerHTML = `<div class="face front">
                                    <img src="${funcion.pelicula.imagen}" alt="Banner">
                                    <h3>${funcion.dia} - ${funcion.hora}</h3>
                                </div>
                                <div class="face back">
                                    <h3>${funcion.pelicula.nombre}</h3>
                                    <p>${funcion.dia} - ${funcion.hora}</p>
                                    <p>${funcion.pelicula.resumen}</p>
                                    <span>Entrada General</span>
                                    <span>$${funcion.precio}</span>
                                    <button type="button" class="btn btn-comprar btn-sm" id="funcion-${funcion.id}-${funcion.dia}" value="${funcion.id}">Comprar</button>
                                    
                                </div>
        `;
        divCartelera.appendChild(cardPelicula);
        const btnPelicula = document.getElementById(`funcion-${funcion.id}-${funcion.dia}`);
        btnPelicula.onclick = (e) => {
            agregarPeliculaCarrito(parseInt(e.target.value));
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                iconColor: '#198754',
                confirmButtonColor: '#4f759b',
                title: "Entrada Agregada con exito",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
        }
    })
}

/* Invocaciones funcionales basicas de la aplicacion */
/* recuperarCarrito(); */
verificarStorage();
agregarBotoneraSemana();
/* cargarCartelera(); */
const cargarStock = async () => {
    stockCartelera = await cargarCartelera()
    llenarCarteleraMain(await stockCartelera);
};
cargarStock();




