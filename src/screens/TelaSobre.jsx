export default function TelaSobre({ onNavigate }) {
  return (
    <main className="about-screen">
      <section className="about-hero">
        <span className="section-kicker">Sobre o Atlas Local</span>
        <h2>Um mapa simples para encontrar o que importa.</h2>
        <p>O Atlas Local combina uma busca objetiva com dados abertos do OpenStreetMap para ajudar você a explorar cidades, endereços e pontos de interesse.</p>
        <button className="about-action" onClick={() => onNavigate('mapa')}>Explorar o mapa <span aria-hidden="true">→</span></button>
      </section>
      <section className="about-details" aria-label="Recursos do Atlas Local">
        <article><span className="detail-number">01</span><h3>Busque</h3><p>Digite um endereço, cidade ou lugar para começar.</p></article>
        <article><span className="detail-number">02</span><h3>Localize</h3><p>Veja o ponto encontrado diretamente no mapa interativo.</p></article>
        <article><span className="detail-number">03</span><h3>Explore</h3><p>Use o mapa para observar a região e planejar seu próximo destino.</p></article>
      </section>
    </main>
  );
}