/* Main */

const cartelera = new Cartelera([]);
const pelicula1 = new Pelicula(
    1,
    "Pulp Fiction",
    "Drama Policiaco",
    140,
    "2D",
    "27/03/2022"
);
const pelicula2 = new Pelicula(
    2,
    "Fight Club",
    120,
    "2D",
    "Suspenso/Drama",
    "03/02/2022"
);
const pelicula3 = new Pelicula(
    3,
    "Ex-Machina",
    90,
    "3D",
    "Ficcion",
    "15/01/2022"
);
const pelicula4 = new Pelicula(
    4,
    "Interestellar",
    120,
    "2D",
    "Ficcion",
    "12/02/2022"
);

/* Creo Funciones y les agrego Peliculas */
const funcion1 = new Funcion(1, "Lunes", "18:00", pelicula1, 300);
const funcion2 = new Funcion(1, "Martes", "20:00", pelicula2, 300);
const funcion3 = new Funcion(
    1,
    "Miercoles",
    "22:00",
    pelicula3,
    300,
);
const funcion4 = new Funcion(1, "Jueves", "18:00", pelicula4,300);
const funcion5 = new Funcion(
    1,
    "Viernes",
    "20:00",
    pelicula1,
    300
);
const funcion6 = new Funcion(1, "Sabado", "22:00", pelicula2, 300);
const funcion7 = new Funcion(
    1,
    "Domingo",
    "18:00",
    pelicula3,
    300
);

/* Agrego Funciones a la Cartelera */
cartelera.agregarFuncion(funcion1);
cartelera.agregarFuncion(funcion2);
cartelera.agregarFuncion(funcion3);
cartelera.agregarFuncion(funcion4);
cartelera.agregarFuncion(funcion5);
cartelera.agregarFuncion(funcion6);
cartelera.agregarFuncion(funcion7);
/* ---------------------------------------------------------------------------------- */

cartelera.mostrarTodaLaCartelera();