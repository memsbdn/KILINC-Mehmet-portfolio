/**
 * Portfolio Global Logic - Mehmet KILINC
 */

// 1. Page Loader
window.addEventListener('load', () => {
    const bar = document.getElementById('loader-bar');
    const loader = document.getElementById('page-loader');
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => { loader.style.display = 'none'; }, 500);
        }
    }, 300);
});

// 2. Dark Mode Logic
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
    
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = targetTheme === 'dark' ? '☀️' : '🌙';
};

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);

// 3. Scroll Reveal & Skill Bars
const observerOptions = { threshold: 0.1 };
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Specific logic for skill bars inside a revealed section
            const bars = entry.target.querySelectorAll('.progress-fill');
            bars.forEach(bar => bar.style.width = bar.getAttribute('data-width'));
        }
    });
}, observerOptions);

// Observe elements and check immediately if any are already in view
document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// 4. Smooth Page Transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#') && !link.getAttribute('target') && href.endsWith('.html')) {
            e.preventDefault();
            const loader = document.getElementById('page-loader');
            if (loader) {
                loader.style.display = 'block';
                loader.style.pointerEvents = 'all';
                setTimeout(() => { loader.style.opacity = '1'; }, 10);
            }
            setTimeout(() => { window.location.href = href; }, 500);
        }
    });
});

// 5. Scroll to Top
const scrollToTopButton = document.querySelector('.scroll-to-top');
if (scrollToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });
}

// 5. Modal Controls
function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden';
}

function closeModal(event, id) {
    if (event === null || event.target.id === id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.remove('active');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
        document.body.style.overflow = 'auto';
    }
}