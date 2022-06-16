/* Main */
/* ---------------------------------------------------------------------------------- */
/* Cartelera */

const carteleraPrincipal = [];

// ver toda la cartelera de la semana
function verCartelera() {
    carteleraPrincipal.forEach((funcion) => {
        console.log(`Dia: ${funcion.dia} - Hora: ${funcion.hora}`);
        console.log(`Pelicula: ${funcion.pelicula.nombre}`);
        console.log(`Precio: ${funcion.precio}`);
    });
}

// ver funciones por dia pasado por parametro
function verCarteleraxDia(diaIngresado) {
    const funcion = carteleraPrincipal.filter((funcion) => funcion.dia === diaIngresado);
    funcion.forEach((funcion) => {
        console.log(`Dia: ${funcion.dia} - Hora: ${funcion.hora}`);
        console.log(`Pelicula: ${funcion.pelicula.nombre}`);
        console.log(`Precio: ${funcion.precio}`);
    });
}

//funcion para ver pelicula que tengan entradas o este dispob¿nible -  en un futuro aplicar propiedad cantidad entradas y descontar cada vez que se venda, de la funcion
// Podria pasarle algun valor pero que sea opcional, si me pasa el nombre de la pelicula le devuelvo todas las funciones d ela misma que esten disponibles
// Sino le devuelvo "TODAS" las peliculas con entradas disponibles
function verPeliculasDisponibles() {
    const peliculasDisponibles = carteleraPrincipal.filter((funcion) => funcion.disponibilidad === true);
    peliculasDisponibles.forEach((funcion) =>{
        console.log(`Pelicula: ${funcion.pelicula.nombre} \n Dia: ${funcion.dia} - Hora: ${funcion.hora}`);
        console.log(`Entradas Disponibles: Si \n Precio: ${funcion.precio}`)
    })
}

//funcion para adquirir entrada por dia - hora - pelicula
function adquirirEntrada(dia, hora, pelicula){
    //busco la funcion en la cartelera que tenga ese dia hora y esa pelicula, deberia preguntar si esta disponible tambien
    const entrada = carteleraPrincipal.find((funcion) => funcion.dia === dia && funcion.hora === hora && funcion.pelicula.nombre === pelicula);
    
    //lo dejo comentado por si tengo que debuggear otra vez
    console.log("Entrada aca");

    //pusheo a mi carrito esa "Entrada" rearmada con otras propiedades - pienso en crear un objeto "Entrada"
    carrito.push({Pelicula: entrada.pelicula.nombre, Dia: entrada.dia, Hora: entrada.hora, Precio: entrada.precio, Promocion: entrada.promocion});
    console.log("Pase por aqui");    

    //Aca dejo como lo estaba haciendo no funcionaba del todo, me agregaba una funcion si la encontro pero luego seguia recorriendo y lo llenaba con "vacio"
    /* const entrada = cartelera.map((funcion)=>{
        if (funcion.dia == dia && funcion.hora == hora && funcion.pelicula.nombre == pelicula) {
            return {Pelicula: funcion.pelicula.nombre, Dia: funcion.dia, Hora: funcion.hora, Precio: funcion.precio, Promocion: funcion.promocion}
        }else{
            console.log(`No se ha encontrado una funcion para la Pelicula: ${pelicula}\n El día: ${dia}\n A la hora: ${hora}`);
            console.log(`Intente nuevamente`);
        }
    }); */
}


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

/* ---------------------------------------------------------------------------------- */
/* Carrito */
let total = 0;
const carrito = [];

/* function mostrarCarrito(){
    carrito.forEach((entrada)=>{
        console-log(`Usted tiene entrada para:\n ${entrada.pelicula.nombre}`);
    })
} */

/* ---------------------------------------------------------------------------------- */

function main() {
    alert("Bienvenido al Cine");
    do {
        let opcion = prompt(
            "Ingrese una opcion: \n 1. Mostrar cartelera \n 2. Ver funciones x Día \n 3. Adquirir Entrada \n 4. Ver mi Carrito - Proceder al Pago");
        switch (Number(opcion)) {
            case 1:
                //Muestro toda la cartelera - Por ahora por semana
                verCartelera();
                break;
            case 2:
                //Busco y muestro todas las funciones disponibles "x" día
                let diaFuncion = prompt("Ingrese el dia de la funcion: ");
                verCarteleraxDia(diaFuncion);
                break;
            case 3:
                let dia, hora, pelicula;
                //Muestros las funciones disponibles para elegir una bien                
                verPeliculasDisponibles();
                // Pido los datos - Por ahora todo en String - proximamento validaciones, entero, vacios, expreciones regulares, etc
                dia = prompt("Ingrese el dia que desea adquirir entrada: ","Lunes - Martes - Etc");
                hora = prompt("Ingrese la hora que desea adquirir entrada: ", "16:00 - 20:00 - 22:00");
                pelicula = prompt("Ingrese el nombre de la Pelicula que desea adquirir entrada", "Interestellar - Fight Club");
                //Llamo a mi funcion
                adquirirEntrada(dia, hora, pelicula);
                //Debugg
                console.log("Ya cargue la entrada");
                console.log(carrito);
                /* Hacer funcion para comprar productos -  mostrarlos, etc (Lo mismo que con las entradas) 
                Y sumarlo al carrito
                Despues sumar todo lo del carrito y procedeer al pago, antes ver el tema de las cantidad de entradas, hacerlo desde el carrito(sumarlas o  (*) cantidad )*/
                break;
            default:
                console.log("Opcion no valida");
                break;
        }
    } while (confirm("Desea continuar?"));
}
/* main(); */
/* cartelera.mostrarTodaLaCartelera(); */
