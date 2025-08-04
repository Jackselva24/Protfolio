class AnimatedGradientBackground {
    constructor() {
        this.gradientInner = document.getElementById('gradientInner');
        this.startingGap = 120;
        this.breathing = true;
        this.gradientColors = [
            "#0D1117",
            "#00DDEB",
            "#FF2E63",
            "#FF9500",
            "#00E676"
        ];
        this.gradientStops = [20, 40, 60, 80, 100];
        this.animationSpeed = 0.03;
        this.breathingRange = 8;
        this.topOffset = 10;
        
        this.width = this.startingGap;
        this.directionWidth = 1;
        this.animationFrame = null;
        
        this.init();
    }

    init() {
        this.animate();
    }

    animate() {
        if (this.width >= this.startingGap + this.breathingRange) {
            this.directionWidth = -1;
        }
        if (this.width <= this.startingGap - this.breathingRange) {
            this.directionWidth = 1;
        }

        if (!this.breathing) {
            this.directionWidth = 0;
        }

        this.width += this.directionWidth * this.animationSpeed;

        const gradientStopsString = this.gradientStops
            .map((stop, index) => `${this.gradientColors[index]} ${stop}%`)
            .join(", ");

        const gradient = `radial-gradient(${this.width}% ${this.width + this.topOffset}% at 50% 20%, ${gradientStopsString})`;

        if (this.gradientInner) {
            this.gradientInner.style.background = gradient;
        }

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

window.addEventListener('load', () => {
    // Initialize gradient background
    const gradientBackground = new AnimatedGradientBackground();
    
    // Initialize hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        hamburger.style.transform = navLinks.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0deg)';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
            hamburger.style.transform = 'rotate(0deg)';
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button Functionality
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Parallax effect for hero gradient
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        const gradientInner = document.getElementById('gradientInner');
        gradientInner.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (gradientBackground) {
        gradientBackground.destroy();
    }
});