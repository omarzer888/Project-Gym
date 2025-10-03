const mode = document.getElementById("mode");
const body = document.querySelector("body");


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");

  mode.classList.remove("bi-sun-fill");
  mode.classList.add("bi-moon-fill");
} else {
  
  mode.classList.remove("bi-moon-fill");
  mode.classList.add("bi-sun-fill");
}


mode.onclick = () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    
    mode.classList.remove("bi-sun-fill");
    mode.classList.add("bi-moon-fill");
  } else {
    localStorage.setItem("theme", "light");
    
    mode.classList.remove("bi-moon-fill");
    mode.classList.add("bi-sun-fill");
  }
};








function smoothScrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); 
        window.scrollTo(0, start * (1 - progress));
        if (progress < 1) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

document.getElementById('scroll-up').addEventListener('click', () => {
    smoothScrollToTop(1500); 
});






  const colors = ["--bleu", "--ciel", "--vert", "--pistache", "--jaune", "--orange", "--rouge", "--violet"];
  let index = 1;

  
  (function () {
    const savedColor = localStorage.getItem("themeColor");
    if (savedColor) {
      document.documentElement.style.setProperty("--bleu-ciel", savedColor);

      
      const foundIndex = colors.findIndex(c => {
        return getComputedStyle(document.documentElement).getPropertyValue(c).trim() === savedColor.trim();
      });

      if (foundIndex !== -1) {
        index = (foundIndex + 1) % colors.length;
      }
    }
  })();

  document.getElementById("color").addEventListener("click", function () {
    let currentColor = colors[index];
    let value = getComputedStyle(document.documentElement).getPropertyValue(currentColor);

    
    document.documentElement.style.setProperty("--bleu-ciel", value);
    localStorage.setItem("themeColor", value);

    index = (index + 1) % colors.length;
  });








const arrows = document.querySelectorAll(".arow");
const moviListes = document.querySelectorAll(".movie-list");
arrows.forEach((arrow, i) => {
    const itemNumber = moviListes[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click",()=>{
        clickCounter++;
        if (itemNumber - (4 + clickCounter) >= 0) {
 moviListes[i].style.transform = `translateX(${
moviListes[i].computedStyleMap().get("transform")[0].x.value - 300
}px)`;

 } else{
    moviListes[i].style.transform = "translateX(0)";
    clickCounter = 0;
 }
});
console.log(moviListes[i].querySelectorAll("img").length);
    });






    document.addEventListener('DOMContentLoaded', () => {
      const menuToggle = document.querySelector('.menu-toggle');
      const navList = document.querySelector('.list');
  
      menuToggle.addEventListener('click', () => {
          navList.classList.toggle('active');
      });
  });








  // ========== ANIMATIONS AU SCROLL ==========

// Observer pour déclencher les animations au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('animated');
      }
  });
}, observerOptions);

// Fonction pour initialiser les animations au scroll
function initScrollAnimations() {
  // Ajouter les classes d'animation aux éléments
  const animationElements = [
      // Section Our Process
      { selector: '.our h1', animation: 'animate-on-scroll scale-in' },
      { selector: '.four div', animation: 'animate-on-scroll', delay: true },
      { selector: '.five div', animation: 'animate-on-scroll slide-left', delay: true },
      
      // Section Trainers
      { selector: '.trainers h1', animation: 'animate-on-scroll' },
      { selector: '.trainers .pik > div', animation: 'animate-on-scroll', delay: true },
      
      // Section Proteines
      { selector: '.proteines .grand', animation: 'animate-on-scroll scale-in' },
      { selector: '.proteines h1', animation: 'animate-on-scroll' },
      
      // Section Machines
      { selector: '.machines .gros', animation: 'animate-on-scroll' },
      { selector: '.machines h1', animation: 'animate-on-scroll' },
      { selector: '.movie-list-item', animation: 'animate-on-scroll slide-right', delay: true },
      
      // Section Pricing
      { selector: '.pricing h3', animation: 'animate-on-scroll scale-in' },
      { selector: '.pricing h1', animation: 'animate-on-scroll' },
      { selector: '.parent .child', animation: 'animate-on-scroll', delay: true },
      
      // Section Contact
      { selector: '.contactus h3', animation: 'animate-on-scroll' },
      
      // Footer
      { selector: '.fin > div', animation: 'animate-on-scroll', delay: true }
  ];

  animationElements.forEach(({ selector, animation, delay }) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element, index) => {
          element.classList.add(...animation.split(' '));
          
          if (delay) {
              element.style.animationDelay = `${index * 0.15}s`;
          }
          
          observer.observe(element);
      });
  });
}

// ========== COMPTEUR ANIMÉ POUR LES STATISTIQUES ==========

function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current.toLocaleString();
      if (progress < 1) {
          window.requestAnimationFrame(step);
      }
  };
  window.requestAnimationFrame(step);
}

function initCounterAnimations() {
  const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
              const element = entry.target;
              const text = element.textContent.trim();
              
              // Extraire le nombre du texte
              const match = text.match(/(\d+)/);
              if (match) {
                  const number = parseInt(match[1]);
                  element.classList.add('counted');
                  
                  // Animer le compteur
                  if (text.includes('+')) {
                      animateCounter(element, 0, number, 2000);
                  } else {
                      animateCounter(element, 0, number, 1500);
                  }
              }
          }
      });
  }, { threshold: 0.5 });

  // Observer les éléments de statistiques
  const statElements = document.querySelectorAll('.five div h3');
  statElements.forEach(el => counterObserver.observe(el));
}

