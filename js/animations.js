gsap.registerPlugin(ScrollTrigger);

// Initial loader animation with stagger dots
const loader = document.querySelector('.loader');
const loaderText = document.querySelector('.loader-text');
loaderText.innerHTML = 'Loading<span>.</span><span>.</span><span>.</span>';

gsap.to('.loader span', {
    opacity: 0,
    duration: 0.5,
    stagger: 0.2,
    repeat: -1,
    yoyo: true
});

gsap.to('.loader', {
    opacity: 0,
    duration: 1,
    delay: 2,
    onComplete: () => {
        loader.style.display = 'none';
        initializeAnimations();
    }
});

function initializeAnimations() {
    // Hero section text reveal animation
    const heroText = document.querySelector('.hero h1');
    const originalText = heroText.textContent;
    heroText.innerHTML = '';

    // Create wrapper for each letter
    originalText.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(100%) rotate(20deg)';
        heroText.appendChild(span);
    });

    // Hero timeline animation
    const heroTimeline = gsap.timeline();

    // Navbar animation with background blur effect
    heroTimeline.from('.navbar', {
        y: -100,
        opacity: 0,
        duration: 1,
        backdropFilter: 'blur(0px)',
        ease: 'power3.out'
    })
    // Letter animation
    .to('.hero h1 span', {
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'back.out(1.7)'
    })
    // Description fade up with gradient
    .from('.hero-description', {
        y: 50,
        opacity: 0,
        duration: 1,
        background: 'linear-gradient(45deg, var(--secondary-color), transparent)',
        backgroundClip: 'text',
        ease: 'power4.out'
    })
    // Scroll indicator bounce
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // Continuous scroll indicator animation
    gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Projects stagger animation with 3D effect
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card, i) => {
        gsap.set(card, { transformPerspective: 1000 });

        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 100,
            rotationX: 45,
            duration: 1,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });

    // Floating animation for skill items
    gsap.utils.toArray('.skill-item').forEach((skill, i) => {
        // Random floating animation
        gsap.to(skill, {
            y: 'random(-10, 10)',
            duration: 'random(2, 3)',
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
            delay: i * 0.1
        });

        // Entrance animation
        gsap.from(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            rotation: 90,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    });

    // Parallax scroll effect for project cards
    projectCards.forEach(card => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -50,
            ease: 'none'
        });
    });

    // Interactive hover animations for project cards
    projectCards.forEach(card => {
        const content = card.querySelector('.project-content');
        const techStack = card.querySelector('.tech-stack');

        card.addEventListener('mouseenter', () => {
            gsap.to(content, {
                y: -10,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(techStack, {
                y: 0,
                opacity: 1,
                duration: 0.3,
                stagger: 0.1,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(content, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: 'power2.in'
            });
            gsap.to(techStack, {
                y: 10,
                opacity: 0.8,
                duration: 0.3,
                ease: 'power2.in'
            });
        });
    });

    // Contact form animations
    const formElements = gsap.utils.toArray('.form-group, .submit-btn');
    formElements.forEach((element, index) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power4.out'
        });
    });
}