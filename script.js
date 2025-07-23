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

// Awal Card Stack
let currentCard = 1;
const cards = document.querySelectorAll('.card');
const indicators = document.querySelectorAll('.indicator');
const totalCards = cards.length;
const nextBtn = document.querySelector('.next-card');
const prevBtn = document.querySelector('.prev-card');

function isDesktop() {
    return window.innerWidth >= 1024;
}

function isTablet() {
    return window.innerWidth >= 769 && window.innerWidth <= 1023;
}

function updateCardStack() {
    if (isDesktop()) {
        cards.forEach((card, index) => {
            card.style.transform = 'none';
            card.style.opacity = '1';
            card.style.zIndex = 'auto';
        });
        
        indicators.forEach(indicator => indicator.classList.remove('active'));
        return;
    }    
    cards.forEach((card, index) => {
        const cardNumber = index + 1;
        const position = (cardNumber - currentCard + totalCards) % totalCards;
        
        card.style.zIndex = totalCards - position;
        
        if (isTablet()) {
            switch(position) {
                case 0:
                    card.style.transform = 'translateX(0) translateY(0) scale(1)';
                    card.style.opacity = '1';
                    break;
                case 1:
                    card.style.transform = 'translateX(30px) translateY(15px) scale(0.96)';
                    card.style.opacity = '0.9';
                    break;
                case 2:
                    card.style.transform = 'translateX(60px) translateY(30px) scale(0.92)';
                    card.style.opacity = '0.8';
                    break;
                case 3:
                    card.style.transform = 'translateX(90px) translateY(45px) scale(0.88)';
                    card.style.opacity = '0.7';
                    break;
            }
        } else {
            switch(position) {
                case 0:
                    card.style.transform = 'translateX(0) translateY(0) scale(1)';
                    card.style.opacity = '1';
                    break;
                case 1:
                    card.style.transform = 'translateX(24px) translateY(12px) scale(0.96)';
                    card.style.opacity = '0.9';
                    break;
                case 2:
                    card.style.transform = 'translateX(48px) translateY(24px) scale(0.92)';
                    card.style.opacity = '0.8';
                    break;
                case 3:
                    card.style.transform = 'translateX(72px) translateY(36px) scale(0.88)';
                    card.style.opacity = '0.7';
                    break;
            }
        }
    });
    indicators.forEach(indicator => indicator.classList.remove('active'));
    if (indicators[currentCard - 1]) {
        indicators[currentCard - 1].classList.add('active');
    }
}

function nextCard() {
    if (isDesktop()) return;
    currentCard = currentCard >= totalCards ? 1 : currentCard + 1;
    updateCardStack();
}

function prevCard() {
    if (isDesktop()) return;
    currentCard = currentCard <= 1 ? totalCards : currentCard - 1;
    updateCardStack();
}

function goToCard(cardNumber) {
    if (isDesktop()) return;
    if (cardNumber >= 1 && cardNumber <= totalCards) {
        currentCard = cardNumber;
        updateCardStack();
    }
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextCard);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevCard);
}

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => goToCard(index + 1));
});

let cardAutoPlay = setInterval(() => {
    if (!isDesktop()) {
        nextCard();
    }
}, 6000);

const cardStackContainer = document.querySelector('.card-stack-container');
if (cardStackContainer) {
    cardStackContainer.addEventListener('mouseenter', () => {
        clearInterval(cardAutoPlay);
    });

    cardStackContainer.addEventListener('mouseleave', () => {
        cardAutoPlay = setInterval(() => {
            if (!isDesktop()) {
                nextCard();
            }
        }, 6000);
    });

    let cardStartX = 0;
    let cardEndX = 0;

    cardStackContainer.addEventListener('touchstart', (e) => {
        if (isDesktop()) return;
        cardStartX = e.touches[0].clientX;
        clearInterval(cardAutoPlay);
    });

    cardStackContainer.addEventListener('touchend', (e) => {
        if (isDesktop()) return;
        cardEndX = e.changedTouches[0].clientX;
        handleCardSwipe();
        cardAutoPlay = setInterval(() => {
            if (!isDesktop()) {
                nextCard();
            }
        }, 6000);
    });

    function handleCardSwipe() {
        const swipeThreshold = 50;
        const diff = cardStartX - cardEndX;

        if(Math.abs(diff) > swipeThreshold) {
            if(diff > 0) {
                nextCard();
            } else {
                prevCard();
            }
        }
    }
}

window.addEventListener('resize', () => {
    updateCardStack();
});

if (cards.length > 0) {
    updateCardStack();
}
// Akhir Card Stack