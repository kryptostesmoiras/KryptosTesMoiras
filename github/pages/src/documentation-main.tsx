import { createRoot } from 'react-dom/client';
import { PreferenceProvider } from './preferences';
import Documentation from './Documentation';
import './documentation.css';

createRoot(document.getElementById('root')!).render(
  <PreferenceProvider><Documentation /></PreferenceProvider>,
);
