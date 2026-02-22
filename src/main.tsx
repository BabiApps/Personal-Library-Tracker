import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </StrictMode>,
);
