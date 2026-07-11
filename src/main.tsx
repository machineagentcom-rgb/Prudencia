import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => (
  <React.StrictMode>
    <div className="text-white">Prudência - Sistema Iniciado</div>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);