import TelaMapa from './src/screens/TelaMapa';
import TelaSobre from './src/screens/TelaSobre';
import Header from './src/components/Header';
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [pagina, setPagina] = useState(window.location.pathname === '/sobre' ? 'sobre' : 'mapa');

  useEffect(() => {
    function atualizarPagina() {
      setPagina(window.location.pathname === '/sobre' ? 'sobre' : 'mapa');
    }
    window.addEventListener('popstate', atualizarPagina);
    return () => window.removeEventListener('popstate', atualizarPagina);
  }, []);

  function navegar(destino) {
    const caminho = destino === 'sobre' ? '/sobre' : '/';
    window.history.pushState({}, '', caminho);
    setPagina(destino);
  }

  return <div className="app-shell"><Header pagina={pagina} onNavigate={navegar} />{pagina === 'sobre' ? <TelaSobre onNavigate={navegar} /> : <TelaMapa />}</div>;
}