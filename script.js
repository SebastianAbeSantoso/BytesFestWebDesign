let bg = document.getElementById('bg')
let text = document.getElementById('text')

window.addEventListener('scroll', ()=> {
    let value = window.scrollY

    bg.style.top = value * 0.5 + 'px'
    text.style.top = value * 1 + 'px'
})