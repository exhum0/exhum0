document.addEventListener('DOMContentLoaded', () => {

    // ================== Toggling Skill Tabs ==================
    const tabs = document.querySelectorAll('[data-target]');
    const tabContent = document.querySelectorAll('[data-content]');

    if (tabs.length && tabContent.length) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = document.querySelector(tab.dataset.target);

                tabContent.forEach(tc => tc.classList.remove('skills-active'));
                if (target) target.classList.add('skills-active');

                tabs.forEach(t => t.classList.remove('skills-active'));
                tab.classList.add('skills-active');
            });
        });
    }

    // ================== Menu ==================
    const navbarMenu = document.getElementById("menu");
    const burgerMenu = document.getElementById("burger");
    const overlayMenu = document.querySelector(".overlay");

    if (burgerMenu && navbarMenu) {
        burgerMenu.addEventListener("click", () => {
            burgerMenu.classList.toggle("is-active");
            navbarMenu.classList.toggle("is-active");
        });
    }

    document.querySelectorAll(".menu-link").forEach(link => {
        link.addEventListener("click", () => {
            if (burgerMenu && navbarMenu) {
                burgerMenu.classList.remove("is-active");
                navbarMenu.classList.remove("is-active");
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 768 && navbarMenu?.classList.contains("is-active")) {
            navbarMenu.classList.remove("is-active");
            overlayMenu?.classList.remove("is-active");
        }
    });

    // ================== Dark Mode ==================
    const darkSwitch = document.getElementById("switch");
    if (darkSwitch) {
        darkSwitch.addEventListener("click", () => {
            document.documentElement.classList.toggle("darkmode");
            document.body.classList.toggle("darkmode");
        });
    }

    // ================== MixItUp Sorting ==================
    if (typeof mixitup !== "undefined") {
        mixitup('.work-container', {
            selectors: { target: '.work-card' },
            animation: { duration: 300 }
        });
    } else {
        console.warn("MixItUp is not loaded. Please include mixitup.min.js before main.js");
    }

    // ================== Active Work Link ==================
    const linkWork = document.querySelectorAll('.work-item');
    if (linkWork.length) {
        linkWork.forEach(l => {
            l.addEventListener('click', function () {
                linkWork.forEach(i => i.classList.remove('active-work'));
                this.classList.add('active-work');
            });
        });
    }

    // ================== Portfolio Popup ==================
    const popupClose = document.querySelector('.portfolio-popup-close');
    if (popupClose) {
        popupClose.addEventListener('click', togglePortfolioPopup);
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('work-button')) {
            togglePortfolioPopup();
            portfolioItemDetails(e.target.parentElement);
        }
    });

    function togglePortfolioPopup() {
        document.querySelector('.portfolio-popup')?.classList.toggle('open');
    }

    function portfolioItemDetails(portfolioItem) {
        const img = portfolioItem.querySelector('.work-img')?.src;
        const title = portfolioItem.querySelector('.work-title')?.innerHTML;
        const details = portfolioItem.querySelector('.portfolio-item-details')?.innerHTML;

        if (img) document.querySelector('.pp-thumbnail img').src = img;
        if (title) document.querySelector('.portfolio-popup-subtitle span').innerHTML = title;
        if (details) document.querySelector('.portfolio-popup-body').innerHTML = details;
    }

    // ================== Services Popup ==================
    const modalViews = document.querySelectorAll('.services-modal');
    const modelBtns = document.querySelectorAll('.services-button');
    const modalCloses = document.querySelectorAll('.services-modal-close');

    if (modalViews.length && modelBtns.length) {
        modelBtns.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                modalViews[i]?.classList.add('active-modal');
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                modalViews.forEach(view => view.classList.remove('active-modal'));
            });
        });
    }

    // ================== Swiper Testimonials ==================
    if (typeof Swiper !== "undefined") {
        new Swiper(".testimonials-container", {
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                576: { slidesPerView: 2 },
                768: { slidesPerView: 2, spaceBetween: 48 },
            },
        });
    } else {
        console.warn("Swiper is not loaded. Please include swiper-bundle.min.js before main.js");
    }

    // ================== Input Animation ==================
    const inputs = document.querySelectorAll('.input');
    if (inputs.length) {
        inputs.forEach((input) => {
            input.addEventListener('focus', function () {
                this.parentNode.classList.add('focus');
            });
            input.addEventListener('blur', function () {
                if (this.value === "") {
                    this.parentNode.classList.remove('focus');
                }
            });
        });
    }

    // ================== Scroll Section Active Link ==================
    const sections = document.querySelectorAll('section[id]');
    if (sections.length) {
        window.addEventListener('scroll', () => {
            let scrollY = window.pageYOffset;
            sections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute('id');

                const link = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
                if (link) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        link.classList.add('active-link');
                    } else {
                        link.classList.remove('active-link');
                    }
                }
            });
        });
    }

    // ================== Sidebar ==================
    const navMenu = document.getElementById('sidebar');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-sidebar');
        });
    }

    if (navClose && navMenu) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-sidebar');
        });
    }

});
