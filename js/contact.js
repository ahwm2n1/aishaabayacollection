// ======================================
// CONTACT PAGE JAVASCRIPT
// Complete Updated Version for Aisha Abayas Collection
// Features: WhatsApp Integration, Auto Animation on Mobile (3 second interval)
// ======================================

// Owner Contact Information
const OWNER_EMAIL = "info@aishaabayas.com";
const OWNER_WHATSAPP = "923034676708"; // Without + sign
const COMPANY_NAME = "Aisha Abayas Collection";

// Global variables for animation
let animationInterval;
let isAnimationPaused = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
    
    // Start mobile auto animation
    if (window.innerWidth <= 768) {
        startMobileAutoAnimation();
    }
});

function initContactPage() {
    initContactForm();
    initFAQ();
    initBackToTop();
    initNewsletterForm();
    initDynamicSubject();
    initSmoothScroll();
    initFormValidation();
    initMobileOptimizations();
    initWhatsAppButtons();
    initTouchEvents();
}

// ======================================
// MOBILE AUTO ANIMATION (Every 3 seconds)
// ======================================

function startMobileAutoAnimation() {
    console.log('Starting mobile auto animation - every 3 seconds');
    
    // Clear any existing interval
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    // Set interval for 3 seconds
    animationInterval = setInterval(() => {
        if (!isAnimationPaused) {
            rotateCardAnimations();
        }
    }, 3000);
    
    // Initial animation after 1 second
    setTimeout(() => {
        if (!isAnimationPaused) {
            rotateCardAnimations();
        }
    }, 1000);
}

function rotateCardAnimations() {
    const infoCards = document.querySelectorAll('.info-card');
    
    infoCards.forEach((card, index) => {
        // Add delay based on index
        setTimeout(() => {
            // Card animation
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.transform = 'scale(1.02)';
            card.style.boxShadow = 'var(--shadow-hover)';
            card.style.borderColor = 'var(--accent-light)';
            
            // Icon animation
            const icon = card.querySelector('.info-icon');
            if (icon) {
                icon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                icon.style.transform = 'scale(1.1) rotate(10deg)';
                icon.style.background = 'var(--accent)';
                icon.style.color = 'white';
            }
            
            // Title animation
            const title = card.querySelector('h3');
            if (title) {
                title.style.transition = 'color 0.5s ease';
                title.style.color = 'var(--accent)';
            }
            
            // Reset after 500ms
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.boxShadow = 'var(--shadow-sm)';
                card.style.borderColor = 'var(--border-light)';
                
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.background = 'var(--accent-light)';
                    icon.style.color = 'var(--accent-dark)';
                }
                
                if (title) {
                    title.style.color = 'var(--text-dark)';
                }
            }, 500);
        }, index * 150); // Stagger effect
    });
    
    // Animate social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.transition = 'all 0.4s ease';
            link.style.transform = 'translateY(-5px)';
            link.style.background = 'var(--accent)';
            link.style.color = 'white';
            
            setTimeout(() => {
                link.style.transform = 'translateY(0)';
                link.style.background = 'var(--bg-light)';
                link.style.color = 'var(--text-dark)';
            }, 400);
        }, index * 100);
    });
}

// ======================================
// TOUCH EVENTS FOR MOBILE
// ======================================

