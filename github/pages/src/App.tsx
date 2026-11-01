import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';
import { ArrowUpRight, BookOpen, ChevronRight, FileText, Languages, List, Menu, MessageSquare, Search, SlidersHorizontal, X } from 'lucide-react';
import { languageNames, themes, usePreferences, type Language, type Theme } from './preferences';

type Document = { path: string; title: string; markdown: string; kind: string };
type Discussions = { enabled: boolean; url: string; items: Array<{ title: string; url: string; comments: number }>; checkedAt: string | null };
const discussionUrl = 'https://github.com/kryptostesmoiras/kryptostesmoiras.github.io/discussions';
const sourceUrl = 'https://github.com/kryptostesmoiras/KryptosTesMoiras/blob/main/';
const emptyDiscussions: Discussions = { enabled: false, url: discussionUrl, items: [], checkedAt: null };
function route() {
  const [path, query = ''] = location.hash.slice(2).split('?');
  let documentPath = 'ReadMe.md';
  try { if (path?.startsWith('doc/')) documentPath = decodeURIComponent(path.slice(4)); } catch { /* Keep the default document for a malformed URL. */ }
  return { path: documentPath, discussion: path === 'discussions', section: new URLSearchParams(query).get('section') || '' };
}
function docUrl(path: string, section = '') { return '#/doc/' + encodeURIComponent(path) + (section ? '?section=' + encodeURIComponent(section) : ''); }

function ContactLinks() {
  return <nav aria-label="Contact and security" lang="en"><a href="mailto:contact.growl937@passinbox.com">Contact</a><a href="mailto:security.salvage129@passinbox.com">Report a vulnerability</a></nav>;
}
function SecurityReportingNote() {
  return <p lang="en">For security vulnerabilities, <a className="text-link" href="mailto:security.salvage129@passinbox.com">report privately by email</a>. Do not post unpatched vulnerability details or secrets in public discussions or issues.</p>;
}

function Preferences() {
  const { t, language, setLanguage, theme, setTheme, loading } = usePreferences();
  return <div className="preferences"><label><Languages size={15} aria-hidden="true" /><span className="sr-only">{t('language')}</span><select aria-label={t('language')} value={language} aria-busy={loading} onChange={event => setLanguage(event.target.value as Language)}>{Object.entries(languageNames).map(([key, meta]) => <option key={key} value={key}>{meta.name}</option>)}</select></label><label><SlidersHorizontal size={15} aria-hidden="true" /><span className="sr-only">{t('theme')}</span><select aria-label={t('theme')} value={theme} onChange={event => setTheme(event.target.value as Theme)}>{themes.map(value => <option key={value} value={value}>{t(value)}</option>)}</select></label></div>;
}

