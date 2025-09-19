// Nav highlight and scroll behavior
function highlightNav() {
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', highlightNav);