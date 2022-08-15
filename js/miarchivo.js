
fetch("../pizzas.json")
    .then( (response) => response.json() )
    .then( (data) => {
        data.forEach( (pizza) => {
            const div = document.createElement("div");
            const h5 = document.createElement("h5");
            h5.innerHTML = `${pizza.nombre}`;
            const p = document.createElement("p");
            p.innerHTML = `$${pizza.precio}`;
            const boton = document.createElement("button");
            boton.innerText = "Agregar al carrito";
            boton.addEventListener("click", () => {
                    let carrito = [];
                    const carritoJson = localStorage.getItem("carrito");
                    if(carritoJson) {
                        carrito = JSON.parse(carritoJson);
                    }
                    const indiceProductoCarrito = carrito.findIndex((pizzaCarrito) => {
                        return pizzaCarrito.nombre === pizza.nombre;
                    });
                    if (indiceProductoCarrito === -1) {
                        pizza.cantidad = 1;
                        carrito.push(pizza);
                    } else { 
                        carrito[indiceProductoCarrito].cantidad += 1;
                    }
                    
                    localStorage.setItem("carrito", JSON.stringify(carrito));
                    
                    mostrarCarrito();
                    
                    Toastify({
                        text: "Se agregó el producto al carrito",
                        duration: 2000,
                        style: {
                            background: "lightblue",
                            color: "black",
                            border: "2px solid black",
                        }
                    }).showToast();
                }   
            );
            
            div.append(h5, p, boton);
            
            productos.append(div);
            
            div.className = "contenedor";
        });

    })

const div = document.getElementById("carro");
div.className = "carro";

const productos = document.getElementById("productos");


function mostrarCarrito () {
    const ul = document.getElementById("carritoDeProductos");
    ul.innerHTML = "";
    const carritoJson = localStorage.getItem("carrito");
    let carrito = JSON.parse(carritoJson);
    carrito.forEach( (pizza) => {
        const li = document.createElement("li");
        li.className = "productoEnCarrito";
        const pNombre = document.createElement("p");
        pNombre.innerHTML = `Gusto: ${pizza.nombre}`;
        const pPrecio = document.createElement("p");
        pPrecio.innerHTML = `Precio: $${pizza.precio}`;
        const pCantidad = document.createElement("p");
        pCantidad.innerHTML = `Cantidad: ${pizza.cantidad}`;
        const botonX = document.createElement("button");
        botonX.innerText = "Eliminar del carrito";
        botonX.addEventListener("click", (eliminarProducto));
        li.append(pNombre, pPrecio, pCantidad, botonX);
        ul.append(li);

        function eliminarProducto(event) {
            const botonDelete = event.target;
            botonDelete.closest(`.productoEnCarrito`).remove();
        
            Toastify({
                text: "Se eliminó el producto al carrito",
                duration: 2000,
                style: {
                    background: "red",
                    color: "black",
                    border: "2px solid black",
                }
            }).showToast();
            
        }
        
    }
    
    
)}


mostrarCarrito()

