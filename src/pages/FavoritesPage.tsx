import React from 'react';
import { Link } from 'react-router-dom';
import type { Album  } from '../data/albums';
    import { mockAlbums } from '../data/albums';
import AlbumList from '../components/music/AlbumList';

interface FavoritesPageProps {
  favoriteIds: string[];
  onAlbumSelect: (album: Album) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favoriteIds, onAlbumSelect }) => {
  const favoriteAlbums = mockAlbums.filter(album => favoriteIds.includes(album.id));

  return (
    <div className="favorites-page">
      <header className="app-header">
        <h1>Mis Favoritos</h1>
        <p>Aquí están los álbumes que más te gustan.</p>
      </header>
      <main>
        {favoriteAlbums.length > 0 ? (
          <AlbumList albums={favoriteAlbums} onAlbumSelect={onAlbumSelect} />
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