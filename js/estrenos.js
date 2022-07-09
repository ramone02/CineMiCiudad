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


/* const datosDolar = async =>{
    try {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dca2cd2e4amsh20d0eb4d2f386d1p15b6bfjsn0fb3a2bf274c',
                'X-RapidAPI-Host': 'dolarapi.p.rapidapi.com'
            }
        };
        fetch('https://dolarapi.p.rapidapi.com/blue', options)
            .then(response => response.json())
            .then(response => console.log(response));
    } catch (error) {
        console.log(error);
    }
    
} */


const cotizacionDolar = async () => {
    
        const r = await fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial");
        console.log(r);
        return r.json();
        /* const dolarOficial = fetch('https://api-dolar-argentina.herokuapp.com/api/dolaroficial', {'mode': 'no-cors'})
        .then(datos => console.log(datos.json()));     
        
        const dolarBlue = await fetch('https://api-dolar-argentina.herokuapp.com/api/dolarblue');
        const datosBlue = await dolarBlue.json(); */    
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
const mostrar = async () => {
    const r = await cotizacionDolar();
    console.log(r);
} 
mostrar();
/* datosDolar(); */
