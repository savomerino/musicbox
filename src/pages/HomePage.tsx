import React from 'react';
import type { Album } from '../data/albums';
import AlbumList from '../components/music/AlbumList';
import { mockAlbums } from '../data/albums';

interface HomePageProps {
  onAlbumSelect: (album: Album) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAlbumSelect }) => {
  return (
    <>
      <AlbumList title="Lanzamientos Populares" albums={mockAlbums} onAlbumSelect={onAlbumSelect} />
      <AlbumList title="Tus Mixes Más Escuchados" albums={[...mockAlbums].slice(0, 5).reverse()} onAlbumSelect={onAlbumSelect} />
      <AlbumList title="Similar a Lo-Fi Chillers" albums={mockAlbums.slice(2, 7)} onAlbumSelect={onAlbumSelect} />
      <AlbumList title="Clásicos del Rock" albums={mockAlbums.slice(4)} onAlbumSelect={onAlbumSelect} />
    </>
  );
};

export default HomePage;