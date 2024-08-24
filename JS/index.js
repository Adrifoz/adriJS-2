//ESTA RAMA (PUSH) TIENE EL TOTAL EN LOCALSTORAGE, SOLO FALTA RESETEAR COMPRETAMENTE LA CANTIDAD DE PRODUCTOS DEL CART.


/////////
// ASSETS

const productos = [
{nombre: "Caño de agua termofusión", precio: 2000, cantidad: 1},
{nombre: "Caño de gas termofusión", precio: 4000, cantidad: 1},
{nombre: "Caño epoxi", precio: 1500, cantidad: 1},
{nombre: "Caño corrugado", precio: 800, cantidad: 1},
{nombre: "Manguera", precio: 500, cantidad: 1},
]


let productsCart = [];
createCart();

let isCatalogVisible = false;


//total en localStorage
function createTotal(){
  
  localStorage.setItem('total', JSON.stringify(0));
}

function saveTotal(price) {
  let helpTotal = getTotal();
  let addition = helpTotal =+ price;
  localStorage.setItem('total', JSON.stringify(addition));
  updateTotalRender();
}

const getTotal = () => {
  return JSON.parse(localStorage.getItem('total')) || 0;
};

function removeTotal(){
  localStorage.removeItem('total');
  total = 0;
  createTotal();
  updateTotalRender();
}

createTotal();
let total = getTotal();

//carrito en localStorage
function createCart(){
  localStorage.setItem('cart', JSON.stringify(productsCart));
}

function saveCart(producto) {

  cart.push(producto);
  localStorage.setItem('cart', JSON.stringify(cart));
}

const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

let cart = getCart();

function removeCart(){
  localStorage.removeItem('cart');
  createCart();

}

function saveQuantityProd(product) {
  
  cart.forEach(item => {
      if (item.nombre === product.nombre) {
          item.cantidad++;
      }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Contenedor principal
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// Introducción
const intro = document.createElement('div');
intro.className = 'intro';
intro.innerHTML = `
  <h1>Tienda de caños de agua y gas</h1>
  <h3>Acceda al catálogo con stock</h3>`;
container.appendChild(intro);

// Contenedores hijos
const containerCatalog = document.createElement('div');
containerCatalog.className = 'contenedorCatalogo';
container.appendChild(containerCatalog);

const shopping = document.createElement('div');
shopping.className = 'shopping';
shopping.innerHTML = `<h3>Su carrito de compra</h3>`;
container.appendChild(shopping);

const productCartRender = document.createElement('div');
productCartRender.className = 'productCartRender';
shopping.appendChild(productCartRender);

const totalRender = document.createElement('div');
totalRender.className = 'total';
totalRender.innerHTML = `<h3>Total: $ ${total}</h3>`;
shopping.appendChild(totalRender);

// Botón de catálogo
const createCatalogButton = () => {
  const catalogButton = document.createElement('button');
  catalogButton.innerHTML = "Catálogo";
  catalogButton.className = "productos";
  catalogButton.addEventListener("click", toggleCatalog, false);
  containerCatalog.appendChild(catalogButton);
};

// Botones para la sección de compra
const clearButton = document.createElement('button');
clearButton.innerHTML = "Limpiar carrito";
clearButton.addEventListener("click", () => clearCart());
shopping.appendChild(clearButton);

const cartBuyButton = document.createElement('button');
cartBuyButton.innerHTML = "Comprar";
cartBuyButton.addEventListener("click", () => cartBuy());
shopping.appendChild(cartBuyButton);


// Visualización del catálogo
const toggleCatalog = () => {
  isCatalogVisible ? hideCatalog() : showCatalog();
};

// Mostrar Catálogo
const showCatalog = () => {
  isCatalogVisible = true;

  const catalog = document.createElement('div');
  catalog.className = 'catalog';
  
  productos.forEach((producto, index) => {
    const article = document.createElement('div');
    article.innerHTML = `
      <h3>${producto.nombre}</h3>
      <h4>${producto.precio}</h4>`;
    createBuyButton(article, index);
    catalog.appendChild(article);
  });

  containerCatalog.append(catalog);
};

// Ocultar el catálogo
const hideCatalog = () => {
  const catalog = document.querySelector(".catalog");
  if (catalog) {
    catalog.remove();
    isCatalogVisible = false;
  }
};

// Botón de compra para cada producto
const createBuyButton = (article, index) => {
  const buyButton = document.createElement('button');
  buyButton.innerHTML = "Comprar";
  buyButton.addEventListener("click", () => addToCart(index));
  article.appendChild(buyButton);
};

// Agregar un producto al carrito
const addToCart = (index) => {
  const selectedProduct = productos[index];
  const cartProduct = cart.find(product => product.nombre === selectedProduct.nombre);

  if (cartProduct) {
    saveQuantityProd(selectedProduct)
  } else {
    saveCart(selectedProduct);
  }

  updateCart();
  
  let price = selectedProduct.precio;
  saveTotal(price);
};

// Actualizar la visualización del carrito
const updateCart = () => {
  productCartRender.innerHTML = ''; // Limpiar el carrito
  cart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <h3>${product.nombre}</h3>
      <h4>${product.precio}</h4>
      <h4>Cantidad: ${product.cantidad}</h4>`;
      productCartRender.appendChild(cartItem);
  });
};

// Limpieza del carrito
function clearCart (){
  removeCart();
  cart = [];
  productCartRender.innerHTML = ''; // Limpiar el carrito

  total = 0;
  removeTotal();
  updateTotalRender();
  console.log(total)
}

// Compra
function cartBuy (){
Swal.fire({
  title: "¿Quiere confirmar su compra?",
  text: "Total",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "green",
  cancelButtonColor: "#d33",
  confirmButtonText: "Comprar",
  cancelButtonText: "Cancelar"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "¡Compra realizada con éxito!",
      text: "Gracias por su compra.",
      icon: "success"
    });
    clearCart();

  }
});
}

//Total
function updateTotalRender(){

  totalRender.innerHTML = `<h3>Total: $ ${total}</h3>`;

}

createCatalogButton();


///////////////////////////////////////////////////
