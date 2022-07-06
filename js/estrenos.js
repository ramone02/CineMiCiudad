//async convierte esta funcion en una asicrona (nodeclarada)
//declarada - async function getData(){}
const cargarPeliculas = async () => {
    try {
        const respuesta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=aa4d1dcb34ae6a710cc1dfbc9f983e9c&language=es');
        const datos = await respuesta.json();
        /* datos.results.forEach((pelicula)=>{
            console.log(pelicula.title);
        }); */
        console.log(datos.results);
        return datos.results;/* 
        cargarEstrenos(datos.results); */

    } catch (error) {
        console.log(error);
    }
}

const cotizacionDolar = async () => {
    try {
        const dolarOficial = await fetch('https://api-dolar-argentina.herokuapp.com/api/dolaroficial', {'mode': 'no-cors'})
            .then((datosOficial) => datosOficial.json())
            .then((data) => console.log(data));
        


        
        /* 
        const dolarBlue = await fetch('https://api-dolar-argentina.herokuapp.com/api/dolarblue');
        const datosBlue = await dolarBlue.json(); */

    } catch (error) {
        console.error(error);
    }
}

const cartelera = document.getElementById("divEstrenos");

const cargarEstrenos = async () => {
    const peliculas = await cargarPeliculas();
    cartelera.innerHTML = "";
    peliculas.forEach((pelicula) => {
        //Creo la etiqueta div(card) dentro de mi main #divCartelera
        const card = document.createElement("div");
        //Le añado las clases correspondientes a mi "div card"
        card.className = "card producto m-3  bg-opacity-50 text-white";
        //E inserto la informacion de cada pelicula del array Cartelera
        card.innerHTML = `<div class="align-items-center text-center">
                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="Banner" class="rounded pt-2" width="250">
                    <h4 class="pt-2">${pelicula.original_title}</h4>
                    <!-- Informacion -->
                    <div class="mt-2 ps-4 text-start info">
                        <span class="d-block">${pelicula.overview}</span>
                        <span class="d-block">Horario -  Hs</span>
                    </div>
                    <!-- Precio -->
                    <div class="precio mt-2 ps-4 text-start">
                        <span class="d-block">Entrada General</span>
                        <!-- Precio aleatorio -->
                        <span class=" btn btn-success-outline">$${Math.floor(Math.random()*(500 - 1000)+ 1000)}</span>                        
                    </div>
                </div>`;
        cartelera.appendChild(card);
    });
}

cargarEstrenos();
cotizacionDolar();
