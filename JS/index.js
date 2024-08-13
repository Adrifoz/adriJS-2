
//ELIMINAR ITEMS DEL CARRITO, USAR EL MISMO SISTEMA DE CREATE Y REMOVE, O USAR PUSH.

/////////
// ASSETS

const productos = [
{nombre: "Caño de agua termofusión", precio: 2000, cantidad: 0},
{nombre: "Caño de gas termofusión", precio: 4000, cantidad: 0},
{nombre: "Caño epoxi", precio: 1500, cantidad: 0},
{nombre: "Caño corrugado", precio: 800, cantidad: 0},
{nombre: "Manguera", precio: 500, cantidad: 0},
]

const productsCart = [];

const argumentsArray = [{}];

////////////////////////////////////////////////////


/////////////
// DECLARADOS

let flag = false;


////////////////////////////////////////////////////

/////////////---------------------------------------
// HTML --------------------------------------------

const container = document.createElement('div');
container.className = 'container';

const intro = document.createElement('div');
intro.className = 'intro'
intro.innerHTML = `<h1> Tienda de caños de agua y gas </h1>
                  <h3> Acceda al catálogo con stock </h3>`;

container.appendChild(intro);
document.body.appendChild(container);

button();

const contenedorCatalogo = document.createElement('div');
contenedorCatalogo.className = 'contenedorCatalogo';
container.appendChild(contenedorCatalogo);

const shopping = document.createElement('div');
shopping.className = 'shopping';
shopping.innerHTML = `<h3> Su carrito de compra </h3>`;
container.appendChild(shopping);

const cart = document.createElement('div');
cart.className = 'cart';
cart.innerHTML = `<h3> articulo </h3>`;
shopping.appendChild(cart);

const productoCart = document.createElement('div');
productoCart.className = 'productoCart';
cart.appendChild(productoCart);

  //------------------------------------------------
////////////////////////////////////////////////////


///////////
//FUNCIONES
function button () {
  const button = document.createElement('button');
  button.addEventListener("click", pregunta, false);
  chargeArguments();
  button.innerHTML = "Catálogo";
  button.className = "productos";
  container.appendChild(button);
}

// function buttonClose () {
//   const buttonClose = document.createElement('button');
//   buttonClose.addEventListener("click", pregunta, false);
//   buttonClose.innerHTML = "Cerrar catálogo";
//   buttonClose.className = "buttonClose";
//   container.appendChild(buttonClose);
// }

function buttonProduct (articulo, nombre, precio) {
  const buttonProduct = document.createElement('button');
  buttonProduct.addEventListener("click", buy(nombre, precio), false);
  // buttonProduct.addEventListener("click", pregunta, false);
  buttonProduct.innerHTML = "Comprar";
  articulo.appendChild(buttonProduct);
  
}

function chargeArguments (){
  for (let i = 0; i < productos.length; i++) {
    // Acceder al nombre del producto actual y agregarlo al nuevo array
    argumentsArray.push(productos[i].nombre);
  }
}


function pregunta (){
  if(!flag){
    mostrarLista();
    flag = true;
  
  }else if (flag){
    let classCatalogo = document.querySelector(".catalogo");
    classCatalogo.remove();
    flag = false;
  }
}



function mostrarLista() {
  
  flag = true;
  
  const catalogo = document.createElement('div');
  catalogo.className = 'catalogo';
  
  productos.forEach(producto => {


    let nombre = producto.nombre;
    let precio = producto.precio;
    
    const articulo = document.createElement('div');
    articulo.innerHTML = `<h3> ${nombre}</h3>
                          <h4> ${precio}</h4>`;
    buttonProduct(articulo, nombre, precio);

  catalogo.appendChild(articulo);
  contenedorCatalogo.append(catalogo);
  });

}


function buy(nombre, precio) {
  console.log(nombre);
  
  // Encuentra el índice del producto con el nombre especificado
  let index1 = productos.findIndex(producto => producto.nombre === nombre);
  
  // Si el producto existe en el array
  if (index1 !== -1) {
    let productBuyed = productos[index1];
    
    // Verifica si el producto ya está en el carrito
    let askIncludes = productsCart.some(product => product.nombre === nombre);
    
    if (!askIncludes) {
      // Agrega el producto al carrito
      productsCart.push(new Product(nombre, precio));
    } else {
      // Incrementa la cantidad del producto en el carrito
      let cartProductIndex = productsCart.findIndex(product => product.nombre === nombre);
      productsCart[cartProductIndex].cantidad++;
    }
  } else {
    // Muestra un error si el producto no se encuentra
    shopping.innerHTML = `<h3>ERROR: Producto no encontrado</h3>`;
  }

  // Agrega la visualización del producto en el carrito
  const tituloProducto = document.createElement('div');
  tituloProducto.innerHTML = `<h3> ${nombre}</h3><h4> ${precio}</h4>`;
  productoCart.appendChild(tituloProducto);
  
  console.log(productsCart);
}

class Product {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 1;
  }
}


///////////////////////////////////////////////////
