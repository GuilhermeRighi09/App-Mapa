export default function Header({ pagina, onNavigate }) {
  return (
    <header className="app-header">
      <button className="brand" onClick={() => onNavigate('mapa')} aria-label="Ir para o mapa"><span className="brand-mark" aria-hidden="true">+</span><span className="brand-name">Atlas Local</span></button>
      <div className="header-title"><p className="eyebrow">NAVEGAÇÃO INTELIGENTE</p><h1>Explore o mundo ao seu redor</h1></div>
      <nav className="main-nav" aria-label="Navegação principal"><button className={pagina === 'mapa' ? 'active' : ''} onClick={() => onNavigate('mapa')}>Mapa</button><button className={pagina === 'sobre' ? 'active' : ''} onClick={() => onNavigate('sobre')}>Sobre</button></nav>
    </header>
  );
}
