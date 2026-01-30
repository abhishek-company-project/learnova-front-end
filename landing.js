// ==================== SECTION NAVIGATION ====================
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== FAQ TOGGLE ====================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-answer').style.display = 'none';
                }
            });
            
            // Toggle current item
            item.classList.toggle('open');
            
            if (answer.style.display === 'none' || !answer.style.display) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });
    });
});

// ==================== DEMO MODAL ====================
const demoModal = document.getElementById('demoModal');
const openDemoBtn = document.getElementById('openDemo');
const closeDemoBtn = document.getElementById('closeModal');
const demoVideo = document.getElementById('demoVideo');

if (openDemoBtn) {
    openDemoBtn.addEventListener('click', function() {
        demoModal.style.display = 'flex';
        demoVideo.src = 'https://www.youtube.com/embed/IxRVa1DbSAg?autoplay=1';
    });
}

if (closeDemoBtn) {
    closeDemoBtn.addEventListener('click', function() {
        demoModal.style.display = 'none';
        demoVideo.src = '';
    });
}

// Close modal when clicking outside
if (demoModal) {
    demoModal.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            demoModal.style.display = 'none';
            demoVideo.src = '';
        }
    });
}

// ==================== FORM VALIDATION & SUBMISSION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Validation rules
    const validationRules = {
        username: {
            validate: (value) => value.trim().length >= 3,
            error: 'Username must be at least 3 characters'
        },
        email: {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            error: 'Please enter a valid email address'
        },
        password: {
            validate: (value) => value.length >= 6,
            error: 'Password must be at least 6 characters'
        },
        mobile: {
            validate: (value) => /^[\d\s+\-()]{10,}$/.test(value.replace(/\s/g, '')),
            error: 'Please enter a valid mobile number'
        },
        role: {
            validate: (value) => value !== '' && ['student', 'teacher', 'admin', 'parent'].includes(value),
            error: 'Please select a valid role'
        }
    };

    // Handle registration form
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = {};

            // Get all form inputs
            const inputs = registerForm.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                const fieldName = input.name;
                const fieldValue = input.value.trim();
                const errorElement = input.parentElement.querySelector('.field-error');
                
                // Reset previous state
                input.classList.remove('error', 'success');
                if (errorElement) {
                    errorElement.style.display = 'none';
                    errorElement.textContent = '';
                }

                // Validate field
                if (validationRules[fieldName]) {
                    if (!validationRules[fieldName].validate(fieldValue)) {
                        isValid = false;
                        input.classList.add('error');
                        if (errorElement) {
                            errorElement.textContent = validationRules[fieldName].error;
                            errorElement.style.display = 'block';
                        }
                    } else {
                        input.classList.add('success');
                        formData[fieldName] = fieldValue;
                    }
                }
            });

            if (isValid) {
                // Show success message
                showSuccessNotification('Account created successfully!');
                
                // Log form data (in real app, this would be sent to server)
                console.log('New user registration:', formData);
                
                // Reset form
                registerForm.reset();
                
                // Reset input states
                inputs.forEach(input => {
                    input.classList.remove('success', 'error');
                });
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    showSection('login');
                }, 2000);
            }
        });

        // Real-time validation
        const inputs = registerForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                const fieldName = this.name;
                const fieldValue = this.value.trim();
                const errorElement = this.parentElement.querySelector('.field-error');

                if (validationRules[fieldName] && fieldValue !== '') {
                    if (!validationRules[fieldName].validate(fieldValue)) {
                        this.classList.add('error');
                        this.classList.remove('success');
                        if (errorElement) {
                            errorElement.textContent = validationRules[fieldName].error;
                            errorElement.style.display = 'block';
                        }
                    } else {
                        this.classList.add('success');
                        this.classList.remove('error');
                        if (errorElement) {
                            errorElement.style.display = 'none';
                        }
                    }
                }
            });

            input.addEventListener('focus', function() {
                const errorElement = this.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });
    }

    // Handle login form
    const loginForm = document.querySelector('.auth-form:not(.register-form)');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = loginForm.querySelectorAll('input');
            let isValid = true;

            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        isValid = false;
                        input.style.borderColor = '#ef4444';
                    } else {
                        input.style.borderColor = '#e5e7eb';
                    }
                } else {
                    input.style.borderColor = '#e5e7eb';
                }
            });

            if (isValid) {
                showSuccessNotification('Login successful!');
                setTimeout(() => {
                    loginForm.reset();
                }, 1500);
            }
        });
    }
});

// ==================== NOTIFICATION SYSTEM ====================
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== NAVBAR STICKY EFFECT ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== ANIMATION ON SCROLL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .feature-detail-card, .blog-card, .service-card, .pricing-card, .testimonial-card, .team-member');
    
    cards.forEach(card => {
        card.style.opacity = '0.7';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', function(e) {
    // Close modal with Escape key
    const modal = document.getElementById('demoModal');
    if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
        document.getElementById('demoVideo').src = '';
    }
});

// ==================== UTILITY STYLES ANIMATION ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== BUTTON CLICK HANDLERS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Handle all buttons with onclick
    const buttons = document.querySelectorAll('button, a.btn-primary, a.btn-outline, a.btn-light');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ==================== SCROLL TO TOP BUTTON ====================
const createScrollTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #6366f1;
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 999;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;
    
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.background = '#4f46e5';
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.background = '#6366f1';
        scrollBtn.style.transform = 'scale(1)';
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
};

document.addEventListener('DOMContentLoaded', createScrollTopButton);

// ==================== DEFAULT SECTION DISPLAY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Make sure home section is visible on page load
    const homeSection = document.getElementById('home-section');
    if (homeSection) {
        homeSection.classList.add('active');
    }
});