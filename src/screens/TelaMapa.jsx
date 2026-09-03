import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import BuscaLocal from '../components/BuscaLocal';

const marcadorStyle = new Style({
  image: new CircleStyle({
    radius: 8,
    fill: new Fill({ color: '#e05d3d' }),
    stroke: new Stroke({ color: '#fffaf2', width: 3 }),
  }),
});

export default function TelaMapa() {
  const mapaRef = useRef(null);
  const fonteMarcador = useRef(null);
  const [mapa, setMapa] = useState(null);
  const [local, setLocal] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fonte = new VectorSource();
    const marcador = new VectorLayer({ source: fonte, style: marcadorStyle });
    const instancia = new Map({
      target: mapaRef.current,
      layers: [new TileLayer({ source: new OSM() }), marcador],
      view: new View({ center: fromLonLat([-47.8825, -15.7942]), zoom: 4 }),
    });
    fonteMarcador.current = fonte;
    setMapa(instancia);
    return () => instancia.setTarget(undefined);
  }, []);

  async function buscarLocal(termo) {
    setCarregando(true);
    setErro('');
    try {
      const resposta = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&accept-language=pt-BR&q=${encodeURIComponent(termo)}`);
      if (!resposta.ok) throw new Error('Não foi possível consultar o mapa.');
      
      const resultados = await resposta.json();
      if (!resultados.length) throw new Error('Nenhum local encontrado.');

      const resultado = resultados[0];

      const coordenadas = fromLonLat([Number(resultado.lon), Number(resultado.lat)]);

      fonteMarcador.current.clear();

      fonteMarcador.current.addFeature(new Feature(new Point(coordenadas)));

      mapa.getView().animate({ center: coordenadas, zoom: 15, duration: 700 });

      setLocal({ nome: resultado.display_name, tipo: resultado.type });
    } catch (error) {
      setErro(error.message);
      setLocal(null);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="map-screen">
      <section className="map-copy">
        <span className="section-kicker">Descoberta local</span>
        <h2>Seu próximo destino começa aqui.</h2>
        <p>Pesquise uma cidade, rua ou ponto de interesse e veja sua localização no mapa.</p>
        <BuscaLocal onBuscar={buscarLocal} carregando={carregando} />
        {erro && <p className="feedback feedback-error" role="alert">{erro}</p>}
        {local && <article className="location-result"><span className="result-pin">+</span><div><strong>{local.nome.split(',')[0]}</strong><small>{local.tipo} · localização encontrada</small></div></article>}
      </section>
      <div className="map-frame" ref={mapaRef} aria-label="Mapa interativo" />
    </main>
  );
}