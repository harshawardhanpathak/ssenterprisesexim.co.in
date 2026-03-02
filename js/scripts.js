/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function: only on desktop (lg and up); no shrink on mobile
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;
        var isDesktop = window.innerWidth >= 992;
        var scrollThreshold = 20;
        if (!isDesktop || window.scrollY <= scrollThreshold) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Run on load (in case page is already scrolled) and on scroll
    navbarShrink();
    window.addEventListener('scroll', navbarShrink, { passive: true });
    window.addEventListener('resize', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Contact form: send via mailto to info@ssenterprisesexim.co.in
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const phone = (document.getElementById('phone') || {}).value || '';
            const message = (document.getElementById('message') || {}).value || '';
            const successEl = document.getElementById('submitSuccessMessage');
            const errorEl = document.getElementById('submitErrorMessage');

            // Indian mobile: 10 digits, first digit 6–9
            const mobileRegex = /^[6-9]\d{9}$/;
            const phoneValid = phone.replace(/\s/g, '').length === 10 && mobileRegex.test(phone.replace(/\s/g, ''));

            if (!name.trim() || !email.trim() || !phone.trim() || !message.trim() || !phoneValid) {
                contactForm.classList.add('was-validated');
                if (errorEl) {
                    errorEl.classList.remove('d-none');
                    errorEl.querySelector('.text-danger').textContent = !phoneValid && phone.trim() ? 'Enter a valid 10-digit mobile number (e.g. 9405434305).' : 'Please fill in all required fields.';
                    if (successEl) successEl.classList.add('d-none');
                }
                return;
            }
            contactForm.classList.remove('was-validated');

            const subject = 'Contact from SS Enterprises Exim website';
            const body = [
                'Name: ' + name,
                'Email: ' + email,
                'Phone: ' + phone,
                '',
                'Message:',
                message
            ].join('\n');

            const mailto = 'mailto:info@ssenterprisesexim.co.in?' +
                'subject=' + encodeURIComponent(subject) +
                '&body=' + encodeURIComponent(body);

            if (errorEl) errorEl.classList.add('d-none');
            if (successEl) successEl.classList.remove('d-none');
            window.location.href = mailto;
        });
    }

});
