(function() {
  const STORAGE_KEY = 'fintrak-theme';
  const stored = localStorage.getItem(STORAGE_KEY);
  let theme = 'dark';
  
  if (stored === 'light' || stored === 'dark') {
    theme = stored;
  } else if (stored === 'system' || !stored) {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    theme = prefersLight ? 'light' : 'dark';
  }
  
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
})();

