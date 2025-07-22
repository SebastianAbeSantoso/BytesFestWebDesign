// Awal Parallax Effect
let bg = document.getElementById('bg')
let text = document.getElementById('text')

window.addEventListener('scroll', ()=> {
    let value = window.scrollY

    bg.style.top = value * 0.5 + 'px'
    text.style.top = value * 1 + 'px'
})
// Akhir Parallax Effect

// Awal Gallery Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const thumbnails = document.querySelectorAll('.thumbnail');
const totalSlides = slides.length

document.getElementById('total-slides').textContent = totalSlides;

function updateSlider() {
    slides.forEach(slide => slide.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));

    slides[currentSlide].classList.add('active');
    thumbnails[currentSlide].classList.add('active');

    document.getElementById('current-slide').textContent = currentSlide + 1;
}

function changeSlide(direction) {
    currentSlide += direction;

    if(currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if(currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider()
}

document.querySelector('.nav-prev').addEventListener('click', function(e) {
    e.preventDefault();
    changeSlide(-1);
});

document.querySelector('.nav-next').addEventListener('click', function(e) {
    e.preventDefault();
    changeSlide(1);
});

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function(e) {
        e.preventDefault();
        goToSlide(index)
    });
});

let autoPlayInterval = setInterval(() => {
    changeSlide(1)
}, 5000);

const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    autoPlayInterval = setInterval(() => {
        changeSlide(1)
    }, 6000);
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if(e.key === 'ArrowRight') {
        changeSlide(1)
    }
});

let startX = 0;
let endX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchend', (e) => {
    endX = e.changeTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if(Math.abs(diff) > swipeThreshold) {
        if(diff > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1)
        }
    }
}
// Akhir Gallery Slider