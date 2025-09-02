// Лоадер
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const progress = document.getElementById('loading-progress');

    // Имитация загрузки
    let width = 0;
    const interval = setInterval(() => {
        width += 5;
        progress.style.width = width + '%';

        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
});

// Кастомный курсор
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.pixel-cursor');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Взаимодействие с персонажами
const characters = document.querySelectorAll('.character');
const beerGlass = document.getElementById('beer-glass');
const characterModal = document.getElementById('character-modal');
const beerModal = document.getElementById('beer-modal');
const closeButtons = document.querySelectorAll('.close-modal');

characters.forEach(char => {
    char.addEventListener('click', () => {
        characterModal.style.display = 'flex';
        createParticles(30, char.getBoundingClientRect());
    });
});

beerGlass.addEventListener('click', () => {
    beerModal.style.display = 'flex';
    createParticles(30, beerGlass.getBoundingClientRect());
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        characterModal.style.display = 'none';
        beerModal.style.display = 'none';
    });
});

// Создание частиц
function createParticles(count, rect) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 10 + 5;
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;

        const colors = ['#ff6ec7', '#6e44ff', '#ffb347', '#47ffb3'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        let opacity = 1;
        const particleInterval = setInterval(() => {
            x += dx;
            y += dy;
            opacity -= 0.02;

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(particleInterval);
                particle.remove();
            }
        }, 30);
    }
}

// Случайные движения персонажей
setInterval(() => {
    characters.forEach(char => {
        char.style.animation = 'none';
        setTimeout(() => {
            char.style.animation = `float ${4 + Math.random() * 2}s ease-in-out infinite`;
        }, 10);
    });
}, 15000);

// Параллакс эффект
document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 100;
    const y = (window.innerHeight - e.pageY * 2) / 100;

    characters.forEach(char => {
        char.style.transform = `translate(${x}px, ${y}px)`;
    });

    beerGlass.style.transform = `translate(${-x}px, ${-y}px)`;
});

// Интерактивный скролл
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;

    characters.forEach(char => {
        char.style.transform = `translateY(${rate}px)`;
    });
});

// Кнопка исследования
document.getElementById('explore-button').addEventListener('click', () => {
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
    createParticles(50, document.getElementById('explore-button').getBoundingClientRect());
});

// Случайные мерцания элементов
setInterval(() => {
    const randomElement = document.querySelectorAll('.blog-card, .pixel-button, .pixel-border')[Math.floor(Math.random() * 8)];
    if (randomElement) {
        randomElement.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            randomElement.style.animation = '';
        }, 300);
    }
}, 5000);