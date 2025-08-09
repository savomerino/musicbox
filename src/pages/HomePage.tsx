import React from 'react';
import type { Album } from '../data/albums';
import {mockAlbums } from '../data/albums';
import AlbumList from '../components/music/AlbumList';

// Define las props que la página recibe
interface HomePageProps {
  onAlbumSelect: (album: Album) => void;
  favorites: string[];
  onToggleFavorite: (albumId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAlbumSelect, favorites, onToggleFavorite }) => {
  return (
    <>
      {/* Pasa las props a cada AlbumList */}
      <AlbumList 
        title="Lanzamientos Populares" 
        albums={mockAlbums} 
        onAlbumSelect={onAlbumSelect} 
        favorites={favorites} 
        onToggleFavorite={onToggleFavorite} 
      />
      <AlbumList 
        title="Tus Mixes Más Escuchados" 
        albums={[...mockAlbums].slice(0, 5).reverse()} 
        onAlbumSelect={onAlbumSelect} 
        favorites={favorites} 
        onToggleFavorite={onToggleFavorite} 
      />
      <AlbumList 
        title="Similar a Lo-Fi Chillers" 
        albums={mockAlbums.slice(2, 7)} 
        onAlbumSelect={onAlbumSelect} 
        favorites={favorites} 
        onToggleFavorite={onToggleFavorite} 
      />
      <AlbumList 
        title="Clásicos del Rock" 
        albums={mockAlbums.slice(4)} 
        onAlbumSelect={onAlbumSelect} 
        favorites={favorites} 
        onToggleFavorite={onToggleFavorite} 
      />
    </>
  );
};

export default HomePage;