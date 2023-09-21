import { hydrateRoot } from 'react-dom/client';
import RunmixApp from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

const createApp = () => (
  <RunmixApp Router={BrowserRouter} />
)

hydrateRoot(document.getElementById('root'), createApp());