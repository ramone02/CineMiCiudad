/* Clase carrito que mostrara la pelicula elegida, 
cantidad de entradas, y productos comprados */

class Carrito{
    constructor(funcion, productos, cantidadEntradas){
        this.funcion =  funcion;
        this.productos = productos;
        this.cantidadEntradas = cantidadEntradas;
        this.total = 0;
    }

    mostrarCarrito(){
        /* Muestro las entradas */
        alert(
            `Dia: ${this.funcion.dia},\n 
            Pelicula: ${this.funcion.pelicula.nombre},\n 
            Hora: ${funcion.hora},\n 
            Precio: ${this.funcion.precio},\n
            Cantidad Entradas: ${this.cantidadEntradas}`
            );
        /* Recorro el array de productos y lo muestro */
        for (let producto of productos) {
            alert(
                `Nombre: ${producto.nombre}\n
                Precio: ${producto.precio}`
                );
        }
    }

    calcularTotal(){
        /* Aplico descuento del 10% */
        if (this.funcion.isPromocion()) {
            this.total = ((this.funcion.precio * this.cantidadEntradas) + this.productos.total);
            this.total =  (this.total - (this.total*0.10));
            alert(`Total del carrito: $${this.total}`);
        } else {
            this.total = ((this.funcion.precio * this.cantidadEntradas) + this.productos.total);
            alert(`Total del carrito: $${this.total}`);
        }
    }
}