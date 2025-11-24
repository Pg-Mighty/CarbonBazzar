// Update copyright year dynamically
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
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

// Animated counter for impact goals
function animateCounter(element, target, prefix = '', suffix = '') {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = prefix + target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        }
    }, stepTime);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.dataset.target);
            
            // Determine if it's the rupee counter
            if (entry.target.textContent.includes('₹')) {
                animateCounter(entry.target, target, '₹', ' Cr');
            } else {
                animateCounter(entry.target, target, '', '+');
            }
        }
    });
}, observerOptions);

// Observe all goal numbers
document.querySelectorAll('.goal-number').forEach(counter => {
    counterObserver.observe(counter);
});

// Scroll-based animations for cards
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Apply fade-in animation to cards
document.querySelectorAll('.card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Apply fade-in animation to badge cards
document.querySelectorAll('.badge-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translate3d(0, ${scrolled * 0.3}px, 0)`;
        heroContent.style.opacity = 1 - (scrolled / 800);
    }
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Interactive hover effect for cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Interactive hover effect for badge cards
document.querySelectorAll('.badge-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth appearance for mission highlights
const missionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.highlight-item').forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `all 0.5s ease-out ${index * 0.15}s`;
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 200);
            });
        }
    });
}, { threshold: 0.5 });

const missionHighlights = document.querySelector('.mission-highlights');
if (missionHighlights) {
    missionObserver.observe(missionHighlights);
}

// Animate goals when they come into view
const goalsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.goal').forEach((goal, index) => {
                goal.style.opacity = '0';
                goal.style.transform = 'translateY(30px)';
                goal.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
                
                setTimeout(() => {
                    goal.style.opacity = '1';
                    goal.style.transform = 'translateY(0)';
                }, 100);
            });
        }
    });
}, { threshold: 0.3 });

const goalsContainer = document.querySelector('.goals-container');
if (goalsContainer) {
    goalsObserver.observe(goalsContainer);
}

// Console message
console.log('%c🌿 CarbonBazaar - Climate Equity for All', 'color: #7FB069; font-size: 20px; font-weight: bold;');
console.log('%cJoin us in revolutionizing the carbon economy!', 'color: #4A7C59; font-size: 14px;');