function initTouchEvents() {
    if (window.innerWidth <= 768) {
        const infoCards = document.querySelectorAll('.info-card');
        
        infoCards.forEach(card => {
            // Pause animation on touch
            card.addEventListener('touchstart', function(e) {
                e.preventDefault();
                isAnimationPaused = true;
                
                // Pause CSS animations
                this.style.animationPlayState = 'paused';
                
                const icon = this.querySelector('.info-icon');
                const title = this.querySelector('h3');
                
                if (icon) icon.style.animationPlayState = 'paused';
                if (title) title.style.animationPlayState = 'paused';
                
                // Apply hover effect
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = 'var(--shadow-hover)';
                this.style.borderColor = 'var(--accent-light)';
                
                if (icon) {
                    icon.style.background = 'var(--accent)';
                    icon.style.color = 'white';
                    icon.style.transform = 'rotateY(360deg)';
                }
                
                if (title) {
                    title.style.color = 'var(--accent)';
                }
            });
            
            // Resume animation on touch end
            card.addEventListener('touchend', function(e) {
                e.preventDefault();
                
                // Remove hover effect
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'var(--shadow-sm)';
                this.style.borderColor = 'var(--border-light)';
                
                const icon = this.querySelector('.info-icon');
                const title = this.querySelector('h3');
                
                if (icon) {
                    icon.style.background = 'var(--accent-light)';
                    icon.style.color = 'var(--accent-dark)';
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
                
                if (title) {
                    title.style.color = 'var(--text-dark)';
                }
                
                // Resume animation after 2 seconds
                setTimeout(() => {
                    isAnimationPaused = false;
                    
                    this.style.animationPlayState = 'running';
                    if (icon) icon.style.animationPlayState = 'running';
                    if (title) title.style.animationPlayState = 'running';
                }, 2000);
            });
            
            // Cancel animation on touch move
            card.addEventListener('touchmove', function(e) {
                e.preventDefault();
            });
        });
        
        // Social links touch events
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.style.transform = 'translateY(-5px)';
                this.style.background = 'var(--accent)';
                this.style.color = 'white';
            });
            
            link.addEventListener('touchend', function(e) {
                e.preventDefault();
                this.style.transform = 'translateY(0)';
                this.style.background = 'var(--bg-light)';
                this.style.color = 'var(--text-dark)';
            });
        });
    }
}

// ======================================
// WHATSAPP BUTTONS
// ======================================

function initWhatsAppButtons() {
    // WhatsApp quick button
    const whatsappBtn = document.querySelector('.quick-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const message = `
🛍️ *Aisha Abayas Collection*

Hi! I'm interested in your abayas collection.
Can you provide more information about:
• Latest collections
• Prices
• Shipping

Thank you!
            `;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`, '_blank');
        });
    }
    
    // Social WhatsApp link
    const socialWhatsApp = document.querySelector('.social-link[aria-label="WhatsApp"]');
    if (socialWhatsApp) {
        socialWhatsApp.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://wa.me/${OWNER_WHATSAPP}`, '_blank');
        });
    }
    
    // Phone button
    const phoneBtn = document.querySelector('.quick-btn.phone');
    if (phoneBtn) {
        phoneBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'tel:+923034676708';
        });
    }
    
    // Email button
    const emailBtn = document.querySelector('.quick-btn.email');
    if (emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'mailto:info@aishaabayas.com';
        });
    }
}

// ======================================
// CONTACT FORM - WHATSAPP INTEGRATION
// ======================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const formStatus = document.getElementById('formStatus');

        // Validate form
        if (!validateForm(form)) {
            showFormStatus('Please fill in all required fields correctly', 'error');
            return;
        }

        // Show loading
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnIcon.style.display = 'none';
        btnLoader.style.display = 'flex';
        formStatus.innerHTML = '';

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            orderId: document.getElementById('orderId')?.value || 'Not provided',
            timestamp: new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' })
        };

        try {
            // Send via WhatsApp
            sendViaWhatsApp(formData);
            
            // Show success
            showFormStatus('Message sent! Check WhatsApp for confirmation.', 'success');
            
            // Reset form
            form.reset();
            document.querySelector('.order-id-field').style.display = 'none';
            
            // Show notification
            showNotification('Message sent to owner via WhatsApp!', 'success');
            
        } catch (error) {
            console.error('Error:', error);
            showFormStatus('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnIcon.style.display = 'inline';
            btnLoader.style.display = 'none';
        }
    });
}

function sendViaWhatsApp(formData) {
    // Format subject
    let subjectText = formData.subject;
    const subjectMap = {
        'order': '📦 Order Inquiry',
        'product': '🛍️ Product Question',
        'shipping': '🚚 Shipping',
        'return': '🔄 Return/Refund',
        'wholesale': '🏭 Wholesale',
        'other': '❓ Other'
    };
    subjectText = subjectMap[formData.subject] || formData.subject;
    
    // Create WhatsApp message
    const message = `
🆕 *NEW CONTACT FORM MESSAGE*
━━━━━━━━━━━━━━━━━━━━━━━

👤 *Customer Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}

📋 *Message Details:*
• Subject: ${subjectText}
• Order ID: ${formData.orderId}
• Time: ${formData.timestamp}

💬 *Message:*
_${formData.message}_

━━━━━━━━━━━━━━━━━━━━━━━
📱 *Quick Actions:*
• Reply to: ${formData.email}
• Call: ${formData.phone}

🌐 Sent from ${COMPANY_NAME} Website
    `;

    // Encode and open WhatsApp
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`, '_blank');
    
    return true;
}

// ======================================
// NEWSLETTER FORM
// ======================================

function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = this.querySelector('input[type="email"]').value;
        const submitBtn = this.querySelector('button');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;

        try {
            // Send newsletter subscription via WhatsApp
            const message = `
📧 *NEW NEWSLETTER SUBSCRIBER*

Email: ${email}

They want to receive updates from ${COMPANY_NAME}.
            `;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`, '_blank');
            
            showNotification('Subscribed! Check WhatsApp for confirmation.', 'success');
            this.reset();
        } catch (error) {
            showNotification('Subscription failed. Try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ======================================
// FORM VALIDATION
// ======================================

function validateForm(form) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();
    const privacy = document.querySelector('input[name="privacy"]').checked;

    if (!name || !email || !subject || !message || !privacy) {
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }

    return true;
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
}

function initFormValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() { validateField(this); });
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) validateField(this);
        });
    });
}

