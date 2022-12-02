// cargar quitar el loader cuando ya haya cargado la página
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader-hiden");
  loader.addEventListener("transitionend", () => {
    loader.remove();
  });

  // agregarEventListener();
});

setTimeout(() => {
  AOS.init();
}, 400);

window.addEventListener("scroll", function () {
  let header = document.querySelector(".nav");
  header.classList.toggle("nav-active", window.scrollY > 0);
});

const getData = async function () {
  const data = await fetch("../db/datos.json");
  const lista = await data.json();
  const productos = document.querySelector(".products__container");

  lista.map((value) => {
    const element = document.createElement("DIV");
    element.classList.add("card");
    element.setAttribute("id", "card");
    element.setAttribute("data-id", `${value.id}`);
    element.innerHTML += `
            <div class="card__header">
                <img src="${value.img}" alt="" class="card__image">
            </div>
            <div class="card__body">
                <p class="card__title">${value.name}</p>
                <p class="card__description">${value.description}</p>
                <p class="card__price">$${value.price}</p>
            </div>
        `;
    productos.appendChild(element);
  });
  AgregarEventListener();
};

getData();

let listaProductos = [];
const contenedor = document.querySelector(".nav__carrito");

function AgregarEventListener() {
  const cardContainer = document.querySelector(".products__container");

  cardContainer.addEventListener("click", agregarCarrito);
}

// agregar a la lista los porudctos señalados
const agregarCarrito = (e) => {
  // si no señala la imagen entonces retorna | no continua con lo siguiente
  if (!e.target.classList.contains("card__header")) return;

  const bodyCard = e.target.parentElement.lastElementChild;

  const id = bodyCard.parentElement.getAttribute("data-id");
  const name = bodyCard.children[0].textContent;
  const price = parseInt(
    bodyCard.children[2].textContent.match(/\d/g).join("")
  );
  const description = bodyCard.children[1].textContent;
  const imagen = e.target.firstElementChild.src;

  const Producto = {
    id: id,
    name: name,
    price: price,
    description: description,
    img: imagen,
    cantidad: 1,
  };

  const evaluar = listaProductos.some((value) => value.id == Producto.id);

  if (evaluar) {
    const newList = listaProductos.map((value) => {
      if (value.id == Producto.id) {
        value.cantidad += 1;
      }
      return value;
    });
    console.log(newList);
  } else {
    listaProductos.push(Producto);
  }

  //cada ves que se señale un producto, se volverán a cargar los productos
  mostrarProductosCarrito();
};

const mostrarProductosCarrito = () => {
  contenedor.innerHTML = "";

  listaProductos.map((element) => {
    contenedor.innerHTML += `
        <div class="nav__card">
            <img src="${element.img}" alt="" class="navCard__image">
            <div class="navCard__text">
                <p class="navCard__title">${element.name}</p>
                <p>Precio por Unidad: ${element.price}</p>
                <p>cantidad: ${element.cantidad}</p>
            </div>
            <p class="navCard__price">$${element.cantidad * element.price}</p>
        </div> 
        `;
  });

  mostrarTotalCarrito();
};

const evaluarRepetidos = (id) => {
  const newList = listaProductos.map((value) => {
    if (value.id == id) {
      value.id = id;
    }
  });
};

const mostrarTotalCarrito = () => {
  const total = listaProductos.reduce(
    (previusValue, value) => previusValue + value.price * value.cantidad,
    0
  );
  // console.log(total);
  contenedor.innerHTML += `
    <div class="result">
        <p>Total: </p>
        <p>$${total}</p>
    </div>
    `;
};
