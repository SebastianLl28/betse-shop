// cargar quitar el loader cuando ya haya cargado la página
window.addEventListener("load", ()=>{
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hiden');
    loader.addEventListener('transitionend', ()=>{
        loader.remove();
    })

    // agregarEventListener();
})

setTimeout(()=>{
    AOS.init();
}, 400)

window.addEventListener('scroll', function(){
    let header = document.querySelector('.nav');
    header.classList.toggle('nav-active', window.scrollY > 0);
})


//// llenar lista
// const data = await fetch('../db/datos.json');
// const lista = await data.json();
// const productos = document.querySelector('.products__container');

// lista.map(value=>{
//     const element = document.createElement('DIV');
//     element.innerHTML=`
//     <div class="card" id="card">
//         <div class="card__header">
//             <img src="${value.img}" alt="" class="card__image">
//         </div>
//         <div class="card__body">
//             <p class="card__title">${value.name}</p>
//             <p class="card__description">${value.description}</p>
//             <p class="card__price">$${value.price}</p>
//         </div>
//     </div>
//     `;
//     productos.appendChild(element);
// });



const getData = async function(){
    const data = await fetch('../db/datos.json');
    const lista = await data.json();
    const productos = document.querySelector('.products__container');
    console.log(lista);

    lista.map(value=>{
        const element = document.createElement('DIV');
        element.innerHTML += `
        <div class="card" id="card">
            <div class="card__header">
                <img src="${value.img}" alt="" class="card__image">
            </div>
            <div class="card__body">
                <p class="card__title">${value.name}</p>
                <p class="card__description">${value.description}</p>
                <p class="card__price">$${value.price}</p>
            </div>
        </div>
        `;
        productos.appendChild(element);
    });
}

getData();

const addEventListener = async function(){
    
}