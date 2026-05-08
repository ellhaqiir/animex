import React from 'react';

async function getAnime() {
  const res = await fetch('https://shikimori.one/api/animes?limit=12&order=popularity', { next: { revalidate: 3600 } });
  return res.json();
}

export default async function Home() {
  const animes = await getAnime();

  return (
    <main style={{ backgroundColor: '#0f172a', color: 'white', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', color: '#38bdf8', fontWeight: 'bold' }}>ANIMEX</h1>
        <p style={{ color: '#94a3b8' }}>Daftar Anime Terpopuler</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {animes.map((anime: any) => (
          <div key={anime.id} style={{ backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden', border: '1px solid #334155', transition: 'transform 0.2s' }}>
            <img 
              src={`https://shikimori.one${anime.image.original}`} 
              alt={anime.name} 
              style={{ width: '100%', height: '260px', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <h3 style={{ fontSize: '0.9rem', marginBottom: '8px', height: '40px', overflow: 'hidden' }}>{anime.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fbbf24', fontSize: '0.85rem' }}>⭐ {anime.score}</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{anime.kind.toUpperCase()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
