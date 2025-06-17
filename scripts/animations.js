// Advanced Animations for Infraverge

// Particle System with Brand Colors
class InfravergeParticleSystem {
    constructor() {
        this.particles = [];
        this.colors = ['#FF4081', '#FF6B35', '#FF8A65'];
        this.canvas = null;
        this.ctx = null;
        this.mousePosition = { x: 0, y: 0 };
        this.isMouseOver = false;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.bindEvents();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.6';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());
        
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
        
        document.addEventListener('mouseenter', () => {
            this.isMouseOver = true;
        });
        
        document.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
        });
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            opacity: Math.random() * 0.8 + 0.2,
            life: Math.random() * 100 + 50
        };
    }
    
    updateParticles() {
        // Add new particles
        if (this.particles.length < 50) {
            this.particles.push(this.createParticle());
        }
        
        // Update existing particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            
            // Mouse interaction
            if (this.isMouseOver) {
                const dx = this.mousePosition.x - particle.x;
                const dy = this.mousePosition.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += (dx / distance) * force * 0.01;
                    particle.vy += (dy / distance) * force * 0.01;
                }
            }
            
            // Boundary checks
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.3;
                    this.ctx.strokeStyle = '#FF4081';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Morse Code Animation for Server Stack
class MorseCodeAnimator {
    constructor() {
        this.morsePatterns = {
            'I': '••',
            'N': '•−',
            'F': '••−•',
            'R': '•−•',
            'A': '•−',
            'V': '•••−',
            'E': '•',
            'R': '•−•',
            'G': '−−•',
            'E': '•'
        };
        
        this.currentPattern = 0;
        this.init();
    }
    
    init() {
        this.animateServerLayers();
    }
    
    animateServerLayers() {
        const serverLayers = document.querySelectorAll('.server-layer');
        
        serverLayers.forEach((layer, index) => {
            const indicators = layer.querySelectorAll('.morse-indicator');
            
            indicators.forEach((indicator, i) => {
                indicator.style.animationDelay = `${index * 0.5 + i * 0.2}s`;
            });
        });
    }
}

// Logo Brand Animation
class LogoBrandAnimator {
    constructor() {
        this.init();
    }
    
    init() {
        const logos = document.querySelectorAll('.logo-text');
        logos.forEach(logo => {
            logo.classList.add('logo-brand-animation');
        });
    }
}

// Enhanced Hover Effects
class InfravergeHoverEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.enhanceButtons();
        this.enhanceCards();
        this.enhanceNavigation();
    }
    
    enhanceButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
    }
    
    enhanceCards() {
        const cards = document.querySelectorAll('.feature-card, .content-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(255, 64, 129, 0.25)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }
    
    enhanceNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.textShadow = '0 0 10px rgba(255, 64, 129, 0.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.textShadow = '';
            });
        });
    }
    
    createRippleEffect(e) {
        const button = e.target;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
        `;
        
        button.style.position = 'relative';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Enhanced Scroll Animations
class InfravergeScrollAnimator {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.createObserver();
        this.addScrollElements();
    }
    
    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.animateCounters(entry.target);
                }
            });
        }, this.observerOptions);
    }
    
    addScrollElements() {
        const elements = document.querySelectorAll(`
            .feature-card,
            .content-card,
            .stat-item,
            .hero-content > div,
            .section-title
        `);
        
        elements.forEach((element, index) => {
            element.classList.add('reveal');
            element.style.animationDelay = `${index * 0.1}s`;
            this.observer.observe(element);
        });
    }
    
    animateCounters(element) {
        const counters = element.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            const startTime = performance.now();
            
            const animateNumber = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const current = Math.floor(progress * target);
                
                counter.textContent = current + (counter.textContent.includes('%') ? '%' : '+');
                
                if (progress < 1) {
                    requestAnimationFrame(animateNumber);
                }
            };
            
            requestAnimationFrame(animateNumber);
        });
    }
}

// Enhanced Matrix Rain Effect
class InfravergeMatrixRain {
    constructor() {
        this.characters = 'INFRAVERGE01';
        this.columns = [];
        this.canvas = null;
        this.ctx = null;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupColumns();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.opacity = '0.1';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        
        const columnCount = Math.floor(this.canvas.width / 20);
        this.columns = Array(columnCount).fill(0);
    }
    
    setupColumns() {
        this.columns = this.columns.map(() => Math.random() * this.canvas.height);
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(26, 26, 46, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FF4081';
        this.ctx.font = '15px monospace';
        
        this.columns.forEach((y, index) => {
            const character = this.characters[Math.floor(Math.random() * this.characters.length)];
            const x = index * 20;
            
            this.ctx.fillText(character, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.columns[index] = 0;
            } else {
                this.columns[index] = y + 20;
            }
        });
    }
    
    animate() {
        this.draw();
        setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, 100);
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InfravergeParticleSystem();
    new MorseCodeAnimator();
    new LogoBrandAnimator();
    new InfravergeHoverEffects();
    new InfravergeScrollAnimator();
    new InfravergeMatrixRain();
    
    // Add smooth reveal animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
