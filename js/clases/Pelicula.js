class Pelicula {
    //agregar Descripcion en un futuro
    constructor(id, nombre, genero, duracion, clasificacion, fechaEstreno, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.duracion = duracion;
        this.clasificacion = clasificacion;
        this.fechaEstreno = fechaEstreno;
        this.imagen = imagen;
        this.descripcion = "descripcion";
    }

    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
}
