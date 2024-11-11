const menuToggle = document.querySelector('.menu-toggle');
const closeBtn = document.querySelector('.close-btn');
const drawer = document.querySelector('.drawer');

menuToggle.addEventListener('click', () => {
    drawer.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});
