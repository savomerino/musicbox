import { useState, Suspense, lazy, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/layout/Navbar';
import Player from './components/Player';
import type { Album } from './data/albums';

const HomePage = lazy(() => import('./pages/HomePage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const CreateAlbumPage = lazy(() => import('./pages/CreateAlbumPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AUDIO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function App() {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleAlbumSelect = useCallback((album: Album) => {
    setCurrentAlbum(album);
  }, []);

  const handleToggleFavorite = useCallback((albumId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(albumId)) {
        return prevFavorites.filter(id => id !== albumId);
      } else {
        return [...prevFavorites, albumId];
      }
    });
  }, []);

  return (
    <div className={styles.app}>
      <Navbar />
      <main style={{ paddingBottom: '80px' }}>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route 
              path="/" 
              element={<HomePage onAlbumSelect={handleAlbumSelect} favorites={favorites} onToggleFavorite={handleToggleFavorite} />} 
            />
            <Route path="/song/:id" element={<DetailPage />} />
            <Route 
              path="/favoritos" 
              element={<FavoritesPage favorites={favorites} onAlbumSelect={handleAlbumSelect} onToggleFavorite={handleToggleFavorite} />} 
            />
            <Route path="/create" element={<CreateAlbumPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      {currentAlbum && (
        <Player
          key={currentAlbum.id}
          album={currentAlbum}
          audioUrl={AUDIO_URL}
        />
      )}
    </div>
  );
}

export default App;