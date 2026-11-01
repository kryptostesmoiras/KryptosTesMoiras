import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowDownToLine, ArrowRight, ArrowUpRight, BookOpen, ChevronRight,
  Code2, Compass, ExternalLink, FileText, FolderGit2, Globe2, Languages,
  LockKeyhole, Menu, Monitor, Search, SearchX, Server, ShieldCheck, SlidersHorizontal, X,
} from 'lucide-react';
import { languageNames, themes, usePreferences, type Language, type MessageKey, type Theme } from './preferences';
import catalog from './data/spec-catalog.json';
import { releaseTargets, publicReleaseUrl } from './releases';

const repository = 'https://github.com/kryptostesmoiras/KryptosTesMoiras/blob/main/';
const readme = repository + 'ReadMe.md';
const requirements = readme + '#public-search-desktop-client-and-anonymous-accounts';
const categories = Object.keys(catalog.pages) as Array<keyof typeof catalog.pages>;
type Route = 'explore' | 'desktop' | 'docs' | 'specs';
function currentRoute(): Route {
  const route = location.hash.slice(2).split('/')[0];
  return ['desktop', 'docs', 'specs'].includes(route) ? route as Route : 'explore';
}

function PreferenceControls() {
  const { t, language, setLanguage, theme, setTheme, loading } = usePreferences();
  return <div className="preferences">
    <label className="preference-control"><Languages size={15} aria-hidden="true" />
      <span className="sr-only">{t('language')}</span>
      <select aria-label={t('language')} value={language} aria-busy={loading} onChange={event => setLanguage(event.target.value as Language)}>
        {Object.entries(languageNames).map(([code, meta]) => <option key={code} value={code} lang={code}>{meta.name}</option>)}
      </select>
    </label>
    <label className="preference-control"><SlidersHorizontal size={15} aria-hidden="true" />
      <span className="sr-only">{t('theme')}</span>
      <select aria-label={t('theme')} value={theme} onChange={event => setTheme(event.target.value as Theme)}>
        {themes.map(value => <option key={value} value={value}>{t(value)}</option>)}
      </select>
    </label>
  </div>;
}

function DesktopCard() {
  const { t } = usePreferences();
  return <section className="side-card desktop-card">
    <div className="card-icon"><Monitor size={20} aria-hidden="true" /></div>
    <h2>{t('navAccess')}</h2>
    <p>{t('desktopText')}</p>
    <div className="card-bottom"><span className="status-dot">{t('planned')}</span><a href="#/desktop" aria-label={t('navAccess')}><ArrowUpRight size={18} /></a></div>
  </section>;
}

function Explore({ searchRef }: { searchRef: React.RefObject<HTMLInputElement | null> }) {
  const { t } = usePreferences();
  const [tab, setTab] = useState<'repositories' | 'websites'>('repositories');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setSubmitted(true); }
  return <>
    <section className="horizontal-banner">
      <div className="banner-content"><span className="banner-kicker">KRYPTOS TĒS MOIRAS</span><h1>{t('publicProjects')}</h1><p>{t('publishedOnly')}</p>
        <a className="banner-link" href={readme}>{t('readme')}<ArrowUpRight size={15} aria-hidden="true" /></a>
      </div>
      <div className="banner-art" aria-hidden="true"><div className="banner-line line-a" /><div className="banner-line line-b" /><div className="banner-line line-c" /><div className="banner-line line-d" /><div className="banner-tiles"><span /><span /><span /><span /><span /><span /></div></div>
    </section>
    <div className="explore-columns"><div className="results-column">
      <div className="project-tabs" role="tablist" aria-label={t('publicProjects')}>
        {(['repositories', 'websites'] as const).map((value, index) => <button type="button" role="tab" id={value + '-tab'} aria-controls="project-panel" aria-selected={tab === value} tabIndex={tab === value ? 0 : -1} key={value}
          onClick={() => { setTab(value); setSubmitted(false); }} onKeyDown={event => {
            if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
              event.preventDefault(); const next = event.key === 'Home' ? 'repositories' : event.key === 'End' ? 'websites' : index === 0 ? 'websites' : 'repositories';
              setTab(next); document.getElementById(next + '-tab')?.focus();
            }
          }}>{value === 'repositories' ? <FolderGit2 size={17} aria-hidden="true" /> : <Globe2 size={17} aria-hidden="true" />}{t(value === 'repositories' ? 'repoLabel' : 'websites')}</button>)}
      </div>
      <section className="project-panel" id="project-panel" role="tabpanel" aria-labelledby={tab + '-tab'}>
        <form className="project-search" role="search" onSubmit={submit}>
          <label className="query-field"><Search size={18} aria-hidden="true" /><span className="sr-only">{t('search')}</span>
            <input ref={searchRef} type="search" value={query} onChange={event => { setQuery(event.target.value); setSubmitted(false); }} placeholder={t('search')} maxLength={300} autoComplete="off" spellCheck={false} />
            <kbd aria-hidden="true">/</kbd>
          </label><button className="button primary" type="submit">{t('search')}</button>
        </form>
        <div className="guest-limit"><LockKeyhole size={13} aria-hidden="true" /><span>{t('guestNote')}</span></div>
        <div className={'empty-results' + (submitted ? ' submitted' : '')}>
          <div className="empty-icon"><SearchX size={28} strokeWidth={1.4} aria-hidden="true" /></div>
          <h2 role="status" aria-live="polite">{t('searchUnavailable')}</h2>
          <a className="text-link" href={requirements}>{t('details')}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>
      </section>
    </div><aside className="context-column">
      <DesktopCard />
      <a className="privacy-link" href="#/specs/security"><ShieldCheck size={17} aria-hidden="true" /><span>{t('spec_sourceBoundary_title')}</span><ChevronRight size={15} aria-hidden="true" /></a>
    </aside></div>
  </>;
}

