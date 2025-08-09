import React from 'react';
import type { Album } from '../data/albums';
import {mockAlbums } from '../data/albums';
import AlbumList from '../components/music/AlbumList';

interface FavoritesPageProps {
  onAlbumSelect: (album: Album) => void;
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ onAlbumSelect, favorites, onToggleFavorite }) => {
  // Filtra los álbumes para mostrar solo los que están en la lista de favoritos
  const favoriteAlbums = mockAlbums.filter(album => favorites.includes(album.id));

  return (
    <>
      {favoriteAlbums.length > 0 ? (
        <AlbumList 
          title="Tus Favoritos" 
          albums={favoriteAlbums} 
          onAlbumSelect={onAlbumSelect} 
          favorites={favorites} 
          onToggleFavorite={onToggleFavorite} 
        />
      ) : (
        <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>
          <h2>Aún no tienes favoritos</h2>
          <p>Haz clic en el corazón 🤍 en cualquier álbum para guardarlo aquí.</p>
        </div>
      )}
    </>
  );
};

export default FavoritesPage;