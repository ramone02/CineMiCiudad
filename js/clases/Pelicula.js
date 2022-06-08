class Pelicula {
    constructor(id, nombre, genero, duracion, clasificacion, fechaEstreno, descripcion, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.duracion = duracion;
        this.clasificacion = clasificacion;
        this.fechaEstreno = fechaEstreno;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
