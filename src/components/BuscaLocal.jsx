import { useState } from 'react';

export default function BuscaLocal({ onBuscar, carregando }) {
  const [termo, setTermo] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (termo.trim()) onBuscar(termo.trim());
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <label htmlFor="busca-local">Encontre um lugar</label>
      <div className="search-row">
        <input
          id="busca-local"
          value={termo}
          onChange={(event) => setTermo(event.target.value)}
          placeholder="Cidade, endereço ou ponto de interesse"
          disabled={carregando}
        />
        <button type="submit" disabled={carregando || !termo.trim()}>
          {carregando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
    </form>
  );
}