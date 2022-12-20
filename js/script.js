document.addEventListener('DOMContentLoaded', () => {
    // Variables

    const usuarios = [{
        nombre: "Tomas",
        mail: "TomasArozarenaRodrigo@hotmail.com",
        pass: "tomas123"
    },
    {
        nombre: "Juana",
        mail: "juanita@gmail.com",
        pass: "juana456"
    },
    {
        nombre: "Valentin",
        mail: "valentin@outlook.com",
        pass: "valentin789"
    }]

    const baseDeDatos = [
        {
            nombre: "Black Adam",
            id: 1,
            categoria: "DC",
            precio: 8500,
            imagen: "img/funko black adam.png"
        },
        {
            nombre: "The Flash",
            id: 2,
            categoria: "DC",
            precio: 8200,
            imagen: "img/funko flash.png"
        },
        {
            nombre: "Harry Potter GF",
            id: 3,
            categoria: "Harry Potter",
            precio: 8500,
            imagen: "img/funko harry 2.png"
        },
        {
            nombre: "Harry Potter",
            id: 4,
            categoria: "Harry Potter",
            precio: 10500,
            imagen: "img/funko harry.png"
        },
        {
            nombre: "Scarlet Witch",
            id: 5,
            categoria: "Marvel",
            precio: 9900,
            imagen: "img/funko scarlet witch.png"
        },
        {
            nombre: "Luke Skywalker",
            id: 6,
            categoria: "Star Wars",
            precio: 10900,
            imagen: "img/funko star wars.png"
        }

    ];
    const mailLogin = document.getElementById("emailLogin"),
        passLogin = document.getElementById("passwordLogin"),
        recordar = document.getElementById("recordarme"),
        btnLogin = document.getElementById("login"),
        modalEl = document.getElementById("modalLogin"),
        modal = new bootstrap.Modal(modalEl),
        toggles = document.querySelectorAll(".toggles");

    let carrito = [];
    const divisa = "$";
    const DOMitems = document.querySelector("#items");
    const DOMcarrito = document.querySelector("#carrito");
    const DOMtotal = document.querySelector("#total");
    const DOMbotonVaciar = document.querySelector("#botonFinalizarCompra");

    // Funciones

  

function validarUsuario(usersDB, user, pass) {
    let encontrado = usersDB.find((userDB) => userDB.mail == user);

    if (typeof encontrado === "undefined") {
        return false;
    } else {

        if (encontrado.pass != pass) {
            return false;
        } else {
            return encontrado;
        }
    }
}

function guardarDatos(usuarioDB, storage) {
    const usuario = {
        "name": usuarioDB.nombre,
        "user": usuarioDB.mail,
        "pass": usuarioDB.pass
    }

    storage.setItem("usuario", JSON.stringify(usuario));
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Hola, ${usuario.name}!`
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
}

function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        presentarInfo(toggles, "d-none");
    }
}

function presentarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

btnLogin.addEventListener("click", (e) => {
    e.preventDefault();

    let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);

    if (!data) {
        alert(`Usuario y/o contraseña incorrectos`);
    } else {

        if (recordar.checked) {
            guardarDatos(data, localStorage);
            saludar(recuperarUsuario(localStorage));
        } else {
            guardarDatos(data, sessionStorage);
            saludar(recuperarUsuario(sessionStorage));
        }

        modal.hide();
        presentarInfo(toggles, "d-none");
    }
});

btnLogout.addEventListener("click", () => {
    borrarDatos();
    presentarInfo(toggles, "d-none");
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage));

    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement("div");
            miNodo.classList.add("card", "col-sm-4");
            // Body
            const miNodoCardBody = document.createElement("div");
            miNodoCardBody.classList.add("card-body");
            // Titulo
            const miNodoTitle = document.createElement("h5");
            miNodoTitle.classList.add("card-title");
            miNodoTitle.textContent = info.nombre;
            // Imagen
            const miNodoImagen = document.createElement("img");
            miNodoImagen.classList.add("img-fluid");
            miNodoImagen.setAttribute("src", info.imagen);
            // Precio
            const miNodoPrecio = document.createElement("p");
            miNodoPrecio.classList.add("card-text");
            miNodoPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const miNodoBoton = document.createElement("button");
            miNodoBoton.classList.add("btn", "btn-primary");
            miNodoBoton.textContent = "Agregar al carrito";
            miNodoBoton.setAttribute("marcador", info.id);
            miNodoBoton.addEventListener("click", añadirProductoAlCarrito);
            
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);
            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    
    // Evento para añadir un producto al carrito de la compra
    
    function añadirProductoAlCarrito(evento) {
        // Nodo a carrito
        carrito.push(evento.target.getAttribute("marcador"))
        // Actualizamos el carrito 
        renderizarCarrito();

    }

    
    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = "";
        // Sacamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir del carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // Coincidel los id??
                return itemId === item ? total += 1 : total;
            }, 0);
            // Nodo del item del carrito
            const miNodo = document.createElement("li");
            miNodo.classList.add("list-group-item", "text-right", "mx-2");
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement("button");
            miBoton.classList.add("btn", "btn-danger", "mx-5");
            miBoton.textContent = "X";
            miBoton.style.marginLeft = "1rem";
            miBoton.dataset.item = item;
            miBoton.addEventListener("click", borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
       // Renderizamos el precio total en el HTML
       DOMtotal.textContent = calcularTotal();
    }

    
    // Evento para borrar un elemento del carrito
    
    function borrarItemCarrito(evento) {
        // Obtenemos el producto ID que hay en el boton pulsado
        const id = evento.target.dataset.item;
        // Borramos todos los productos
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        
        renderizarCarrito();
    }

   
     // Calcula el precio total teniendo en cuenta los productos repetidos
     
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

    
    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
    }

    // Eventos
    DOMbotonVaciar.addEventListener("click", vaciarCarrito);

    // Inicio
    renderizarProductos();
    renderizarCarrito();
  });