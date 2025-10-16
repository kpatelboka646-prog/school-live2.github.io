// ==========================================
// SNS School Balotra - Interactive JavaScript
// All Updates Applied
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // MENU FUNCTIONALITY - STRETCHABLE
    // ==========================================

    const menuBtn = document.getElementById('menuBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    // Open Menu
    menuBtn.addEventListener('click', function() {
        menuOverlay.classList.add('active');

        // Disable body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
    });

    // Close Menu - Cross Button
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', function() {
            menuOverlay.classList.remove('active');

            // Enable body scroll
            document.body.style.overflow = '';
            document.body.style.height = '';
        });
    }

    // Close menu on internal links
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('http')) {
                setTimeout(() => {
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.style.height = '';
                }, 200);
            }
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
    });

    // ==========================================
    // NOTIFICATION BUTTON
    // ==========================================

    const notificationBtn = document.getElementById('notificationBtn');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            window.location.href = 'notifications.html';
        });
    }

    // ==========================================
    // SLIDER FUNCTIONALITY
    // ==========================================

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const underlineLinks = document.querySelectorAll('.underline-link');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        underlineLinks.forEach(link => link.classList.remove('active'));

        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        slides[currentSlide].classList.add('active');
        underlineLinks[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Navigation buttons
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Interactive underlined text
    underlineLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            showSlide(index);
        });
    });

    // ==========================================
    // TOUCH SWIPE SUPPORT
    // ==========================================

    let touchStartX = 0;
    let touchEndX = 0;

    const sliderWrapper = document.querySelector('.slider-wrapper');

    if (sliderWrapper) {
        sliderWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        sliderWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // ==========================================
    // GALLERY HORIZONTAL SCROLL
    // ==========================================

    const galleryScroll = document.querySelector('.gallery-scroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (galleryScroll && scrollLeftBtn && scrollRightBtn) {
        const scrollAmount = 300;

        scrollRightBtn.addEventListener('click', function() {
            galleryScroll.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollLeftBtn.addEventListener('click', function() {
            galleryScroll.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide/show buttons based on scroll position
        galleryScroll.addEventListener('scroll', function() {
            // Show/hide left button
            if (galleryScroll.scrollLeft > 0) {
                scrollLeftBtn.style.display = 'flex';
            } else {
                scrollLeftBtn.style.display = 'none';
            }

            // Show/hide right button
            if (galleryScroll.scrollLeft < (galleryScroll.scrollWidth - galleryScroll.clientWidth)) {
                scrollRightBtn.style.display = 'flex';
            } else {
                scrollRightBtn.style.display = 'none';
            }
        });

        // Initially hide left button
        scrollLeftBtn.style.display = 'none';
    }

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================

    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        if (index >= testimonialSlides.length) {
            currentTestimonial = 0;
        } else if (index < 0) {
            currentTestimonial = testimonialSlides.length - 1;
        } else {
            currentTestimonial = index;
        }
        
        testimonialSlides[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 5000);
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(testimonialInterval);
            showTestimonial(index);
            // Restart interval
            testimonialInterval = setInterval(() => {
                showTestimonial(currentTestimonial + 1);
            }, 5000);
        });
    });

    // ==========================================
    // FORM SUBMISSION
    // ==========================================

    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Disable button immediately
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

            // Prepare form data
            const formData = new FormData(contactForm);

            // Submit to Formspree
            fetch('https://formspree.io/f/movkybzw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // SUCCESS
                    contactForm.innerHTML = `
                        <div class="form-message success">
                            <h3><i class="fa-solid fa-check-circle"></i> Inquiry Sent Successfully!</h3>
                            <p>Thank you for contacting SNS School Balotra.</p>
                            <p>We have received your inquiry and will respond within 24 hours.</p>
                            <p style="margin-top: 15px;">For urgent matters, please call us at <a href="tel:+916377663613">+91 6377663613</a></p>
                        </div>
                    `;
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                // ERROR - Re-enable button
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Submit Inquiry';
                alert('There was an error submitting the form. Please try again or contact us directly at +91 6377663613');
                console.error('Form submission error:', error);
            });
        });
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Initialize
    showSlide(0);
    showTestimonial(0);


});
