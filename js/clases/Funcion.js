class Funcion {
    constructor(id, dia, hora, pelicula, precio) {
        this.id = id;
        this.dia = dia;
        this.hora = hora;
        this.pelicula = pelicula;        
        this.precio = precio;
        this.promocion = false;
        this.disponibilidad = true;
    }

    setPromocion() {
        //pregunto si no esta en promocion, si no esta, entra en promo
        if (!this.isPromocion()) {
            this.promocion = true;
            alert("Funcion puesta en promo");
        } else {
            //doy un mensaje que la pelicula ya esta en promo
            alert("La funcion ya se encuentra en promocion");
        }
    }

    isPromocion() {
        if (this.promocion == true) {
            alert(`La funcion de la 
            ${this.pelicula.nombre} el dia 
            ${this.dia} a las ${this.hora}
            esta en promocion`);
            return true;
        } else {
            alert(`La funcion de la 
            ${this.pelicula.nombre} el dia 
            ${this.dia} a las ${this.hora}
            NO esta en promocion`);
            return false;
        }
    }

    /* setFuncion(dia, hora, pelicua, precio){
        if (condition) {
            
        }
    } */
}
