//async convierte esta funcion en una asicrona (nodeclarada)
//declarada - async function getData(){}
const cartelera = document.getElementById("divEstrenos");
const loader = document.getElementById("loader");
const $links = document.getElementById("links");

/*  */
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async () => {
    try {
        /* loader.innerHTML = `<img class="loader" src="../img/loader.svg" alt="Cargando..."></img>`; */
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=aa4d1dcb34ae6a710cc1dfbc9f983e9c&language=es&page=${pagina}`);
        const peliculas = await respuesta.json();
        let $prevLink, $nextLink;
        console.log(peliculas);
        //Si ocurre un error en la solicitud a la api lanzo un error
        if (!(respuesta.ok)) throw { status: res.status, statusText: res.statusText };
        //
        cartelera.innerHTML = "";
        peliculas.results.forEach((pelicula) => {
            //Creo la etiqueta div(card) dentro de mi main #divCartelera
            const card = document.createElement("div");
            //Le añado las clases correspondientes a mi "div card"
            card.className = "card";
            //E inserto la informacion de cada pelicula del array Cartelera
            card.innerHTML = `<div class="face front">
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Banner">
                                </div>
                                <div class="face back">
                                    <h3>${pelicula.original_title}</h3>
                                    <p>${pelicula.overview}</p>
                                </div>
                                `;
            cartelera.appendChild(card);
        });
    } catch (error) {
        let message = error.statusText || "Ocurrío un Error";
        const errorApi = document.getElementById("errorApi");
        errorApi.innerHTML = `<b>Error ${error.status} - ${message}</b>`;
    }
}

/* const cotizacionDolar = async () => {
    
        const r = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial");
        console.log(r);
        return r.json();   
} */



/* const cargarEstrenos = async () => {
    const peliculas = await cargarPeliculas();
    cartelera.innerHTML = "";
    peliculas.forEach((pelicula) => {
        //Creo la etiqueta div(card) dentro de mi main #divCartelera
        const card = document.createElement("div");
        //Le añado las clases correspondientes a mi "div card"
        card.className = "card";
        //E inserto la informacion de cada pelicula del array Cartelera
        card.innerHTML = `<div class="face front">
                                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Banner">
                                </div>
                                <div class="face back">
                                    <h3>${pelicula.original_title}</h3>
                                    <p>${pelicula.overview}</p>
                                </div>
                                `;
        cartelera.appendChild(card);
    });
} */

document.addEventListener("DOMContentLoaded", cargarPeliculas());
/* const mostrar = async () => {
    const r = await cotizacionDolar();
    console.log(r);
} 
mostrar(); */
/* datosDolar(); */