// ========== EFFET PARALLAX SIMPLE ==========

function initParallaxEffect() {
  window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Effet parallax sur la section hero
      const heroSection = document.querySelector('.power');
      if (heroSection) {
          heroSection.style.transform = `translateY(${rate}px)`;
      }
  });
}

// ========== ANIMATION DE TYPING POUR LE TITRE PRINCIPAL ==========

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
      if (i < text.length) {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(type, speed);
      }
  }
  
  type();
}

function initTypingAnimation() {
  const title = document.querySelector('.power .athlete h1');
  if (title) {
      const originalText = title.textContent;
      // Attendre un peu avant de commencer l'animation
      setTimeout(() => {
          typeWriter(title, originalText, 80);
      }, 1000);
  }
}

// ========== ANIMATION DES CARTES AU HOVER ==========

function initCardHoverEffects() {
  // Animation des cartes de processus
  const processCards = document.querySelectorAll('.four div');
  processCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.05) translateY(-10px)';
      });
      
      card.addEventListener('mouseleave', () => {
          card.style.transform = 'scale(1) translateY(0)';
      });
  });

  // Animation des cartes de trainers
  const trainerCards = document.querySelectorAll('.trainers .pik > div');
  trainerCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
          const image = card.querySelector('.athl, .athl2, .athl3');
          if (image) {
              image.style.transform = 'scale(1.1)';
              image.style.filter = 'brightness(1.1)';
          }
      });
      
      card.addEventListener('mouseleave', () => {
          const image = card.querySelector('.athl, .athl2, .athl3');
          if (image) {
              image.style.transform = 'scale(1)';
              image.style.filter = 'brightness(1)';
          }
      });
  });
}

// ========== ANIMATION DE CHARGEMENT ==========

function showLoadingAnimation() {
  // Créer un overlay de chargement
  const loadingOverlay = document.createElement('div');
  loadingOverlay.id = 'loading-overlay';
  loadingOverlay.innerHTML = `
      <div class="loading-spinner">
          <div class="spinner"></div>
          <h2>POWER <span style="color: var(--bleu-ciel);">GYM</span></h2>
          <p>Loading your fitness journey...</p>
      </div>
  `;
  
  // Styles pour l'overlay
  loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, #191919, #27272a);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
  `;
  
  document.body.appendChild(loadingOverlay);
  
  // Animation du spinner
  const style = document.createElement('style');
  style.textContent = `
      .loading-spinner {
          text-align: center;
          color: white;
      }
      .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid var(--bleu-ciel) transparent;
          border-top: 3px solid var(--bleu-ciel);
          border-radius: 50%;
          margin: 0 auto 20px;
          animation: spin 1s linear infinite;
      }
      @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
      }
  `;
  document.head.appendChild(style);
  
  // Supprimer l'overlay après le chargement
  window.addEventListener('load', () => {
      setTimeout(() => {
          loadingOverlay.style.opacity = '0';
          setTimeout(() => {
              if (loadingOverlay.parentNode) {
                  loadingOverlay.parentNode.removeChild(loadingOverlay);
              }
          }, 500);
      }, 1000);
  });
}

// ========== ANIMATION DES BOUTONS ==========

function initButtonAnimations() {
  const buttons = document.querySelectorAll('button:not(.theme-btn), .login, .login2, .login10');
  
  buttons.forEach(button => {
      button.addEventListener('click', function(e) {
          // Créer l'effet de ripple
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
              position: absolute;
              width: ${size}px;
              height: ${size}px;
              left: ${x}px;
              top: ${y}px;
              background: rgba(255, 255, 255, 0.3);
              border-radius: 50%;
              transform: scale(0);
              animation: ripple 0.6s linear;
              pointer-events: none;
          `;
          
          this.style.position = 'relative';
          this.style.overflow = 'hidden';
          this.appendChild(ripple);
          
          setTimeout(() => {
              if (ripple.parentNode) {
                  ripple.parentNode.removeChild(ripple);
              }
          }, 600);
      });
  });
  
  // Ajouter l'animation ripple CSS
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
      @keyframes ripple {
          to {
              transform: scale(4);
              opacity: 0;
          }
      }
  `;
  document.head.appendChild(rippleStyle);
}

// ========== ANIMATION DE LA BARRE DE PROGRESSION DU SCROLL ==========

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--bleu-ciel), #07F6FB);
      z-index: 9999;
      transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
  });
}

// ========== INITIALISATION ==========

document.addEventListener('DOMContentLoaded', function() {
  // Démarrer l'animation de chargement
  showLoadingAnimation();
  
  // Initialiser toutes les animations après le chargement
  window.addEventListener('load', () => {
      setTimeout(() => {
          initScrollAnimations();
          initCounterAnimations();
          initParallaxEffect();
          initCardHoverEffects();
          initButtonAnimations();
          initScrollProgress();
          
          // Désactiver l'animation de typing pour ne pas interferer avec le design
          // initTypingAnimation(); // Décommenter si souhaité
      }, 1200);
  });
});

// ========== ANIMATIONS SUPPLÉMENTAIRES ==========

// Smooth scroll amélioré pour tous les liens d'ancrage
document.addEventListener('click', function(e) {
  if (e.target.matches('a[href^="#"]')) {
      e.preventDefault();
      const target = document.querySelector(e.target.getAttribute('href'));
      if (target) {
          target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
          });
      }
  }
});

// Animation au redimensionnement de la fenêtre
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
      // Réinitialiser certaines animations si nécessaire
      console.log('Window resized - animations adjusted');
  }, 250);
});





























      






























    


    