function Desktop() {
  const { t } = usePreferences();
  return <>
    <section className="horizontal-banner desktop-banner"><div className="banner-content"><span className="banner-kicker">{t('planned')}</span><h1>{t('navAccess')}</h1><p>{t('desktopText')}</p></div><Monitor className="desktop-banner-icon" size={90} strokeWidth={.8} aria-hidden="true" /></section>
    <div className="desktop-layout"><section className="surface-panel connection-panel"><h2>{t('navAccess')}</h2>
      <div className="connection-diagram"><div><Monitor size={34} aria-hidden="true" /><span>{t('navAccess')}</span></div><ArrowRight className="connection-arrow" size={25} aria-hidden="true" /><div><Server size={34} aria-hidden="true" /><span><bdi>.onion</bdi></span></div></div>
      <p className="download-notice"><ArrowDownToLine size={16} aria-hidden="true" />{t('noDownload')}</p>
    </section><section className="surface-panel anonymity-panel"><div className="card-icon"><LockKeyhole size={21} aria-hidden="true" /></div><h2>{t('anonymousTitle')}</h2><p>{t('anonymousText')}</p><span className="status-dot">{t('planned')}</span><a className="text-link" href={requirements}>{t('readme')}<ArrowUpRight size={15} aria-hidden="true" /></a></section></div>
    <section className="desktop-features" aria-label={t('navAccess')}>
      <div><Code2 size={19} aria-hidden="true" /><h2>{t('editorTitle')}</h2><span className="status-dot">{t('planned')}</span></div>
      <div><LockKeyhole size={19} aria-hidden="true" /><h2>{t('vaultTitle')}</h2><span className="status-dot">{t('planned')}</span></div>
      <div><SlidersHorizontal size={19} aria-hidden="true" /><h2>{t('spec_providers_title')}</h2><span className="status-dot">{t('planned')}</span></div>
    </section>
    <section className="surface-panel downloads-panel"><div className="download-heading"><div><h2>{t('downloads')}</h2><p>{t('noDownload')}</p></div><a className="text-link" href={repository + 'docs/architecture/desktop-vault.md'}>{t('details')}<ArrowUpRight size={14} aria-hidden="true" /></a></div>
      <div className="platform-downloads">{releaseTargets.map(target => {
        const url = publicReleaseUrl(target.url);
        return url ? <a className="button" key={target.id} href={url} rel="noreferrer"><ArrowDownToLine size={15} aria-hidden="true" />{target.label}</a> : <button key={target.id} className="button" type="button" disabled aria-label={target.label + ': ' + t('noDownload')}><ArrowDownToLine size={15} aria-hidden="true" />{target.label}<span>{t('planned')}</span></button>;
      })}</div>
    </section>
  </>;
}

const documents = [
  ['ReadMe.md', 'readme'], ['Security.md', 'navSecurity'], ['docs/architecture/desktop-vault.md', 'navAccess'], ['DirectoryStructure.md', 'navPlatform'],
  ['Contributing.md', 'Contributing.md'], ['docs/FinancialModel.md', 'navEconomy'],
  ['docs/Royalties.md', 'spec_royalties_title'], ['License', 'license'],
] as const;
function Documents() {
  const { t } = usePreferences();
  return <><div className="page-heading"><span className="page-eyebrow">KRYPTOS TĒS MOIRAS</span><h1>{t('navDocs')}</h1></div><div className="document-list">{documents.map(([path, label]) => <a className="document-row" key={path} href={repository + path}>
    <FileText size={20} aria-hidden="true" /><div><h2>{label === 'Contributing.md' ? label : t(label)}</h2><bdi>{path}</bdi></div><ArrowUpRight size={18} aria-hidden="true" />
  </a>)}</div><p className="document-note">{t('docLanguageNote')}</p></>;
}

