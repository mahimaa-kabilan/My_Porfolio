/**
 * maimaa's little world ♡
 * Interactive vanilla JavaScript
 * Keyboard accessibility, smooth navigation, and cute interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initSemicircleAccessibility();
  initSubtleSparkles();
});

/**
 * Ensures the SVG semicircle sectors are 100% accessible via keyboard
 * and support Enter/Space activation.
 */
function initSemicircleAccessibility() {
  const sectorLinks = document.querySelectorAll('.sector-link');

  sectorLinks.forEach((sector) => {
    // Click navigation handler
    sector.addEventListener('click', (e) => {
      const href = sector.getAttribute('href') || sector.getAttribute('xlink:href');
      if (href) {
        window.location.href = href;
      }
    });

    // Keyboard activation (Enter or Space)
    sector.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = sector.getAttribute('href') || sector.getAttribute('xlink:href');
        if (href) {
          window.location.href = href;
        }
      }
    });

    // Gentle hover / focus sparkle effect
    sector.addEventListener('mouseenter', (e) => {
      createSparkleBurst(e.clientX, e.clientY);
    });
  });
}

/**
 * Creates a tiny, playful sparkle at coordinates (respects prefers-reduced-motion)
 */
function createSparkleBurst(x, y) {
  // Check if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Create 2-3 tiny sparkles
  const sparkleSymbols = ['✦', '✧', '⋆', '♡'];
  const colors = ['#FFD6E3', '#E7DEFF', '#FFE3D1', '#FFF2B2'];

  for (let i = 0; i < 2; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'mini-sparkle-burst';
    sparkle.textContent = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
    sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    const offsetX = (Math.random() - 0.5) * 36;
    const offsetY = (Math.random() - 0.5) * 36;

    sparkle.style.left = `${x + offsetX}px`;
    sparkle.style.top = `${y + offsetY}px`;
    
    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }
}

/**
 * Subtle sparkle burst CSS injected dynamically
 */
function initSubtleSparkles() {
  const style = document.createElement('style');
  style.textContent = `
    .mini-sparkle-burst {
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      font-size: 16px;
      animation: burstFloat 0.7s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
      user-select: none;
    }
    @keyframes burstFloat {
      0% {
        opacity: 0.9;
        transform: scale(0.6) translateY(0);
      }
      100% {
        opacity: 0;
        transform: scale(1.3) translateY(-24px) rotate(15deg);
      }
    }
  `;
  document.head.appendChild(style);
}
