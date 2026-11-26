(() => {
  // A citation or an old bookmark may point into the folded evidence.
  const revealFragment = (hash) => {
    if (!hash) return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); }
    catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    for (let node = target; node; node = node.parentElement) {
      if (node instanceof HTMLDetailsElement) node.open = true;
    }
  };
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#"]');
    if (link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) revealFragment(link.hash);
  });
  window.addEventListener('hashchange', () => revealFragment(location.hash));
  revealFragment(location.hash);

  // The scenarios and explanations are ordinary HTML. Only the choices need JS.
  for (const card of document.querySelectorAll('[data-reading-case]')) {
    const choices = card.querySelector('[data-reading-choices]');
    const answer = card.querySelector('.reading-answer');
    const feedback = card.querySelector('[data-reading-feedback]');
    const options = [...card.querySelectorAll('[data-reading-choice]')];
    if (!choices || !answer || !feedback || !options.length) continue;

    for (const option of options) {
      option.addEventListener('click', () => {
        for (const button of options) {
          button.setAttribute('aria-pressed', String(button === option));
        }
        feedback.textContent = option.dataset.readingChoice === card.dataset.readingAnswer
          ? 'Yes — this fits the contribution. Here is why.'
          : 'A closer reading suggests a different role. Here is why.';
        answer.hidden = false;
        answer.open = true;
      });
    }
    answer.hidden = true;
    choices.hidden = false;
  }

  const countVisual = document.getElementById('count-visual');
  const countList = document.getElementById('count-people');
  const countToggle = document.getElementById('count-unique');
  const countTotal = document.getElementById('count-total');
  const countExplanation = document.getElementById('count-explanation');
  const matrixRows = [...document.querySelectorAll('.recurrence-matrix tbody tr[data-person]')];

  if (countVisual && countList && countToggle && countTotal && countExplanation && matrixRows.length) {
    // Read the existing evidence, rather than maintain a second list of people.
    const people = matrixRows.map((row) => ({
      id: row.dataset.person,
      name: row.querySelector('th[scope="row"]').textContent.trim(),
      role: row.querySelector('td').textContent.trim(),
      cases: [...row.querySelectorAll('[data-present="true"]')].map((cell) => cell.dataset.case)
    }));
    const appearances = people.flatMap((person) => person.cases.map((caseId) => ({ ...person, cases: [caseId] })));
    const recurring = people.filter((person) => person.cases.length > 1)
      .map((person) => `${person.name} appears in ${person.cases.join(' and ')}`).join('; ');

    const renderCount = (unique) => {
      const records = unique ? people : appearances;
      const fragment = document.createDocumentFragment();
      for (const person of records) {
        const item = document.createElement('li');
        item.dataset.person = person.id;
        const name = document.createElement('strong');
        name.textContent = person.name;
        const role = document.createElement('span');
        role.className = 'count-person-role';
        role.textContent = person.role === 'Institution' ? 'Institutional representation' : 'Specialist interpretation';
        const links = document.createElement('span');
        links.className = 'count-case-links';
        for (const caseId of person.cases) {
          const link = document.createElement('a');
          link.href = `#case-${caseId}`;
          link.textContent = caseId;
          link.setAttribute('aria-label', `${person.name}, case ${caseId}`);
          links.append(link);
        }
        item.append(name, role, links);
        fragment.append(item);
      }
      countList.replaceChildren(fragment);
      countList.setAttribute('aria-label', unique ? 'Distinct people' : 'Source appearances');
      countTotal.textContent = `${records.length} ${unique ? 'distinct people' : 'appearances'}`;
      countToggle.setAttribute('aria-pressed', String(unique));
      countExplanation.textContent = unique
        ? `${records.length} distinct people. ${recurring}. Each person now has one card, with every article reference retained.`
        : `${records.length} appearances. Each card counts one named person in one article. Article labels link back to the case reports.`;
    };
    countToggle.addEventListener('click', () => renderCount(countToggle.getAttribute('aria-pressed') !== 'true'));
    renderCount(false);
    countVisual.hidden = false;
  }

  // A printed copy includes the answers even if the reader has not tried them.
  let printAnswers = [];
  window.addEventListener('beforeprint', () => {
    printAnswers = [...document.querySelectorAll('.role-practice, .reading-answer')].map((answer) => ({
      answer, hidden: answer.hidden, open: answer.open
    }));
    for (const { answer } of printAnswers) {
      answer.hidden = false;
      answer.open = true;
    }
  });
  window.addEventListener('afterprint', () => {
    for (const { answer, hidden, open } of printAnswers) {
      answer.hidden = hidden;
      answer.open = open;
    }
    printAnswers = [];
  });

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
    if ('ResizeObserver' in window) {
      new ResizeObserver(queueProgress).observe(document.body);
    }
    updateProgress();
  }
})();