function validateField(field) {
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();
    
    if (field.hasAttribute('required') && !field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.id === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    field.classList.remove('error');
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

// ======================================
// FAQ ACCORDION
// ======================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close others
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current
            item.classList.toggle('active');
        });
    });
}

// ======================================
// BACK TO TOP
// ======================================

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ======================================
// DYNAMIC SUBJECT (Show Order ID field)
// ======================================

function initDynamicSubject() {
    const subjectSelect = document.getElementById('subject');
    const orderIdField = document.querySelector('.order-id-field');

    if (subjectSelect && orderIdField) {
        subjectSelect.addEventListener('change', function() {
            orderIdField.style.display = this.value === 'order' ? 'block' : 'none';
        });
    }
}

// ======================================
// SMOOTH SCROLL
// ======================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ======================================
// MOBILE OPTIMIZATIONS
// ======================================

function initMobileOptimizations() {
    // Fix viewport for mobile
    if (window.innerWidth <= 768) {
        // Adjust padding for mobile
        document.querySelectorAll('.form-group').forEach(group => {
            group.style.marginBottom = '10px';
        });
    }
    
    // Handle orientation change
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.form-group').forEach(group => {
                group.style.marginBottom = '10px';
            });
            
            // Start animation if not running
            if (!animationInterval) {
                startMobileAutoAnimation();
            }
        } else {
            // Stop animation on desktop
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
                
                // Remove animations
                document.querySelectorAll('.info-card').forEach(card => {
                    card.style.animation = 'none';
                    card.style.transform = '';
                    card.style.boxShadow = '';
                });
                
                document.querySelectorAll('.info-icon').forEach(icon => {
                    icon.style.animation = 'none';
                });
                
                document.querySelectorAll('.info-card h3').forEach(title => {
                    title.style.animation = 'none';
                });
                
                document.querySelectorAll('.social-link').forEach(link => {
                    link.style.animation = 'none';
                });
            }
        }
    });
}

// ======================================
// NOTIFICATION SYSTEM
// ======================================

function showNotification(message, type = 'success') {
    const existingNotif = document.querySelector('.contact-notification');
    if (existingNotif) existingNotif.remove();

    const notification = document.createElement('div');
    notification.className = `contact-notification ${type}`;
    notification.innerHTML = `
        <i class="fa-brands fa-whatsapp"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ======================================
// WHATSAPP SHARE FUNCTION (For products)
// ======================================

function shareOnWhatsApp(productName, productPrice, productUrl) {
    const message = `
🛍️ *Check out this abaya from Aisha Abayas!*
    
Product: ${productName}
Price: Rs. ${productPrice}
Link: ${productUrl}

I found this on ${COMPANY_NAME} and thought you might like it!
    `;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
}

// ======================================
// WHATSAPP ORDER FUNCTION
// ======================================

function orderViaWhatsApp(cartItems) {
    let message = "🛍️ *NEW ORDER FROM AISHA ABayas*\n\n";
    
    cartItems.forEach((item, index) => {
        message += `${index + 1}. ${item.title}\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Qty: ${item.quantity}\n`;
        message += `   Price: Rs. ${item.price}\n\n`;
    });
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `💰 *Total: Rs. ${total}*\n\n`;
    message += `Please confirm my order. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodedMessage}`, '_blank');
}

// ======================================
// EXPORT FUNCTIONS (if needed)
// ======================================
window.shareOnWhatsApp = shareOnWhatsApp;
window.orderViaWhatsApp = orderViaWhatsApp;