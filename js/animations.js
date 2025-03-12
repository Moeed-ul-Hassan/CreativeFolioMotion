gsap.registerPlugin(ScrollTrigger);

// Initial loader animation
gsap.to('.loader', {
    opacity: 0,
    duration: 1,
    delay: 1,
    onComplete: () => {
        document.querySelector('.loader').style.display = 'none';
    }
});

// Hero section animations
const heroTimeline = gsap.timeline({ delay: 1.5 });
heroTimeline
    .from('.hero h1', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    })
    .from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5')
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    }, '-=0.5');

// Navbar animation
gsap.from('.navbar', {
    y: -100,
    opacity: 0,
    duration: 1,
    delay: 1
});

// Section titles animation
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1
    });
});

// Skills animation
gsap.utils.toArray('.skill-item').forEach((skill, index) => {
    gsap.from(skill, {
        scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2
    });
});

// Contact form animation
const formElements = document.querySelectorAll('.form-group, .submit-btn');
formElements.forEach((element, index) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2
    });
});
