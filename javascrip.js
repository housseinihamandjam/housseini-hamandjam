
// Sélectionne tous les éléments à animer
const fadeElements = document.querySelectorAll('.fade-in, .fade-left, .fade-right');

// Vérifie si IntersectionObserver est supporté
if ('IntersectionObserver' in window) {

  // Crée l'observateur
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // Détermine l'index pour le délai de cascade
        const index = Array.from(fadeElements).indexOf(entry.target);
        const delay = index * 0.2; // 0.2s entre chaque élément

        // Applique le délai via style inline
        entry.target.style.transitionDelay = `${delay}s`;

        // Ajoute les classes pour l'animation
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('fade-left')) {
          entry.target.classList.add('animate-left');
        } else if (entry.target.classList.contains('fade-right')) {
          entry.target.classList.add('animate-right');
        }

        // Stoppe l'observation pour cet élément
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  // Lance l’observation avec cascade
  fadeElements.forEach(el => observer.observe(el));

} else {
  // Fallback pour navigateurs anciens : tout devient visible immédiatement
  fadeElements.forEach(el => el.classList.add('visible'));
}