(() => {
  const legacyPanel = document.getElementById('role-legacy');
  const webPanel = document.getElementById('role-web');
  const context = document.getElementById('comparison-context');
  const buttons = [...document.querySelectorAll('[data-medium-button]')];

  if (legacyPanel && webPanel && context && buttons.length === 2) {
    document.documentElement.classList.add('js');

    const setMedium = (medium) => {
      const isLegacy = medium === 'legacy';
      legacyPanel.hidden = !isLegacy;
      webPanel.hidden = isLegacy;
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.mediumButton === medium));
      }
      context.textContent = isLegacy
        ? 'Global 2025, print, radio and television: 23% expert sources; 42% personal-experience sources. Gap: 19 percentage points. Source: final GMMP report, Figures 16–17.'
        : 'Global 2025, news websites: 28% expert sources; 39% personal-experience sources. Gap: 11 percentage points. Source: final GMMP report, Figures 16–17.';
    };

    for (const button of buttons) {
      button.addEventListener('click', () => setMedium(button.dataset.mediumButton));
    }
    setMedium('legacy');
  }

  const progress = document.getElementById('reading-progress');
  if (progress) {
    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? Math.min(100, Math.max(0, window.scrollY / maxScroll * 100)) : 100;
      progress.style.width = `${percent}%`;
    };
    const queueProgress = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', queueProgress, { passive: true });
    window.addEventListener('resize', queueProgress);
    updateProgress();
  }
})();
