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

// Hero section animations with text split effect
const heroText = document.querySelector('.hero h1');
const heroDescription = document.querySelector('.hero-description');

// Split text animation
const text = heroText.textContent;
heroText.textContent = '';
text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    heroText.appendChild(span);
});

// Hero timeline animation
const heroTimeline = gsap.timeline({ delay: 1.5 });
heroTimeline
    .from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1
    })
    .to('.hero h1 span', {
        opacity: 1,
        y: 0,
        duration: 0.05,
        stagger: 0.05,
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


// Project cards animation with stagger
const projectsTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.projects',
        start: 'top center',
        toggleActions: 'play none none reverse'
    }
});

projectsTimeline.from('.project-card', {
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power4.out'
});

// Skills animation with bouncing effect
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
        delay: index * 0.1,
        ease: 'back.out(1.7)'
    });
});

// Hover animation for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.tech-stack'), {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.tech-stack'), {
            y: 10,
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.in'
        });
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
        delay: index * 0.2,
        ease: 'power4.out'
    });
});