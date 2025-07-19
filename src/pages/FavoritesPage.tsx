// src/pages/FavoritesPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { mockAlbums } from '../data/albums';
import AlbumList from '../components/music/AlbumList';

// 1. Definimos las props que necesita la página
interface FavoritesPageProps {
  favoriteIds: string[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favoriteIds }) => {
  // 2. Filtramos la lista completa de álbumes para quedarnos solo con los favoritos
  const favoriteAlbums = mockAlbums.filter(album => favoriteIds.includes(album.id));

  return (
    <div className="favorites-page">
      <header className="app-header">
        <h1>Mis Favoritos</h1>
        <p>Aquí están los álbumes que más te gustan.</p>
      </header>
      <main>
        {/* 3. Renderizado condicional: mostramos un mensaje si no hay favoritos */}
        {favoriteAlbums.length > 0 ? (
          <AlbumList albums={favoriteAlbums} />
        ) : (
          <div className="no-favorites">
            <p>Aún no has agregado ningún álbum a tus favoritos.</p>
            <Link to="/">Explorar álbumes</Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;