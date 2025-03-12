const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;
let speed = 0.2;

// Smooth cursor animation
function animate() {
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + (distX * speed);
    cursorY = cursorY + (distY * speed);

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

animate();

// Interactive elements cursor effect
const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2) rotate(45deg)';
        cursorFollower.style.transform = 'scale(2)';

        // Add magnetic effect
        element.addEventListener('mousemove', magneticEffect);
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1) rotate(0deg)';
        cursorFollower.style.transform = 'scale(1)';

        // Remove magnetic effect
        element.removeEventListener('mousemove', magneticEffect);
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power3.out'
        });
    });
});

// Magnetic effect for interactive elements
function magneticEffect(e) {
    const bound = this.getBoundingClientRect();
    const mouseX = e.clientX - bound.left;
    const mouseY = e.clientY - bound.top;
    const centerX = bound.width / 2;
    const centerY = bound.height / 2;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    gsap.to(this, {
        x: deltaX * 0.2,
        y: deltaY * 0.2,
        duration: 0.3,
        ease: 'power3.out'
    });
}

// Text reveal effect when hovering over text elements
const textElements = document.querySelectorAll('h1, h2, h3, p');
textElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.style.mixBlendMode = 'difference';
        cursorFollower.style.background = 'rgba(255, 255, 255, 0.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursorFollower.style.mixBlendMode = 'normal';
        cursorFollower.style.background = 'rgba(100, 255, 218, 0.2)';
    });
});