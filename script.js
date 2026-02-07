// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hero Animation
const tl = gsap.timeline();

tl.from('.hero-bg', {
    scale: 1.3,
    duration: 2,
    ease: 'power2.out'
})
    .from('.logo', {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=1.5')
    .from('.nav a', {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=1.3')
    .from('.hero-title .line', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
    }, '-=1')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-buttons .btn', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.8');


// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const section = document.querySelector('.hero-section');
    const scroll = window.pageYOffset;
    if (scroll <= section.offsetHeight) {
        gsap.to('.hero-bg', {
            y: scroll * 0.5,
            ease: 'none',
            duration: 0
        });
        gsap.to('.hero-content', {
            y: scroll * 0.2,
            opacity: 1 - scroll / 700,
            ease: 'none',
            duration: 0
        });
    }
});

// Scroll Animations
gsap.registerPlugin(ScrollTrigger);

// Story Section
gsap.from('.story-text', {
    scrollTrigger: {
        trigger: '.story-section',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

// Categories
gsap.utils.toArray('.category-card').forEach((card, i) => {
    // Add reveal class wrapper logic if needed, or animate clip-path directly
    let img = card.querySelector('img');
    gsap.fromTo(img,
        { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
        {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 75%',
            }
        }
    );

    gsap.from(card.querySelector('.cat-info'), {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
            trigger: card,
            start: 'top 75%',
        }
    });
});

// Lookbook
gsap.utils.toArray('.look-item').forEach((item, i) => {
    let img = item.querySelector('img');
    gsap.fromTo(img,
        { scale: 1.2, filter: 'grayscale(100%)' },
        {
            scale: 1,
            filter: 'grayscale(0%)',
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
            }
        }
    );
});

// Magnetic Buttons
const magnets = document.querySelectorAll('.btn');
magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', (e) => {
        const rect = magnet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(magnet, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Features
gsap.from('.feature-item', {
    scrollTrigger: {
        trigger: '.features-section',
        start: 'top 80%',
    },
    y: 30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
});