function Specifications({ category }: { category: keyof typeof catalog.pages }) {
  const { t } = usePreferences();
  const topics = catalog.pages[category].topics;
  return <><div className="page-heading"><span className="page-eyebrow">KRYPTOS TĒS MOIRAS</span><h1>{t(catalog.pages[category].title as MessageKey)}</h1></div>
    <nav className="spec-category-nav" aria-label={t('navDocs')}>{categories.map(value => <a key={value} href={'#/specs/' + value} aria-current={value === category ? 'page' : undefined}>{t(catalog.pages[value].title as MessageKey)}</a>)}</nav>
    <div className="spec-list">{topics.map(topic => {
      const spec = catalog.topics[topic as keyof typeof catalog.topics];
      return <article className="spec-row" key={topic}><div className="spec-row-header"><h2>{t(('spec_' + topic + '_title') as MessageKey)}</h2><span className="badge">{t(spec.status === 'available' ? 'sourceDocument' : spec.status === 'undecided' ? 'undecided' : 'planned')}</span></div>
        <details><summary>{t('details')}</summary><p>{t(('spec_' + topic + '_text') as MessageKey)}</p></details>
        <a className="spec-source" href={repository + spec.source + (spec.anchor ? '#' + spec.anchor : '')}><BookOpen size={13} aria-hidden="true" /><bdi>{spec.source}</bdi><ExternalLink size={12} aria-hidden="true" /></a>
      </article>;
    })}</div></>;
}

export default function App() {
  const { t, error } = usePreferences();
  const [route, setRoute] = useState<Route>(currentRoute);
  const [category, setCategory] = useState<keyof typeof catalog.pages>(() => location.hash.split('/')[2] === 'security' ? 'security' : 'platform');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const pendingSearchFocus = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sync = () => {
      setRoute(currentRoute());
      const requested = location.hash.split('/')[2];
      if (categories.includes(requested as keyof typeof catalog.pages)) setCategory(requested as keyof typeof catalog.pages);
      setMenuOpen(false);
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        if (pendingSearchFocus.current) { searchRef.current?.focus(); pendingSearchFocus.current = false; }
        else document.getElementById('main')?.focus({ preventScroll: true });
      });
    };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  function focusSearch() {
    if (route !== 'explore') { pendingSearchFocus.current = true; location.hash = '/explore'; }
    else searchRef.current?.focus();
  }
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); return; }
      if (event.target instanceof HTMLElement && (event.target.closest('input,textarea,select') || event.target.isContentEditable)) return;
      if (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) { event.preventDefault(); focusSearch(); }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, [route]);
  const title = route === 'explore' ? 'explore' : route === 'desktop' ? 'navAccess' : route === 'docs' ? 'navDocs' : catalog.pages[category].title as MessageKey;
  const active = (value: Route) => route === value ? 'page' as const : undefined;
  return <div className="app">
    <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{t('skipToContent')}</a>
    <header className="topbar"><div className="topbar-inner"><a className="wordmark" href="#/explore"><strong>KRYPTOS</strong><span>TĒS MOIRAS</span></a><span className="header-divider" aria-hidden="true">/</span><span className="header-location">{t(title)}</span>
      <button type="button" className="quick-search" onClick={focusSearch}><Search size={15} aria-hidden="true" /><span>{t('search')}</span><kbd>/</kbd></button>
      <PreferenceControls /><a className="guest-badge" href={requirements}><span />{t('guest')}</a>
      <button ref={menuButtonRef} className="menu-button" type="button" aria-label={t('navigation')} aria-expanded={menuOpen} aria-controls="app-sidebar" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
    </div></header>
    <div className="app-layout"><aside className={'sidebar' + (menuOpen ? ' sidebar-open' : '')} id="app-sidebar" onClick={event => { if (event.target instanceof Element && event.target.closest("a")) setMenuOpen(false); }}><nav aria-label={t('navigation')}>
      <p className="nav-heading">KRYPTOS TĒS MOIRAS</p>
      <a href="#/explore" aria-current={active('explore')}><Compass size={18} aria-hidden="true" />{t('explore')}</a>
      <a href="#/specs/platform" aria-current={active('specs')}><Code2 size={18} aria-hidden="true" />{t('navPlatform')}</a>
      <a href="#/docs" aria-current={active('docs')}><BookOpen size={18} aria-hidden="true" />{t('navDocs')}</a>
      <div className="nav-separator" />
      <a href="#/desktop" aria-current={active('desktop')}><Monitor size={18} aria-hidden="true" />{t('navAccess')}</a>
      <a href="#/specs/security"><ShieldCheck size={18} aria-hidden="true" />{t('navPrinciples')}</a>
    </nav><div className="sidebar-bottom"><a href={readme}><FileText size={15} aria-hidden="true" />ReadMe.md<ArrowUpRight size={13} aria-hidden="true" /></a><a href={repository + 'License'}>{t('license')}</a></div></aside>
      <div className="main-area"><main id="main" tabIndex={-1}>
        {error && <p className="translation-error" role="alert">{error}</p>}
        {route === 'explore' ? <Explore searchRef={searchRef} /> : route === 'desktop' ? <Desktop /> : route === 'docs' ? <Documents /> : <Specifications category={category} />}
      </main><footer><span>Kryptos Tēs Moiras</span><a href={readme}>ReadMe.md</a><a href={repository + 'License'}>{t('license')}</a></footer></div>
    </div>
  </div>;
}
