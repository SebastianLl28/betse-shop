// lista de productos
const car = document.querySelector('.list__car');
const lista_car = document.querySelector('.nav__carrito')

car.addEventListener('click', ()=>{
    const lista = [... lista_car.classList]
    if(lista.includes('nav__carrito--active')){
        lista_car.animate([
            { height: '25rem' },
            { height: '0rem'}
        ],{
            duration: 1000
        })

        lista_car.classList.add('nav__carrito--off');

        setTimeout(()=>{
            lista_car.classList.toggle('nav__carrito--active');        
        },1000);
        return;
    }
    lista_car.classList.remove('nav__carrito--off');
    lista_car.classList.toggle('nav__carrito--active');
});