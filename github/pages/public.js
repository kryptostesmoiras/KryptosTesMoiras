const menu = document.querySelector('.mobile-menu');
const nav = document.querySelector('#public-nav');
function closeMenu() { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('open'); }
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav?.classList.toggle('open', open);
});
nav?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu?.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
});
// The search index is not connected. Queries stay in this page: no request,
// URL parameter, browser storage, analytics event, or simulated results.
document.querySelector('#public-search')?.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('.search-status');
  status.setAttribute('role', 'status');
  status.textContent = KTM_UI.t('searchUnavailable');
  status.classList.add('search-status-active');
});
