
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
let isCatalogVisible = false;

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
const contenedorCatalogo = document.createElement('div');
contenedorCatalogo.className = 'contenedorCatalogo';
container.appendChild(contenedorCatalogo);

const shopping = document.createElement('div');
shopping.className = 'shopping';
shopping.innerHTML = `<h3>Su carrito de compra</h3>`;
container.appendChild(shopping);

const productoCart = document.createElement('div');
productoCart.className = 'productoCart';
shopping.appendChild(productoCart);

// Función para crear el botón de catálogo
const createCatalogButton = () => {
  const catalogButton = document.createElement('button');
  catalogButton.innerHTML = "Catálogo";
  catalogButton.className = "productos";
  catalogButton.addEventListener("click", toggleCatalog);
  container.appendChild(catalogButton);
};

// Función para alternar la visualización del catálogo
const toggleCatalog = () => {
  isCatalogVisible ? hideCatalog() : showCatalog();
};

// Función para mostrar la lista de productos
const showCatalog = () => {
  isCatalogVisible = true;

  const catalogo = document.createElement('div');
  catalogo.className = 'catalogo';
  
  productos.forEach((producto, index) => {
    const articulo = document.createElement('div');
    articulo.innerHTML = `
      <h3>${producto.nombre}</h3>
      <h4>${producto.precio}</h4>`;
    createBuyButton(articulo, index);
    catalogo.appendChild(articulo);
  });

  contenedorCatalogo.append(catalogo);
};

// Función para ocultar el catálogo
const hideCatalog = () => {
  const catalogo = document.querySelector(".catalogo");
  if (catalogo) {
    catalogo.remove();
    isCatalogVisible = false;
  }
};

// Función para crear el botón de compra para cada producto
const createBuyButton = (articulo, index) => {
  const buyButton = document.createElement('button');
  buyButton.innerHTML = "Comprar";
  buyButton.addEventListener("click", () => addToCart(index));
  articulo.appendChild(buyButton);
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
};

// Función para actualizar la visualización del carrito
const updateCart = () => {
  productoCart.innerHTML = ''; // Limpiar el carrito
  productsCart.forEach(product => {
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <h3>${product.nombre}</h3>
      <h4>${product.precio}</h4>
      <h4>Cantidad: ${product.cantidad}</h4>`;
    productoCart.appendChild(cartItem);
  });
};
createCatalogButton();


///////////////////////////////////////////////////
