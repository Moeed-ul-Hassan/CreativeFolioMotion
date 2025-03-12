// 3D Tilt effect for project cards
class Tilt {
    constructor(element) {
        this.element = element;
        this.maxTilt = 20;
        this.perspective = 1000;
        this.scale = 1.05;
        this.initializeEffect();
    }

    initializeEffect() {
        this.element.style.transform = `perspective(${this.perspective}px)`;
        this.element.style.transition = 'transform 0.4s cubic-bezier(.03,.98,.52,.99)';
        this.element.style.transformStyle = 'preserve-3d';
        this.addEventListeners();
    }

    addEventListeners() {
        this.element.addEventListener('mouseenter', (e) => this.onMouseEnter(e));
        this.element.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseEnter(event) {
        this.element.style.transition = 'none';
        // Find card content
        const cardContent = this.element.querySelector('.project-content');
        if (cardContent) {
            cardContent.style.transform = `translateZ(50px)`;
        }
    }

    onMouseMove(event) {
        const rect = this.element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const xPercent = (x / rect.width - 0.5) * 2;
        const yPercent = (y / rect.height - 0.5) * 2;
        
        const tiltX = this.maxTilt * yPercent;
        const tiltY = -this.maxTilt * xPercent;

        this.element.style.transform = `
            perspective(${this.perspective}px)
            rotateX(${tiltX}deg)
            rotateY(${tiltY}deg)
            scale3d(${this.scale}, ${this.scale}, ${this.scale})
        `;

        // Add shine effect
        this.updateShinePosition(x / rect.width * 100, y / rect.height * 100);
    }

    onMouseLeave() {
        this.element.style.transition = 'transform 0.4s cubic-bezier(.03,.98,.52,.99)';
        this.element.style.transform = `
            perspective(${this.perspective}px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;

        // Reset card content
        const cardContent = this.element.querySelector('.project-content');
        if (cardContent) {
            cardContent.style.transform = `translateZ(0)`;
        }

        // Reset shine
        const shine = this.element.querySelector('.shine');
        if (shine) {
            shine.style.opacity = '0';
        }
    }

    updateShinePosition(x, y) {
        let shine = this.element.querySelector('.shine');
        if (!shine) {
            shine = document.createElement('div');
            shine.className = 'shine';
            this.element.appendChild(shine);
        }

        shine.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
        shine.style.opacity = '1';
    }
}

// Initialize tilt effect on project cards
document.querySelectorAll('.project-card').forEach(card => {
    new Tilt(card);
});
