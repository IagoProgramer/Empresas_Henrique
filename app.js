document.addEventListener('DOMContentLoaded', () => {
  // About section animations
  const aboutSection = document.querySelector('.about-me');
  const profileImage = document.querySelector('.profile-image');
  const profileText = document.querySelector('.profile-text');
  const profileSkills = document.querySelectorAll('.profile-skills span');
  const socialLinks = document.querySelectorAll('.social-link');

  // Menu dropdown
  const menuToggle = document.querySelector('.menu-toggle');
  const dropdown = document.querySelector('.dropdown');

  if (menuToggle && dropdown) {
    menuToggle.addEventListener('click', () => {
      dropdown.classList.toggle('show');
    });

    window.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && e.target !== menuToggle) {
        dropdown.classList.remove('show');
      }
    });
  }

  // Animate skills with staggered delay
  profileSkills.forEach((skill, index) => {
    skill.style.animationDelay = `${1.3 + (index * 0.1)}s`;

    skill.addEventListener('mouseover', () => {
      skill.style.transform = 'translateY(-5px) scale(1.1)';
    });

    skill.addEventListener('mouseout', () => {
      skill.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Floating particles effect
  for (let i = 0; i < 30; i++) {
    createParticle(aboutSection);
  }

  // Interactive profile image
  profileImage.addEventListener('mousemove', (e) => {
    const bounds = profileImage.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const angleX = (mouseY - centerY) / 30;
    const angleY = (centerX - mouseX) / 30;

    profileImage.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
  });

  profileImage.addEventListener('mouseleave', () => {
    profileImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });

  // Animate on scroll
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        profileImage.style.animation = 'profilePulse 3s infinite alternate';
        profileText.style.animation = 'fadeIn 1s forwards';

        profileSkills.forEach((skill, index) => {
          skill.style.animation = `skillsIn 0.4s forwards ${index * 0.1}s`;
          skill.style.opacity = '0';
          skill.style.transform = 'translateY(20px)';
        });

        socialLinks.forEach((link, index) => {
          link.style.animation = `socialIn 0.5s forwards ${index * 0.2 + 0.8}s`;
          link.style.opacity = '0';
          link.style.transform = 'translateX(-20px)';
        });

        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  scrollObserver.observe(aboutSection);

  // Keyframes style
  const style = document.createElement('style');
  style.textContent = `
    @keyframes profilePulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 194, 255, 0.7); }
      50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(0, 194, 255, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 194, 255, 0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes skillsIn {
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes socialIn {
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
    .profile-text h3 {
      position: relative;
      display: inline-block;
    }
    .profile-text h3::after {
      content: '';
      position: absolute;
      width: 0;
      height: 3px;
      bottom: -5px;
      left: 0;
      background: var(--accent);
      animation: lineGrow 1.5s forwards 0.5s;
    }
    @keyframes lineGrow {
      to { width: 100%; }
    }
    .profile-skills span {
      position: relative;
      overflow: hidden;
    }
    .profile-skills span::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 194, 255, 0.3);
      transform: translateX(-100%);
      animation: skillFlash 3s infinite;
      animation-delay: var(--delay, 0s);
    }
    @keyframes skillFlash {
      0% { transform: translateX(-100%); }
      20%, 30% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  `;
  document.head.appendChild(style);

  // Delay for skills
  profileSkills.forEach((skill, index) => {
    skill.style.setProperty('--delay', `${index * 0.5}s`);
  });
});

function createParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 15 + 5;
  const speedX = (Math.random() - 0.5) * 2;
  const speedY = Math.random() * -1 - 0.5;
  const startPos = Math.random() * 100;

  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: rgba(0, 194, 255, ${Math.random() * 0.3});
    border-radius: 50%;
    left: ${startPos}%;
    bottom: -20px;
    pointer-events: none;
  `;

  container.appendChild(particle);

  let posX = startPos;
  let posY = -20;

  function updatePosition() {
    posX += speedX;
    posY += speedY;

    particle.style.left = `${posX}%`;
    particle.style.bottom = `${posY}px`;

    if (posY < -30) {
      particle.remove();
      createParticle(container);
    } else {
      requestAnimationFrame(updatePosition);
    }
  }

  requestAnimationFrame(updatePosition);
}
