document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert(`Terima kasih, ${name}! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda di ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Here you would typically send the email to a server
            // For this example, we'll just show an alert
            alert(`Terima kasih telah berlangganan newsletter kami dengan email ${email}!`);
            
            // Reset form
            emailInput.value = '';
        });
    });

    // Pricing toggle
    const pricingToggleMonthly = document.getElementById('monthly');
    const pricingToggleYearly = document.getElementById('yearly');
    
    if (pricingToggleMonthly && pricingToggleYearly) {
        pricingToggleMonthly.addEventListener('change', updatePricing);
        pricingToggleYearly.addEventListener('change', updatePricing);
        
        function updatePricing() {
            const priceElements = document.querySelectorAll('.price .amount');
            
            if (pricingToggleYearly.checked) {
                // Apply yearly pricing (20% discount)
                priceElements.forEach(element => {
                    const monthlyPrice = parseFloat(element.textContent);
                    const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount
                    element.textContent = Math.round(yearlyPrice / 12); // Show equivalent monthly
                });
            } else {
                // Show monthly pricing
                priceElements.forEach(element => {
                    // Reset to original prices (you would need to store these)
                    const prices = {
                        '166': '166',
                        '200': '200',
                        '250': '250',
                        '1.499': '1.499',
                        '2.999': '2.999'
                    };
                    element.textContent = prices[element.textContent];
                });
            }
        }
    }

    // Initialize animations when elements come into view
    const animateElements = document.querySelectorAll('.animate-slide-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = entry.target.dataset.delay || '0s';
                entry.target.classList.add('animate-slide-up');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
});

// Animated Counter for Stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current) + (stat.getAttribute('data-count').includes('.') ? '.' + (current.toFixed(1).split('.')[1] || '0') : '');
        }, 16);
    });
}

// Initialize when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}