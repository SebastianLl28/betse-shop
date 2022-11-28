window.addEventListener("load", ()=>{
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hiden');
    loader.addEventListener('transitionend', ()=>{
        document.body.removeChild('loader')
    })
})
setTimeout(()=>{
    AOS.init();
}, 400)