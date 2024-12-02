document.addEventListener('DOMContentLoaded', () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    // Scroll animations
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
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const submitButton = document.getElementById('submitButton');
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
        if (nameInput.value.trim() === '') {
            isValid = false;
            errorMessage += "Name is required.\n";
            nameInput.classList.add('error');
        } else {
            nameInput.classList.remove('error');
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            isValid = false;
            errorMessage += "Email is required.\n";
            emailInput.classList.add('error');
        } else if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            errorMessage += "Please enter a valid email address.\n";
            emailInput.classList.add('error');
        } else {
            emailInput.classList.remove('error');
        }

        // Message validation
        if (messageTextarea.value.trim() === '') {
            isValid = false;
            errorMessage += "Message is required.\n";
            messageTextarea.classList.add('error');
        } else {
            messageTextarea.classList.remove('error');
        }

        // Contact reason validation
        const isRadioSelected = Array.from(radioButtons).some(radio => radio.checked);
        if (!isRadioSelected) {
            isValid = false;
            errorMessage += "Please select a reason for contact.\n";
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
    nameInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('error');
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailRegex.test(this.value)) {
            this.classList.remove('error');
        }
    });

    messageTextarea.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.remove('error');
        }
    });

    // Function to submit form data (you'll need to implement this)
    function submitFormData() {
        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: form.querySelector('input[placeholder="(123) 456-7890"]').value.trim(),
            contactReason: document.querySelector('input[name="contact_reason"]:checked')?.value,
            otherReason: document.getElementById('otherType')?.value.trim(),
            message: messageTextarea.value.trim()
        };

        // Example AJAX submission (you'll need to replace with your backend endpoint)
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
});