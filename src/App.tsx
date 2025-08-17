import { useState, Suspense, lazy, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/layout/Navbar';
import Player from './components/Player';
// 👇 1. Reemplazamos la importación. Ahora el tipo viene del servicio.
import type { Song } from './services/db';

// El lazy loading de las páginas sigue igual
const HomePage = lazy(() => import('./pages/HomePage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const CreateAlbumPage = lazy(() => import('./pages/CreateSongPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AUDIO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function App() {
  // 👇 2. Cambiamos el estado para que maneje un objeto 'Song'.
  //    También renombramos la variable para mayor claridad.
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // 👇 3. Renombramos el manejador y actualizamos su tipo.
  const handleSongSelect = useCallback((song: Song) => {
    setCurrentSong(song);
  }, []);

  const handleToggleFavorite = useCallback((songId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(songId)) {
        return prevFavorites.filter(id => id !== songId);
      } else {
        return [...prevFavorites, songId];
      }
    });
  }, []);

  return (
    <div className={styles.app}>
      <Navbar />
      <main style={{ paddingBottom: '80px' }}>
        <Suspense fallback={<div style={{color: 'white', textAlign: 'center'}}>Cargando...</div>}>
          <Routes>
            {/* 👇 Solo necesitamos pasar `onAlbumSelect` */}
            <Route 
              path="/" 
              element={<HomePage onSongSelect={handleSongSelect} favorites={favorites} onToggleFavorite={handleToggleFavorite} />} 
            />
            <Route path="/song/:id" element={<DetailPage />} />
            {/* 👇 Aquí también */}
            <Route 
              path="/favoritos" 
              element={<FavoritesPage onSongSelect={handleSongSelect} favorites={favorites} onToggleFavorite={handleToggleFavorite} />} 
            />
            <Route path="/create" element={<CreateAlbumPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {currentSong && (
        <Player
          key={currentSong.id}
          song={currentSong}
          audioUrl={AUDIO_URL}
        />
      )}
    </div>
  );
}

export default App;