const navbar = document.getElementById('navbar');

// Tambahkan event listener untuk 'scroll'
window.addEventListener('scroll', () => {
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});