(() => {
  const localeBase = new URL('locales/', document.currentScript.src);
  const registry = window.KTM_LOCALE_REGISTRY;
  const defaultLanguage = window.KTM_DEFAULT_LANGUAGE;
  const messages = { [defaultLanguage]: window.KTM_DEFAULT_MESSAGES };
  const themes = ['system', 'dark', 'light', 'plum', 'terminal'];
  const system = matchMedia('(prefers-color-scheme: light)');
  let language = defaultLanguage, theme = 'system', initialLanguage = defaultLanguage, requestVersion = 0;
  try {
    initialLanguage = localStorage.getItem('ktm-language') || defaultLanguage;
    theme = localStorage.getItem('ktm-theme') || 'system';
  } catch {}
  if (!Object.hasOwn(registry, initialLanguage)) initialLanguage = defaultLanguage;
  if (!themes.includes(theme)) theme = 'system';
  function t(key) { return messages[language][key] || messages[defaultLanguage][key] || key; }
  function apply() {
    document.documentElement.lang = language;
    document.documentElement.dir = registry[language].dir;
    document.documentElement.dataset.theme = theme === 'system' ? (system.matches ? 'light' : 'dark') : theme;
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-label]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nLabel)); });
    document.querySelectorAll('[data-language]').forEach(el => { el.value = language; });
    document.querySelectorAll('[data-theme-select]').forEach(el => { el.value = theme; });
    window.dispatchEvent(new CustomEvent('ktm-preferences'));
  }
  async function loadLanguage(next) {
    if (!Object.hasOwn(registry, next)) return;
    const version = ++requestVersion;
    document.querySelectorAll('[data-language]').forEach(el => el.setAttribute('aria-busy', 'true'));
    try {
      if (!messages[next]) {
        const response = await fetch(new URL(next + '.json', localeBase), { credentials: 'same-origin' });
        if (!response.ok) throw Error('Locale unavailable');
        const candidate = await response.json();
        const expected = Object.keys(messages[defaultLanguage]);
        if (Object.keys(candidate).length !== expected.length || expected.some(key => typeof candidate[key] !== 'string' || !candidate[key].trim())) throw Error('Incomplete locale');
        messages[next] = candidate;
      }
      if (version !== requestVersion) return;
      language = next;
      try { localStorage.setItem('ktm-language', language); } catch {}
      apply();
    } catch {
      // Keep the previous, fully loaded language rather than silently mixing translations.
      if (version === requestVersion) {
        apply();
        document.querySelectorAll('[data-language]').forEach(el => el.setCustomValidity(t('errorOffline')));
        document.querySelector('[data-language]')?.reportValidity();
      }
    } finally {
      if (version === requestVersion) document.querySelectorAll('[data-language]').forEach(el => el.removeAttribute('aria-busy'));
    }
  }
  let readyResolve;
  const ready = new Promise(resolve => { readyResolve = resolve; });
  window.KTM_UI = {t, apply, ready, registry, messages, get language() { return language; }, get theme() { return theme; }};
  document.addEventListener('DOMContentLoaded', async () => {
    document.querySelectorAll('[data-language]').forEach(el => {
      el.replaceChildren();
      for (const [code, meta] of Object.entries(registry)) {
        const option = document.createElement('option'); option.value = code; option.textContent = meta.name; option.lang = code; el.append(option);
      }
      el.value = language;
      el.addEventListener('change', () => { el.setCustomValidity(''); loadLanguage(el.value); });
    });
    document.querySelectorAll('[data-theme-select]').forEach(el => el.addEventListener('change', () => {
      theme = el.value;
      try { localStorage.setItem('ktm-theme', theme); } catch {}
      apply();
    }));
    apply();
    await loadLanguage(initialLanguage);
    readyResolve();
  });
  system.addEventListener('change', apply);
  document.documentElement.dataset.theme = theme === 'system' ? (system.matches ? 'light' : 'dark') : theme;
})();
