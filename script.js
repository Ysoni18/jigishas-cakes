document.addEventListener('DOMContentLoaded', () => {
    // Transparent-to-solid navbar transition on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active state in navigation links using IntersectionObserver
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 // Trigger when 40% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                if(activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Gallery Slider Navigation
    const gallerySlider = document.getElementById('gallery-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if(gallerySlider && prevBtn && nextBtn) {
        const scrollAmount = () => {
            const item = gallerySlider.querySelector('.gallery-item');
            return item ? item.offsetWidth + 24 : 300;
        };

        prevBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });
    }
});
