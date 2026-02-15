// ===== LATINOAMERICANA GLOBAL - SCRIPT.JS =====

(function () {
    'use strict';

    // DOM Elements
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');
    var contactForm = document.getElementById('contactForm');
    var allNavLinks = document.querySelectorAll('.nav-link');
    var sections = document.querySelectorAll('section[id]');

    // ===== MOBILE MENU TOGGLE =====
    navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        // Animate hamburger
        var spans = navToggle.querySelectorAll('span');
        if (navLinks.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu on link click
    var allMenuLinks = navLinks.querySelectorAll('a');
    for (var i = 0; i < allMenuLinks.length; i++) {
        allMenuLinks[i].addEventListener('click', function () {
            navLinks.classList.remove('open');
            var spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    var lastScroll = 0;

    function handleScroll() {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;

        // Update active nav link
        updateActiveLink();
    }

    // ===== ACTIVE LINK ON SCROLL =====
    function updateActiveLink() {
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        var windowHeight = window.innerHeight;
        var offset = windowHeight * 0.35;

        for (var i = sections.length - 1; i >= 0; i--) {
            var section = sections[i];
            var sectionTop = section.offsetTop - 100;
            var sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPos >= sectionTop - offset && scrollPos < sectionBottom) {
                var targetId = section.getAttribute('id');

                for (var j = 0; j < allNavLinks.length; j++) {
                    allNavLinks[j].classList.remove('active');
                    var href = allNavLinks[j].getAttribute('href');
                    if (href === '#' + targetId) {
                        allNavLinks[j].classList.add('active');
                    }
                }
                break;
            }
        }
    }

    // Throttle scroll events
    var scrollTimeout;
    window.addEventListener('scroll', function () {
        if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = requestAnimationFrame(handleScroll);
    });

    // ===== SMOOTH SCROLL =====
    var smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (var k = 0; k < smoothLinks.length; k++) {
        smoothLinks[k].addEventListener('click', function (e) {
            var href = this.getAttribute('href');
            if (href && href.length > 1) {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var navbarHeight = navbar.offsetHeight;
                    var targetPosition = target.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }

    // ===== FORM VALIDATION =====
    function validateEmail(email) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(inputId, errorId, message) {
        var input = document.getElementById(inputId);
        var error = document.getElementById(errorId);
        if (input) input.classList.add('error');
        if (error) error.textContent = message;
    }

    function clearError(inputId, errorId) {
        var input = document.getElementById(inputId);
        var error = document.getElementById(errorId);
        if (input) input.classList.remove('error');
        if (error) error.textContent = '';
    }

    function clearAllErrors() {
        clearError('nombre', 'errorNombre');
        clearError('email', 'errorEmail');
        clearError('mensaje', 'errorMensaje');
    }

    // Real-time clearing of errors on input
    var formInputs = ['nombre', 'email', 'mensaje'];
    var formErrors = ['errorNombre', 'errorEmail', 'errorMensaje'];

    for (var m = 0; m < formInputs.length; m++) {
        (function (index) {
            var input = document.getElementById(formInputs[index]);
            if (input) {
                input.addEventListener('input', function () {
                    clearError(formInputs[index], formErrors[index]);
                });
            }
        })(m);
    }

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearAllErrors();

        var nombre = document.getElementById('nombre').value.trim();
        var email = document.getElementById('email').value.trim();
        var mensaje = document.getElementById('mensaje').value.trim();
        var isValid = true;

        // Validate nombre
        if (!nombre) {
            showError('nombre', 'errorNombre', 'Por favor, ingrese su nombre.');
            isValid = false;
        } else if (nombre.length < 2) {
            showError('nombre', 'errorNombre', 'El nombre debe tener al menos 2 caracteres.');
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError('email', 'errorEmail', 'Por favor, ingrese su correo electrónico.');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'errorEmail', 'Por favor, ingrese un correo electrónico válido.');
            isValid = false;
        }

        // Validate mensaje
        if (!mensaje) {
            showError('mensaje', 'errorMensaje', 'Por favor, ingrese su mensaje.');
            isValid = false;
        } else if (mensaje.length < 10) {
            showError('mensaje', 'errorMensaje', 'El mensaje debe tener al menos 10 caracteres.');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            var successDiv = document.getElementById('formSuccess');
            var submitBtn = contactForm.querySelector('.btn-submit');

            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';

            // Simulate sending delay
            setTimeout(function () {
                successDiv.style.display = 'block';
                submitBtn.textContent = 'Mensaje enviado';
                submitBtn.style.background = '#25D366';

                // Reset form
                contactForm.reset();

                // Reset button after delay
                setTimeout(function () {
                    submitBtn.textContent = 'Enviar mensaje';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    successDiv.style.display = 'none';
                }, 5000);
            }, 1200);
        }
    });

    // ===== SCROLL REVEAL ANIMATION =====
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.service-card, .pricing-card, .about-card, .contact-item, .value-item');
        var windowHeight = window.innerHeight;

        for (var r = 0; r < reveals.length; r++) {
            var revealTop = reveals[r].getBoundingClientRect().top;
            var revealPoint = 120;

            if (revealTop < windowHeight - revealPoint) {
                reveals[r].style.opacity = '1';
                reveals[r].style.transform = reveals[r].style.transform || 'translateY(0)';
            }
        }
    }

    // Initial calls
    handleScroll();
    revealOnScroll();

    window.addEventListener('scroll', revealOnScroll);

})();
