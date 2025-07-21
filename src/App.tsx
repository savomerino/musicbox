import { useState, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import Navbar from './components/layout/Navbar';
import Player from './components/Player';
import type { Album } from './data/albums';

// Lazy loading para las páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
// Aún no hemos creado estas, pero las definimos para el futuro
// const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
// const CategoryPage = lazy(() => import('./pages/CategoryPage'));
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const AUDIO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

function App() {
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);

  const handleAlbumSelect = (album: Album) => {
    setCurrentAlbum(album);
  };

  return (
    <div className={styles.app}>
      <Navbar />
      <main style={{ paddingBottom: '80px' }}> {/* Espacio para el reproductor */}
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage onAlbumSelect={handleAlbumSelect} />} />
            <Route path="/song/:id" element={<DetailPage />} />
            {/* Aquí irían las otras rutas cuando las crees */}
            {/* <Route path="/favoritos" element={<FavoritesPage />} /> */}
            {/* <Route path="/category/:id" element={<CategoryPage />} /> */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
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