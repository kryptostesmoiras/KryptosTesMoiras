import { createRoot } from 'react-dom/client';
import { PreferenceProvider } from './preferences';
import App from './App';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <PreferenceProvider><App /></PreferenceProvider>,
);
