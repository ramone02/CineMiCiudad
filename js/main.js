/* Main */
/* ---------------------------------------------------------------------------------- */
/* Cartelera */
const carteleraPrincipal = [];



const pelicula1 = new Pelicula(1,"Pulp Fiction", "Drama Policiaco", 140, "2D", "27/03/2022", "../img/pulpfiction.jpg");
const pelicula2 = new Pelicula(2, "Fight Club", "Suspenso/Drama", 120, "2D", "03/02/2022", "../img/fightclub.jpeg");
const pelicula3 = new Pelicula(3, "Ex-Machina", "Ficcion", 90, "3D", "15/01/2022", "../img/exmachine.jpg");
const pelicula4 = new Pelicula(4, "Interestellar", "Ficcion", 120, "2D" , "12/02/2022", "../img/interestellar.jpg");
const pelicula5 = new Pelicula(5, "CBGB", "Ficcion", 120, "2D" , "12/02/2022", "../img/cbgb.jpg");
const pelicula6 = new Pelicula(6, "Jujutsu Kaisen 0", "Anime", 100, "3D" , "12/02/2022", "../img/jujutsu0.jpeg");

/* Creo Funciones y les agrego Peliculas */
const funcion1 = new Funcion(1, "lunes", "18:00", pelicula1, 300, true);
const funcion2 = new Funcion(2, "lunes", "20:00", pelicula2, 300, true);
const funcion3 = new Funcion(3, "martes", "20:00", pelicula2, 300, true);
const funcion4 = new Funcion(4, "miercoles", "22:00", pelicula3, 300, true);
const funcion5 = new Funcion(5, "jueves", "18:00", pelicula6, 300, false);
const funcion6 = new Funcion(6, "jueves", "18:00", pelicula4, 300, false);
const funcion7 = new Funcion(7, "viernes", "20:00", pelicula1, 300, false);
const funcion8 = new Funcion(8, "viernes", "18:00", pelicula5, 300, false);
const funcion9 = new Funcion(9, "sabado", "22:00", pelicula2, 300, true);
const funcion10 = new Funcion(10, "domingo", "18:00", pelicula3, 300, false);

/* Agrego Funciones a la Cartelera */
carteleraPrincipal.push(funcion1);
carteleraPrincipal.push(funcion2);
carteleraPrincipal.push(funcion3);
carteleraPrincipal.push(funcion4);
carteleraPrincipal.push(funcion5);
carteleraPrincipal.push(funcion6);
carteleraPrincipal.push(funcion7);
carteleraPrincipal.push(funcion8);
carteleraPrincipal.push(funcion9);
carteleraPrincipal.push(funcion10);