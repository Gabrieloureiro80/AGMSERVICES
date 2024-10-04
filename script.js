// Verifica se o site está em HTTP e redireciona para HTTPS
if (window.location.protocol === 'http:') {
    window.location.href = window.location.href.replace('http:', 'https:');
}

// Atualiza o link do menu ativo com base na rolagem da página
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 60; // Ajuste para incluir o offset do menu fixo
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Anima a entrada das seções na visualização usando Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    elements.forEach(element => observer.observe(element));
});

// Modal para exibir imagens da galeria
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const imgs = document.querySelectorAll(".gallery-item img");
const closeModal = document.querySelector(".close");

imgs.forEach(img => {
    img.onclick = () => {
        if (modal && modalImg && captionText) {
            modal.style.display = "block";
            modalImg.src = img.src;
            captionText.innerHTML = img.alt;
        }
    };
});

if (closeModal) {
    closeModal.onclick = () => {
        if (modal) {
            modal.style.display = "none";
        }
    };
}

window.onclick = (event) => {
    if (modal && event.target === modal) {
        modal.style.display = "none";
    }
};

// Slider de imagens com autoplay
let slideIndex = 0;
let autoplayInterval;

function showSlides() {
    const slides = document.querySelectorAll(".slider-img");
    slides.forEach((slide, index) => {
        slide.style.display = (index === slideIndex) ? "block" : "none";
    });
}

function nextSlide() {
    slideIndex = (slideIndex < document.querySelectorAll(".slider-img").length - 1) ? slideIndex + 1 : 0;
    showSlides();
}

function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 3000); // Muda para o próximo slide a cada 3 segundos (3000 ms)
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

document.querySelector(".slider-prev").addEventListener("click", () => {
    slideIndex = (slideIndex > 0) ? slideIndex - 1 : document.querySelectorAll(".slider-img").length - 1;
    showSlides();
    stopAutoplay();
    startAutoplay(); // Reinicia o autoplay após interação manual
});

document.querySelector(".slider-next").addEventListener("click", () => {
    nextSlide();
    stopAutoplay();
    startAutoplay(); // Reinicia o autoplay após interação manual
});

// Inicializa o slider e o autoplay ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSlides();
    startAutoplay();
});
