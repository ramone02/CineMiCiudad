//async convierte esta funcion en una asicrona (nodeclarada)
//declarada - async function getData(){}
const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=aa4d1dcb34ae6a710cc1dfbc9f983e9c&language=es');
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.log(error);
    }
}

/* const cotizacionDolar = async () => {
    
        const r = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial");
        console.log(r);
        return r.json();   
} */

const cartelera = document.getElementById("divEstrenos");

const cargarEstrenos = async () => {
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
                                    <span>Entrada General</span>
                                    <span>$${Math.floor(Math.random() * (500 - 1000) + 1000)}</span>
                                </div>
                                `;
        cartelera.appendChild(card);
    });
}

cargarEstrenos();
const mostrar = async () => {
    const r = await cotizacionDolar();
    console.log(r);
} 
mostrar();
/* datosDolar(); */
