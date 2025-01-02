// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const header = document.querySelector('header');

mobileMenuBtn.addEventListener('click', () => {
    header.classList.toggle('mobile-menu-open');
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


// Form submission handling
document.querySelector('.contact-form')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    try {
        const response = await fetch('http://localhost:3000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        alert('Message sent successfully!');
        this.reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending the message. Please try again later.');
    }
});


// Skill cards animation
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// Typing effect for hero text
function typeWriter() {
    const heroTextElement = document.querySelector('.hero-text p');
    if (!heroTextElement) return; // Guard clause in case element doesn't exist
    
    const heroText = "I am a passionate computer science student with a strong foundation in programming and web development. I am dedicated to learning and applying cutting-edge technologies to solve real-world problems.";
    heroTextElement.textContent = '';
    let i = 0;
    
    function type() {
        if (i < heroText.length) {
            heroTextElement.textContent += heroText.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    type();
}

// Copy email to clipboard when "Contact Me" button is clicked
const contactMeBtn = document.getElementById('contactMeBtn');
const contactPopup = document.getElementById('contactPopup');

function handleCopyText(element, originalText) {
    navigator.clipboard.writeText(originalText)
        .then(() => {
            element.textContent = 'Copied!';
            setTimeout(() => element.textContent = originalText, 1000);
        })
        .catch(err => console.error('Failed to copy: ', err));
}

document.addEventListener('DOMContentLoaded', () => {
    const switchInput = document.getElementById('switch');
    const body = document.body;

    // Add null check for switch input
    if (switchInput) {
        // Load the saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.classList.add(savedTheme);
            switchInput.checked = savedTheme === 'dark-mode';
        }

        switchInput.addEventListener('change', () => {
            if (switchInput.checked) {
                body.classList.add('dark-mode');
                body.classList.remove('light-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.add('light-mode');
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }

    // Add contact popup handling
    contactMeBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.style.display = contactPopup.style.display === 'none' ? 'block' : 'none';
    });

    const emailToCopy = document.getElementById('emailToCopy');
    const phoneToCopy = document.getElementById('phoneToCopy');

    emailToCopy?.addEventListener('click', () => 
        handleCopyText(emailToCopy, 'itsmenahomzewdu@gmail.com'));
    
    phoneToCopy?.addEventListener('click', () => 
        handleCopyText(phoneToCopy, '123-456-7890'));

    // Call typeWriter at the end of DOMContentLoaded
    typeWriter();
});