export default function App() {
  const { t, language, error } = usePreferences();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [discussions, setDiscussions] = useState<Discussions>(emptyDiscussions);
  const [current, setCurrent] = useState(route);
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [outline, setOutline] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch(new URL('documents.json', import.meta.env.BASE_URL === './' ? location.href.split('#')[0] : location.origin + import.meta.env.BASE_URL), { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => { if (!Array.isArray(data.documents)) throw new Error(); setDocuments(data.documents); })
      .catch(reason => { if (reason.name !== 'AbortError') setFailed(true); }).finally(() => setLoading(false));
    fetch(new URL('discussions.json', location.href.split('#')[0]), { signal: controller.signal })
      .then(response => response.ok ? response.json() : emptyDiscussions).then(data => {
        if (data.url === discussionUrl && Array.isArray(data.items)) setDiscussions(data);
      }).catch(() => {});
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const sync = () => { setCurrent(route()); setMenuOpen(false); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', sync); return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuRef.current?.focus(); return; }
      if (event.target instanceof HTMLElement && event.target.closest('input,textarea,select')) return;
      if (event.key === '/' || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k')) { event.preventDefault(); setMenuOpen(true); requestAnimationFrame(() => searchRef.current?.focus()); }
    };
    window.addEventListener('keydown', shortcut); return () => window.removeEventListener('keydown', shortcut);
  }, []);
  const selected = documents.find(doc => doc.path === current.path);
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase(language);
    return documents.filter(doc => !search || `${doc.path}\n${doc.title}\n${doc.markdown}`.toLocaleLowerCase(language).includes(search));
  }, [documents, query, language]);
  useEffect(() => {
    const headings = articleRef.current?.querySelectorAll('h1,h2,h3');
    setOutline(headings ? [...headings].map(heading => ({ id: heading.id, text: heading.textContent || '', level: Number(heading.tagName[1]) })) : []);
    if (current.section) requestAnimationFrame(() => document.getElementById('user-content-doc-' + current.section)?.scrollIntoView());
    document.title = `${current.discussion ? t('discussions') : selected?.title || t('navDocs')} — Kryptos Tēs Moiras`;
  }, [selected, current.discussion, current.section, language]);
  function markdownLink(href = '') {
    if (!href || !selected) return href;
    if (/^(https?:|mailto:)/i.test(href)) return href;
    try {
      const url = new URL(href, 'https://documents.invalid/' + selected.path);
      if (url.origin !== 'https://documents.invalid') return href;
      const target = decodeURIComponent(url.pathname.slice(1));
      return documents.some(doc => doc.path === target) ? docUrl(target, decodeURIComponent(url.hash.slice(1))) : sourceUrl + target + url.hash;
    } catch { return ''; }
  }
  function safeDiscussionUrl(url: string) {
    return url.startsWith(discussionUrl + '/') ? url : discussionUrl;
  }
  return <div className="docs-app"><a className="skip-link" href="#main" onClick={event => { event.preventDefault(); document.getElementById('main')?.focus(); }}>{t('skipToContent')}</a>
    <header className="topbar"><a className="wordmark" href={docUrl('ReadMe.md')}><strong>KRYPTOS</strong><span>TĒS MOIRAS</span></a><span className="header-divider">/</span><span className="header-title">{t('navDocs')}</span><nav aria-label={t('navigation')}><a href={docUrl('ReadMe.md')} aria-current={!current.discussion ? 'page' : undefined}><BookOpen size={15} />{t('navDocs')}</a><a href="#/discussions" aria-current={current.discussion ? 'page' : undefined}><MessageSquare size={15} />{t('discussions')}</a></nav><Preferences /><button ref={menuRef} className="menu-button" aria-label={t('navigation')} aria-expanded={menuOpen} aria-controls="document-sidebar" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>
    <div className="docs-layout"><aside className={'document-sidebar' + (menuOpen ? ' is-open' : '')} id="document-sidebar"><label className="document-search"><Search size={16} aria-hidden="true" /><span className="sr-only">{t('search')}</span><input ref={searchRef} type="search" placeholder={t('search')} value={query} onChange={event => setQuery(event.target.value)} autoComplete="off" /></label><div className="sidebar-heading">{t('navDocs')}<span>{documents.length}</span></div><nav aria-label={t('navDocs')}>{filtered.map(doc => <a key={doc.path} href={docUrl(doc.path)} onClick={() => setMenuOpen(false)} aria-current={!current.discussion && doc.path === current.path ? 'page' : undefined}><FileText size={15} aria-hidden="true" /><span>{doc.path}</span></a>)}</nav><a className="sidebar-discussions" href="#/discussions"><MessageSquare size={16} />{t('discussions')}<ChevronRight size={14} /></a><ContactLinks /></aside>
      <main id="main" tabIndex={-1} className={current.discussion ? 'discussion-main' : ''}>{error && <p role="alert">{error}</p>}
        {current.discussion ? <><div className="page-heading"><span>KRYPTOS TĒS MOIRAS</span><h1>{t('discussions')}</h1></div><section className="discussion-panel"><div className="discussion-panel-heading"><MessageSquare size={20} /><h2>GitHub Discussions</h2>{discussions.enabled && <a className="button" href={discussionUrl}>{t('details')}<ArrowUpRight size={15} /></a>}</div><SecurityReportingNote />{!discussions.enabled ? <p>{t('discussionsUnavailable')}</p> : discussions.items.length ? <div className="discussion-list">{discussions.items.map(item => <a key={item.url} href={safeDiscussionUrl(item.url)}><MessageSquare size={16} /><span>{item.title}</span><span>{item.comments}</span><ArrowUpRight size={15} /></a>)}</div> : <p>{t('noDiscussion')}</p>}{discussions.enabled && <a className="text-link" href={discussionUrl + '/new'}>GitHub Discussions <ArrowUpRight size={14} /></a>}</section></>
        : loading ? <div className="loading" role="status">{t('navDocs')}…</div> : failed ? <p role="alert">{t('errorOffline')}</p> : !selected ? <section className="document-missing"><h1>{t('navDocs')}</h1><a href={docUrl('ReadMe.md')}>ReadMe.md</a></section> : <><div className="document-breadcrumb"><BookOpen size={15} /><span>{t('navDocs')}</span><ChevronRight size={13} /><bdi>{selected.path}</bdi><a href={sourceUrl + selected.path} aria-label="GitHub"><ArrowUpRight size={16} /></a></div><div className="reading-layout"><div><div className="markdown-body" dir="ltr" lang="en" ref={articleRef}>{selected.kind === 'text' ? <pre>{selected.markdown}</pre> : <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[[rehypeSlug, { prefix: 'doc-' }], rehypeSanitize]} components={{ a: ({ href, children }) => <a href={markdownLink(href)} rel={href?.startsWith('http') ? 'noreferrer' : undefined}>{children}</a>, img: ({ src, alt }) => <a href={markdownLink(typeof src === 'string' ? src : '')}>{alt || src as ReactNode}</a> }}>{selected.markdown}</Markdown>}</div><section className="document-comments"><div><MessageSquare size={19} /><h2>{t('discussions')}</h2></div><SecurityReportingNote />{discussions.enabled ? <a className="button" href={discussionUrl + '?discussions_q=' + encodeURIComponent('"' + selected.path + '"')}>GitHub Discussions<ArrowUpRight size={15} /></a> : <p>{t('discussionsUnavailable')}</p>}</section></div><aside className="outline" aria-label={t('outline')}><h2><List size={14} />{t('outline')}</h2>{outline.map(item => <a key={item.id} className={'level-' + item.level} href={docUrl(selected.path, item.id.replace(/^user-content-doc-/, ''))} onClick={() => document.getElementById(item.id)?.scrollIntoView()}>{item.text}</a>)}</aside></div></>}
        <footer><span>Kryptos Tēs Moiras</span><ContactLinks /><a href={sourceUrl + 'ReadMe.md'}>ReadMe.md</a><a href="#/discussions">{t('discussions')}</a></footer>
      </main></div></div>;
}
