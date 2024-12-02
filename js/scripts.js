document.addEventListener('DOMContentLoaded', () => {
    // Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    // Testimonial Carousel (if exists)
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    if (testimonials.length > 0) {
        let currentIndex = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
                showTestimonial(currentIndex);
            });
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(currentIndex);
            });
        }
    }

    // Scroll Animations
    const animatedElements = document.querySelectorAll('.hero, .features');

    function animateOnScroll() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Form Validation
    const form = document.querySelector('form');
    const submitButton = document.getElementById('submitButton');

    if (form && submitButton) {
        const nameInput = form.querySelector('input[placeholder="John Smith"]');
        const emailInput = document.getElementById('email');
        const messageTextarea = form.querySelector('textarea');
        const radioButtons = form.querySelectorAll('input[name="contact_reason"]');

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validation function
        function validateForm() {
            let isValid = true;
            let errorMessage = '';

            // Name validation
            if (nameInput && nameInput.value.trim() === '') {
                isValid = false;
                errorMessage += "Name is required.\n";
                nameInput.classList.add('error');
            } else if (nameInput) {
                nameInput.classList.remove('error');
            }

            // Email validation
            if (emailInput && emailInput.value.trim() === '') {
                isValid = false;
                errorMessage += "Email is required.\n";
                emailInput.classList.add('error');
            } else if (emailInput && !emailRegex.test(emailInput.value)) {
                isValid = false;
                errorMessage += "Please enter a valid email address.\n";
                emailInput.classList.add('error');
            } else if (emailInput) {
                emailInput.classList.remove('error');
            }

            // Message validation
            if (messageTextarea && messageTextarea.value.trim() === '') {
                isValid = false;
                errorMessage += "Message is required.\n";
                messageTextarea.classList.add('error');
            } else if (messageTextarea) {
                messageTextarea.classList.remove('error');
            }

            // Contact reason validation
            if (radioButtons) {
                const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked);
                if (!isRadioSelected) {
                    isValid = false;
                    errorMessage += "Please select a reason for contact.\n";
                }
            }

            // Display error message or submit form
            if (!isValid) {
                alert(errorMessage);
                return false;
            }

            return true;
        }

        // Add event listener to the submit button
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Validate the form
            if (validateForm()) {
                // If validation passes, you can submit the form or send data via AJAX
                submitFormData();
            }
        });

        // Optional: Real-time validation as user types
        if (nameInput) {
            nameInput.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
        }

        if (emailInput) {
            emailInput.addEventListener('input', function() {
                if (emailRegex.test(this.value)) {
                    this.classList.remove('error');
                }
            });
        }

        if (messageTextarea) {
            messageTextarea.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
        }

        // Function to submit form data
        function submitFormData() {
            // Collect form data
            const formData = {
                name: nameInput ? nameInput.value.trim() : '',
                email: emailInput ? emailInput.value.trim() : '',
                phone: form.querySelector('input[placeholder="(123) 456-7890"]') ?
                    form.querySelector('input[placeholder="(123) 456-7890"]').value.trim() : '',
                contactReason: document.querySelector('input[name="contact_reason"]:checked')?.value,
                otherReason: document.getElementById('otherType')?.value.trim(),
                message: messageTextarea ? messageTextarea.value.trim() : ''
            };

            // Example AJAX submission
            fetch('/submit-contact-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    alert('Form submitted successfully!');
                    form.reset(); // Reset the form
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem submitting the form. Please try again.');
                });
        }
    }
});