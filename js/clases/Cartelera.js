/* clases a utilizar en el proyecto cine */

/* class Cartelera {
    constructor(funciones, dia, mes) {
        this.funciones = funciones;
        this.dia = dia;
        this.mes = mes;
    }

    agregarFuncion(funcion){
        this.funciones.push(funcion);
    }

    mostarCarteleraxFecha(dia, mes) {
        //pregunto que exita una cartelera esa "fecha"
        if (this.dia == dia && this.mes == mes) {
            // recorro el array de funciones
            for (let funcion of this.funciones) {
                //pregunto si hay alguna funcion el dia que me pasaron
                // Imprimo
                if (funcion.dia == dia) {
                    console.log(
                        `Dia: ${funcion.dia},\n
                    Hora: ${funcion.hora},\n 
                    Pelicula: ${funcion.pelicula.nombre},\n                      
                    Precio: ${funcion.precio},\n
                    Promocion: ${funcion.promocion}
                    Disponibilidad: ${funcion.disponibilidad}`
                    );
                } else {
                    //Sino muestro msj de que no se encontraron en la fecha indicada
                    console.log(
                        `No se encontraron funciones \n
                        para el dia ${dia}\n
                        del mes ${mes}`
                    );
                }
            }
        }
    }

    mostrarTodaLaCartelera() {
        //recorro todas las funciones para mostrar
        for (let funcion of this.funciones) {
            console.log(
                `Dia: ${funcion.dia},\n 
            Pelicula: ${funcion.pelicula.nombre},\n 
            Hora: ${funcion.hora},\n 
            Precio: ${funcion.precio},\n 
            Disponibilidad: ${funcion.disponibilidad}`
            );
        }
    }
} */
