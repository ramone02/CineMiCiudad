class Pelicula {
    constructor(id, nombre, genero, duracion, clasificacion, fechaEstreno) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.duracion = duracion;
        this.clasificacion = clasificacion;
        this.fechaEstreno = fechaEstreno;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
