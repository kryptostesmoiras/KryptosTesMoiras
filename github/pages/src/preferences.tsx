import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import english from './locales/en.json';
import registry from './locales/registry.json';

export type MessageKey = keyof typeof english;
type Messages = Record<MessageKey, string>;
export type Language = keyof typeof registry;
export type Theme = 'light' | 'dark' | 'plum' | 'terminal' | 'system';
const catalogs = import.meta.glob<{ default: Messages }>(['./locales/*.json', '!./locales/registry.json', '!./locales/en.json']);
const themes: Theme[] = ['light', 'dark', 'plum', 'terminal', 'system'];
const languageNames = registry as Record<Language, { name: string; dir: string }>;
function saved(key: string, fallback: string) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function persist(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* Preferences work without storage. */ }
}
const Preferences = createContext<{
  t: (key: MessageKey) => string;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  loading: boolean;
  error: string;
} | null>(null);

export function PreferenceProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<Messages>(english);
  const [theme, changeTheme] = useState<Theme>(() => {
    const candidate = saved('ktm-theme', 'light');
    return themes.includes(candidate as Theme) ? candidate as Theme : 'light';
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const request = useRef(0);
  async function loadLanguage(next: Language) {
    if (!Object.hasOwn(registry, next)) return;
    const version = ++request.current;
    setLoading(true);
    setError('');
    try {
      const candidate = next === 'en' ? english : (await catalogs[`./locales/${next}.json`]()).default;
      if (Object.keys(candidate).length !== Object.keys(english).length ||
        Object.keys(english).some(key => typeof candidate[key as MessageKey] !== 'string' || !candidate[key as MessageKey].trim())) {
        throw new Error('Incomplete translation');
      }
      if (version !== request.current) return;
      setMessages(candidate);
      setLanguage(next);
      persist('ktm-language', next);
    } catch {
      if (version === request.current) setError(english.errorOffline);
    } finally {
      if (version === request.current) setLoading(false);
    }
  }
  useEffect(() => {
    const stored = saved('ktm-language', 'en');
    if (Object.hasOwn(registry, stored)) void loadLanguage(stored as Language);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = registry[language].dir;
  }, [language]);
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => { document.documentElement.dataset.theme = theme === 'system' ? (system.matches ? 'dark' : 'light') : theme; };
    apply();
    system.addEventListener('change', apply);
    return () => system.removeEventListener('change', apply);
  }, [theme]);
  return <Preferences.Provider value={{
    t: key => messages[key] || english[key], language, setLanguage: next => { void loadLanguage(next); },
    theme, setTheme: next => { changeTheme(next); persist('ktm-theme', next); }, loading, error,
  }}>{children}</Preferences.Provider>;
}
export function usePreferences() {
  const value = useContext(Preferences);
  if (!value) throw new Error('PreferenceProvider is required');
  return value;
}
export { languageNames, themes };
