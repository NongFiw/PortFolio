/* ============================================
   PORTFOLIO — JAVASCRIPT (2026 Dark + Glass)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('.section, .hero-section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Scroll Animations (Blur-in + Fade-up) ---
    const animateElements = document.querySelectorAll(
        '.glass-card, .gradient-title, .gradient-badge, .category-title, .contact-nav .nav-btn'
    );

    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    });

    animateElements.forEach(el => {
        animationObserver.observe(el);
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Mouse-Follow Glow Effect ---
    const mouseGlow = document.getElementById('mouse-glow');

    if (mouseGlow) {
        let mouseX = 0;
        let mouseY = 0;
        let glowX = 0;
        let glowY = 0;
        let isMouseActive = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!isMouseActive) {
                isMouseActive = true;
                mouseGlow.classList.add('active');
            }
        });

        document.addEventListener('mouseleave', () => {
            isMouseActive = false;
            mouseGlow.classList.remove('active');
        });

        // Smooth follow with lerp
        function updateGlow() {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            mouseGlow.style.left = glowX + 'px';
            mouseGlow.style.top = glowY + 'px';

            requestAnimationFrame(updateGlow);
        }

        updateGlow();
    }

    // --- Ambient glow orbs parallax ---
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.08;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // --- Subtle Tilt effect on glass cards (project cards only) ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // --- Typing effect for profile name (optional enhancement) ---
    const profileName = document.querySelector('.profile-name');
    if (profileName && profileName.textContent.includes('___')) {
        // Keep placeholder as-is for user to customize
    }

    // --- Lightbox for Activity Images ---
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxOverlay && lightboxImg) {
        // Click on activity image to open lightbox
        document.querySelectorAll('.activity-img-wrapper').forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                if (wrapper.classList.contains('no-img')) return;
                const img = wrapper.querySelector('img');
                if (img && img.src) {
                    lightboxImg.src = img.src;
                    lightboxImg.alt = img.alt;
                    lightboxOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close lightbox
        function closeLightbox() {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { lightboxImg.src = ''; }, 400);
        }

        lightboxClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });

        lightboxOverlay.addEventListener('click', (e) => {
            if (e.target === lightboxOverlay) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    console.log('✅ Portfolio loaded successfully!');
});
