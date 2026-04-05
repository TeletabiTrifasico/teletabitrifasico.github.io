/* =============================================================================
   PORTFOLIO — Hugo Jimenez Barrasa
   Main JavaScript: Scroll Reveal, Navbar, Typing Effect, Hamburger Menu
============================================================================= */

/* ===== SCROLL REVEAL ===== */
(function initScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-left, .reveal-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));
})();

/* ===== NAVBAR SCROLL EFFECT ===== */
(function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();

/* ===== HAMBURGER MENU ===== */
(function initHamburger() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', () => {
        const isOpen = links.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    links.querySelectorAll('a').forEach((a) => {
        a.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navbar && !navbar.contains(e.target)) {
            links.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
})();

/* ===== TYPING EFFECT ===== */
(function initTyping() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const words   = ['games', 'worlds', 'experiences', 'software', 'stories'];
    let wIdx      = 0;
    let cIdx      = 0;
    let deleting  = false;

    function tick() {
        const word = words[wIdx];

        if (deleting) {
            el.textContent = word.slice(0, cIdx - 1);
            cIdx--;
        } else {
            el.textContent = word.slice(0, cIdx + 1);
            cIdx++;
        }

        let delay = deleting ? 55 : 95;

        if (!deleting && cIdx === word.length) {
            deleting = true;
            delay    = 2400;
        } else if (deleting && cIdx === 0) {
            deleting = false;
            wIdx     = (wIdx + 1) % words.length;
            delay    = 380;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 1300);
})();

/* ===== SMOOTH SCROLL FOR HASH LINKS ===== */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const href   = a.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
})();
