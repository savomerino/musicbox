import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// 1. Importamos las páginas usando lazy para optimizar la carga
const HomePage = lazy(() => import('./pages/HomePage'));
const DetailPage = lazy(() => import('./pages/DetailPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage')); 
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));  

function App() {
  // 2. "Elevamos el estado" de los favoritos a App.tsx
  // Así, tanto DetailPage como FavoritesPage pueden acceder a él.
  const [favorites, setFavorites] = useState<string[]>([]);

  // 3. Lógica para agregar o quitar un álbum de favoritos
  const handleToggleFavorite = (albumId: string) => {
    setFavorites(prevFavorites => {
      // Si el id ya está, lo quitamos (creando un nuevo array)
      if (prevFavorites.includes(albumId)) {
        return prevFavorites.filter(id => id !== albumId);
      }
      // Si no está, lo agregamos (creando un nuevo array)
      return [...prevFavorites, albumId];
    });
  };

  return (
    <div className="app-container">
      {/* 4. Menú de navegación simple y persistente */}
      <nav className="main-nav">
        <Link to="/">Inicio</Link>
        <Link to="/favoritos">Favoritos ({favorites.length})</Link>
      </nav>

      {/* 5. Suspense para mostrar un "cargando" mientras se descarga el código de la página */}
      <Suspense fallback={<div className="loading">Cargando página...</div>}>
        {/* 6. El componente <Routes> decide qué página mostrar según la URL */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          <Route 
            path="/song/:id" 
            element={<DetailPage favorites={favorites} onToggleFavorite={handleToggleFavorite} />} 
          />
          
          <Route 
            path="/favoritos" 
            element={<FavoritesPage favoriteIds={favorites} />} 
          />

          {/* Puedes agregar la ruta de categoría aquí cuando la crees */}
          {/* <Route path="/category/:id" element={<CategoryPage />} /> */}
          
          {/* Ruta para cualquier otra URL (404 Not Found) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;