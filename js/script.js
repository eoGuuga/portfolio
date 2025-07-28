const toggleButton = document.getElementById('toggleDarkMode');
const body = document.body;

function setDarkMode(isDark) {
  if (isDark) {
    body.classList.add('dark');
    toggleButton.setAttribute('aria-pressed', 'true');
    fadeIconChange('fas fa-sun', 'Alternar para modo claro');
  } else {
    body.classList.remove('dark');
    toggleButton.setAttribute('aria-pressed', 'false');
    fadeIconChange('fas fa-moon', 'Alternar para modo escuro');
  }
  localStorage.setItem('dark-mode', isDark);
}

function fadeIconChange(iconClass, title) {
  const icon = toggleButton.querySelector('i');
  icon.style.opacity = '0';

  setTimeout(() => {
    icon.className = iconClass;
    icon.style.opacity = '1';
    toggleButton.title = title;
  }, 250);
}

toggleButton.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setDarkMode(!isDark);

  // Animação de clique (pop)
  toggleButton.style.transform = 'scale(0.9)';
  setTimeout(() => {
    toggleButton.style.transform = 'scale(1)';
  }, 150);
});

// Ativa dark mode conforme localStorage na carga da página
document.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('dark-mode') === 'true';
  setDarkMode(savedMode);
});

// Função para aplicar fade-in nos projetos ao scroll usando Intersection Observer
function fadeInOnScroll() {
  const projects = document.querySelectorAll('.project');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  projects.forEach(proj => {
    proj.classList.add('fade-in'); // adiciona classe inicial invisível
    observer.observe(proj);
  });
}

document.addEventListener('DOMContentLoaded', fadeInOnScroll);
