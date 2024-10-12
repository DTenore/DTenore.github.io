function getGreeting() {
    const hours = new Date().getHours();
    const greeting = hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
    document.getElementById("greeting").innerText = `${greeting}${document.getElementById("greeting").innerText}`;
}

function toggleNav(expand) {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const links = document.querySelectorAll('nav a');

    header.style.height = expand ? 'var(--header-expanded)' : 'var(--header-collapsed)';
    hamburger.innerText = expand ? "✖" : "☰";
    links.forEach(link => link.style.opacity = expand ? '1' : '1');
}

function collapseNav() {
    toggleNav(false);
}

document.querySelector('.hamburger').addEventListener('click', () => {
    const isExpanded = document.querySelector('header').style.height === 'var(--header-expanded)';
    toggleNav(!isExpanded);
});

document.querySelectorAll('nav a, .name').forEach(el => {
    el.addEventListener('click', collapseNav);
});

document.addEventListener('click', (event) => {
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    if (header.style.height === 'var(--header-expanded)' && !header.contains(event.target) && !hamburger.contains(event.target)) {
        collapseNav();
    }
});

['scroll', 'resize'].forEach(evt => {
    window.addEventListener(evt, () => {
        if (evt === 'scroll' || window.getComputedStyle(document.querySelector('.hamburger')).display === 'none') {
            collapseNav();
        }
    });
});

window.addEventListener('load', () => {
    // Animate the header content immediately
    document.querySelector('.header-content').classList.add('animate');

    const animateTexts = document.querySelectorAll('.animate-text');
    const animateImage = document.querySelector('.animate-image');

    animateTexts.forEach((el, index) => {
        if (index === 0) {
            // Introduce a slight delay for the first text item
            el.classList.add('animate');

        } else {
            // Animate subsequent text items with a delay based on their index
            setTimeout(() => {
                el.classList.add('animate');

                // Animate the image when the second text item is animated
                if (index === 1 && animateImage) { // index starts at 0
                    animateImage.classList.add('animate');
                }
            }, index * 600 + 200); 
        }
    });

    // Animate sections after all text items have been animated
    setTimeout(() => {
        document.querySelectorAll('.section-hidden').forEach((section, index) => {
            setTimeout(() => section.classList.add('section-visible'), 500 * index);
        });
    }, animateTexts.length * 600);
});


function checkScrollPosition() {
    document.getElementById('bottom-gradient').style.display = (window.innerHeight + window.scrollY >= document.body.offsetHeight) ? 'none' : 'block';
}

window.addEventListener('scroll', checkScrollPosition);
window.addEventListener('load', checkScrollPosition);

document.addEventListener('DOMContentLoaded', () => {
    const goToTopButton = document.getElementById('goToTopMobile');
    const educationSection = document.getElementById('education');

    function handleScroll() {
        goToTopButton.style.display = educationSection.getBoundingClientRect().top <= window.innerHeight * 0.8 ? 'flex' : 'none';
    }

    function checkMedia() {
        if (window.innerWidth < 550) {
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        } else {
            goToTopButton.style.display = 'none';
            window.removeEventListener('scroll', handleScroll);
        }
    }

    checkMedia();
    window.addEventListener('resize', checkMedia);
});