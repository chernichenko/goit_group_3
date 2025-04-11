document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.getElementById('homeButton');
    const favoritesButton = document.getElementById('favoritesButton');

    const mobileHomeLink = document.querySelector('.menu__nav-link[href$="index.html"]');
    const mobileFavoritesLink = document.querySelector('.menu__nav-link[href$="favorites.html"]');

    const openMenuButton = document.querySelector('.js-open-menu');
    const closeMenuButton = document.querySelector('.js-close-menu');

    const mobileMenu = document.querySelector('#mobile-menu');
    const backdrop = document.querySelector('[data-menu-backdrop]');
    const body = document.body;

    function setActive(button) {
        homeButton?.classList.remove('active');
        favoritesButton?.classList.remove('active');
        button?.classList.add('active');
    }

    function openMobileMenu() {
        mobileMenu?.classList.add('is-open');
        backdrop?.classList.remove('is-hidden');
        body.classList.add('no-scroll');
    }

    function closeMobileMenu() {
        mobileMenu?.classList.remove('is-open');
        backdrop?.classList.add('is-hidden');
        body.classList.remove('no-scroll');
    }

    // Обробники для десктопних кнопок
    homeButton?.addEventListener('click', function (e) {
        e.preventDefault();
        setActive(homeButton);
        window.location.href = 'index.html';
    });

    favoritesButton?.addEventListener('click', function (e) {
        e.preventDefault();
        setActive(favoritesButton);
        window.location.href = 'favorites.html';
    });

    // Обробники для мобільного меню
    mobileHomeLink?.addEventListener('click', function (e) {
        e.preventDefault();
        setActive(homeButton);
        closeMobileMenu();
        window.location.href = 'index.html';
    });

    mobileFavoritesLink?.addEventListener('click', function (e) {
        e.preventDefault();
        setActive(favoritesButton);
        closeMobileMenu();
        window.location.href = 'favorites.html';
    });

    // Відкриття/закриття мобільного меню
    openMenuButton?.addEventListener('click', openMobileMenu);
    closeMenuButton?.addEventListener('click', closeMobileMenu);
    backdrop?.addEventListener('click', closeMobileMenu);

    // Встановлення активної кнопки при завантаженні
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'favorites.html') {
        setActive(favoritesButton);
    } else {
        setActive(homeButton);
    }
});
