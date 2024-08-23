
/////////
// ASSETS

const productos = [
{nombre: "Caño de agua termofusión", precio: 2000, cantidad: 0},
{nombre: "Caño de gas termofusión", precio: 4000, cantidad: 0},
{nombre: "Caño epoxi", precio: 1500, cantidad: 0},
{nombre: "Caño corrugado", precio: 800, cantidad: 0},
{nombre: "Manguera", precio: 500, cantidad: 0},
]

let productsCart = [];
let isCatalogVisible = false;
let total = 0;

// Crear el contenedor principal
const container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// Crear la introducción
const intro = document.createElement('div');
intro.className = 'intro';
intro.innerHTML = `
  <h1>Tienda de caños de agua y gas</h1>
  <h3>Acceda al catálogo con stock</h3>`;
container.appendChild(intro);

// Crear el contenedor para el catálogo y carrito de compras
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

// Función para crear el botón de catálogo
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


// Función para alternar la visualización del catálogo
const toggleCatalog = () => {
  isCatalogVisible ? hideCatalog() : showCatalog();
};

// Función para mostrar la lista de productos
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

// Función para ocultar el catálogo
const hideCatalog = () => {
  const catalog = document.querySelector(".catalog");
  if (catalog) {
    catalog.remove();
    isCatalogVisible = false;
  }
};

// Función para crear el botón de compra para cada producto
const createBuyButton = (article, index) => {
  const buyButton = document.createElement('button');
  buyButton.innerHTML = "Comprar";
  buyButton.addEventListener("click", () => addToCart(index));
  article.appendChild(buyButton);
};

// Función para agregar un producto al carrito
const addToCart = (index) => {
  const selectedProduct = productos[index];
  const cartProduct = productsCart.find(product => product.nombre === selectedProduct.nombre);

  if (cartProduct) {
    cartProduct.cantidad++;
  } else {
    productsCart.push({ ...selectedProduct, cantidad: 1 });
  }

  updateCart();
  
  total += selectedProduct.precio;
  updateTotalRender();

};

// Función para actualizar la visualización del carrito
const updateCart = () => {
  productCartRender.innerHTML = ''; // Limpiar el carrito
  productsCart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <h3>${product.nombre}</h3>
      <h4>${product.precio}</h4>
      <h4>Cantidad: ${product.cantidad}</h4>`;
      productCartRender.appendChild(cartItem);
  });
};

function clearCart (){
  productsCart.length = 0;

productCartRender.innerHTML = ''; // Limpiar el carrito

total = 0;
updateTotalRender();
}

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
    total = 0;
    updateTotalRender();
  }
});
}

function updateTotalRender (){

  totalRender.innerHTML = `<h3>Total: $ ${total}</h3>`;

}

createCatalogButton();


///////////////////////////////////////////////////
